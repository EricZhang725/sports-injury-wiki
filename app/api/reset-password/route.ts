import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/db';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { token, password } = await request.json();

    // 验证输入
    if (!token || !password) {
      return NextResponse.json(
        { message: '请填写所有必填字段' },
        { status: 400 }
      );
    }

    // 查找用户
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return NextResponse.json(
        { message: '重置链接无效或已过期' },
        { status: 400 }
      );
    }

    // 更新密码
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return NextResponse.json({
      message: '密码重置成功'
    });
  } catch (error: any) {
    console.error('重置密码错误:', error);
    return NextResponse.json(
      { message: '重置密码失败，请稍后重试' },
      { status: 500 }
    );
  }
} 