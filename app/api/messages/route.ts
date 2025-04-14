import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { dbConnect } from '@/app/lib/db';
import Message from '@/app/models/Message';

// 确保API路由为动态渲染
export const dynamic = 'force-dynamic';

// 获取所有消息 (仅管理员)
export async function GET() {
  try {
    // 验证用户是否为管理员
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      console.log('非管理员尝试访问消息列表:', session?.user);
      return NextResponse.json(
        { error: '未授权访问', status: 'unauthorized' },
        { status: 401 }
      );
    }

    console.log('管理员访问消息列表:', session.user.username);
    await dbConnect();
    
    // 获取所有消息，按创建时间降序排列
    const messages = await Message.find({}).sort({ createdAt: -1 });
    console.log(`找到 ${messages.length} 条消息`);
    
    return NextResponse.json(messages);
  } catch (error) {
    console.error('获取消息失败:', error);
    return NextResponse.json(
      { error: '服务器错误，请稍后再试', status: 'server_error' },
      { status: 500 }
    );
  }
}

// 保存新消息 (来自联系表单)
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, subject, message: content } = data;
    
    // 验证必填字段
    if (!name || !email || !subject || !content) {
      return NextResponse.json(
        { error: '请填写所有必填字段', status: 'missing_fields' },
        { status: 400 }
      );
    }
    
    console.log('收到新消息:', subject);
    await dbConnect();
    
    // 创建新消息
    const newMessage = await Message.create({
      name,
      email,
      subject,
      content,
      read: false,
      createdAt: new Date()
    });
    
    console.log('消息已保存，ID:', newMessage._id);
    
    return NextResponse.json(
      { success: true, message: '消息已发送', id: newMessage._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('保存消息失败:', error);
    return NextResponse.json(
      { error: '服务器错误，请稍后再试', status: 'server_error' },
      { status: 500 }
    );
  }
} 
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { dbConnect } from '@/app/lib/db';
import Message from '@/app/models/Message';

// 确保API路由为动态渲染
export const dynamic = 'force-dynamic';

// 获取所有消息 (仅管理员)
export async function GET() {
  try {
    // 验证用户是否为管理员
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      console.log('非管理员尝试访问消息列表:', session?.user);
      return NextResponse.json(
        { error: '未授权访问', status: 'unauthorized' },
        { status: 401 }
      );
    }

    console.log('管理员访问消息列表:', session.user.username);
    await dbConnect();
    
    // 获取所有消息，按创建时间降序排列
    const messages = await Message.find({}).sort({ createdAt: -1 });
    console.log(`找到 ${messages.length} 条消息`);
    
    return NextResponse.json(messages);
  } catch (error) {
    console.error('获取消息失败:', error);
    return NextResponse.json(
      { error: '服务器错误，请稍后再试', status: 'server_error' },
      { status: 500 }
    );
  }
}

// 保存新消息 (来自联系表单)
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, subject, message: content } = data;
    
    // 验证必填字段
    if (!name || !email || !subject || !content) {
      return NextResponse.json(
        { error: '请填写所有必填字段', status: 'missing_fields' },
        { status: 400 }
      );
    }
    
    console.log('收到新消息:', subject);
    await dbConnect();
    
    // 创建新消息
    const newMessage = await Message.create({
      name,
      email,
      subject,
      content,
      read: false,
      createdAt: new Date()
    });
    
    console.log('消息已保存，ID:', newMessage._id);
    
    return NextResponse.json(
      { success: true, message: '消息已发送', id: newMessage._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('保存消息失败:', error);
    return NextResponse.json(
      { error: '服务器错误，请稍后再试', status: 'server_error' },
      { status: 500 }
    );
  }
} 