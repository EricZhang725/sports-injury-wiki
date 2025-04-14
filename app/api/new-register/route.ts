import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import User from '@/app/models/User';
import { dbConnect } from '@/app/lib/db';

const ADMIN_CODE = process.env.ADMIN_INVITE_CODE || 'admin123';

export async function POST(request: NextRequest) {
  try {
    console.log('【新注册API】开始处理注册请求...');
    
    // 确保数据库连接
    await dbConnect();
    console.log('【新注册API】数据库连接成功');
    
    // 解析请求体
    const body = await request.json();
    console.log('【新注册API】请求体:', JSON.stringify(body));
    
    const { username, email, password, adminCode } = body;
    
    // 验证必填字段
    if (!username || !email || !password) {
      console.log('【新注册API】缺少必填字段');
      return Response.json(
        { success: false, message: '请填写所有必填字段' },
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // 检查用户名是否已存在
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('【新注册API】用户名已存在:', username);
      return Response.json(
        { success: false, message: '用户名已存在' },
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // 检查邮箱是否已存在
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      console.log('【新注册API】邮箱已被注册:', email);
      return Response.json(
        { success: false, message: '邮箱已被注册' },
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // 加密密码
    const hashedPassword = await hash(password, 10);
    
    // 创建新用户
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: adminCode === ADMIN_CODE ? 'admin' : 'user'
    });
    
    await user.save();
    console.log('【新注册API】用户创建成功:', username);
    
    // 返回成功响应
    return Response.json(
      { 
        success: true, 
        message: '注册成功',
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      },
      { 
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
  } catch (error) {
    console.error('【新注册API】注册过程中发生错误:', error);
    return Response.json(
      { 
        success: false, 
        message: '注册失败，请稍后再试',
        error: error instanceof Error ? error.message : '未知错误'
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
} 