import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/app/models/User';
import { dbConnect } from '@/app/lib/db';

// 确保API路由为动态渲染
export const dynamic = 'force-dynamic';

/**
 * 通过API创建管理员账户
 */
export async function POST(request: NextRequest) {
  console.log('创建管理员API收到请求');
  
  try {
    // 连接数据库
    await dbConnect();
    
    // 解析请求体
    const body = await request.json();
    const { username, email, password, adminCode } = body;
    
    // 验证管理员密钥
    if (!adminCode || adminCode !== process.env.ADMIN_SECRET_KEY) {
      console.log('管理员密钥验证失败');
      return NextResponse.json(
        { success: false, message: '管理员密钥无效' },
        { status: 403 }
      );
    }
    
    // 验证必填字段
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: '请填写所有必填字段' },
        { status: 400 }
      );
    }
    
    // 检查用户名是否已存在
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: '用户名已存在' },
        { status: 400 }
      );
    }
    
    // 检查邮箱是否已存在
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return NextResponse.json(
        { success: false, message: '邮箱已被注册' },
        { status: 400 }
      );
    }
    
    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 创建新管理员用户
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    console.log('管理员用户创建成功:', user._id);
    
    // 返回成功响应
    return NextResponse.json({
      success: true,
      message: '管理员创建成功',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('创建管理员失败:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: '创建失败，服务器错误',
        error: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    );
  }
}

 