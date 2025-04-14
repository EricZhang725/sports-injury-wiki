import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/app/models/User';
import { dbConnect } from '@/app/lib/db';

// 确保API路由为动态渲染
export const dynamic = 'force-dynamic';

/**
 * 特殊的管理员注册API路由，用于调试目的
 * 注意：此路由仅用于开发测试，不应该在生产环境中使用
 */
export async function POST(request: NextRequest) {
  console.log('管理员注册API收到请求');
  
  try {
    // 连接数据库
    await dbConnect();
    
    // 解析请求体
    const body = await request.json();
    const { username, email, password } = body;
    
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
    
    // 明确设置为管理员角色
    console.log('创建管理员用户...');
    
    // 创建新用户
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'admin', // 强制设置为管理员
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    console.log('管理员用户创建成功:', user._id);
    console.log('用户角色:', user.role);
    
    // 返回成功响应
    return NextResponse.json({
      success: true,
      message: '管理员注册成功',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('管理员注册失败:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: '注册失败，服务器错误',
        error: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    );
  }
} 
import bcrypt from 'bcryptjs';
import User from '@/app/models/User';
import { dbConnect } from '@/app/lib/db';

// 确保API路由为动态渲染
export const dynamic = 'force-dynamic';

/**
 * 特殊的管理员注册API路由，用于调试目的
 * 注意：此路由仅用于开发测试，不应该在生产环境中使用
 */
export async function POST(request: NextRequest) {
  console.log('管理员注册API收到请求');
  
  try {
    // 连接数据库
    await dbConnect();
    
    // 解析请求体
    const body = await request.json();
    const { username, email, password } = body;
    
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
    
    // 明确设置为管理员角色
    console.log('创建管理员用户...');
    
    // 创建新用户
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'admin', // 强制设置为管理员
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    console.log('管理员用户创建成功:', user._id);
    console.log('用户角色:', user.role);
    
    // 返回成功响应
    return NextResponse.json({
      success: true,
      message: '管理员注册成功',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('管理员注册失败:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: '注册失败，服务器错误',
        error: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    );
  }
} 