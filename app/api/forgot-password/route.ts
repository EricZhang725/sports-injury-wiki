import { NextResponse } from 'next/server';
import dbConnect from '../../lib/db';
import User from '../../models/User';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// 确保API路由为动态渲染
export const dynamic = 'force-dynamic';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { email } = await request.json();

    // 验证邮箱
    if (!email) {
      return NextResponse.json(
        { message: '请输入邮箱地址' },
        { status: 400 }
      );
    }

    // 查找用户
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: '该邮箱未注册' },
        { status: 404 }
      );
    }

    // 生成重置令牌
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1小时后过期

    // 更新用户信息
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    // 发送重置邮件
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: '重置密码',
      html: `
        <h1>重置密码</h1>
        <p>您请求重置密码，请点击以下链接：</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>如果您没有请求重置密码，请忽略此邮件。</p>
        <p>此链接将在1小时后过期。</p>
      `
    });

    return NextResponse.json({
      message: '重置密码的链接已发送到您的邮箱'
    });
  } catch (error: any) {
    console.error('发送重置邮件错误:', error);
    return NextResponse.json(
      { message: '发送重置邮件失败，请稍后重试' },
      { status: 500 }
    );
  }
} 