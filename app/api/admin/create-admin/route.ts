import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/app/models/User';
import { dbConnect } from '@/app/lib/db';

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    // 验证输入
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: '请提供所有必要信息' },
        { status: 400 }
      );
    }

    await dbConnect();

    // 检查是否已存在管理员
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return NextResponse.json(
        { error: '管理员账户已存在' },
        { status: 400 }
      );
    }

    // 检查用户名和邮箱是否已被使用
    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return NextResponse.json(
        { error: '用户名或邮箱已被使用' },
        { status: 400 }
      );
    }

    // 创建管理员账户
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'admin'
    });

    // 不返回密码
    const { password: _, ...adminWithoutPassword } = admin.toObject();

    return NextResponse.json(
      { message: '管理员账户创建成功', admin: adminWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error('创建管理员账户失败:', error);
    return NextResponse.json(
      { error: '创建管理员账户失败' },
      { status: 500 }
    );
  }
} 