import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { dbConnect } from '@/app/lib/db';
import User from '@/app/models/User';
import { getServerSession } from 'next-auth';

// 确保API路由为动态渲染
export const dynamic = 'force-dynamic';

const ADMIN_CODE = process.env.ADMIN_INVITE_CODE || 'admin123';

export async function POST(request: NextRequest) {
  console.log('Registration API request received');
  
  // 为确保始终返回JSON响应，将所有代码包装在try-catch中
  try {
    // 首先尝试连接数据库
    try {
      console.log('Connecting to database...');
      await dbConnect();
      console.log('Database connection successful');
    } catch (dbError) {
      console.error('Database connection failed:', dbError);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Database connection failed, please try again later',
          error: dbError instanceof Error ? dbError.message : 'Unknown database error'
        },
        { status: 500 }
      );
    }
    
    // 解析请求体
    let body;
    try {
      body = await request.json();
      console.log('Request body parsed successfully');
    } catch (parseError) {
      console.error('Request body parse failed:', parseError);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid request format', 
          error: parseError instanceof Error ? parseError.message : 'Request body parse failed'
        },
        { status: 400 }
      );
    }

    const { username, email, password, adminCode } = body;
    
    // Log the adminCode value that was received
    console.log('Received adminCode:', adminCode);
    console.log('Expected adminCode:', ADMIN_CODE);
    console.log('Admin code matches?', adminCode === ADMIN_CODE);
    
    // 验证必填字段
    if (!username || !email || !password) {
      console.log('Missing required fields');
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields' },
        { status: 400 }
      );
    }
    
    try {
      // 检查用户名是否已存在
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        console.log('Username already exists:', username);
        return NextResponse.json(
          { success: false, message: 'Username already exists' },
          { status: 400 }
        );
      }
      
      // 检查邮箱是否已存在
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        console.log('Email already registered:', email);
        return NextResponse.json(
          { success: false, message: 'Email already registered' },
          { status: 400 }
        );
      }
      
      // 加密密码
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // 确定用户角色 - 使用严格比较
      // Note: String comparison can sometimes fail if types don't match
      const adminCodeToCompare = String(adminCode).trim();
      const expectedAdminCode = String(ADMIN_CODE).trim();
      const role = adminCodeToCompare === expectedAdminCode ? 'admin' : 'user';
      
      console.log('Admin code comparison:', {
        rawAdminCode: adminCode,
        adminCodeToCompare,
        expectedAdminCode,
        isMatch: adminCodeToCompare === expectedAdminCode,
        resultRole: role
      });
      
      // 创建新用户
      console.log('Creating new user...');
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        role,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      console.log('User created successfully:', user._id);
      
      // 返回成功响应，不包含密码
      return NextResponse.json({
        success: true,
        message: 'Registration successful',
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt
        }
      });
    } catch (dbOperationError) {
      console.error('Database operation failed:', dbOperationError);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Registration failed, database operation error',
          error: dbOperationError instanceof Error ? dbOperationError.message : 'Unknown error'
        },
        { status: 500 }
      );
    }
  } catch (generalError) {
    console.error('Unexpected error during registration:', generalError);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Registration failed, server error',
        error: generalError instanceof Error ? generalError.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 