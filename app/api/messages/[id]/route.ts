import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { dbConnect } from '@/app/lib/db';
import Message from '@/app/models/Message';

// 获取单条消息
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 验证用户是否为管理员
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      );
    }

    console.log('获取消息详情，ID:', params.id);
    await dbConnect();
    
    const message = await Message.findById(params.id);
    if (!message) {
      return NextResponse.json(
        { error: '消息不存在' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(message);
  } catch (error) {
    console.error('获取消息失败:', error);
    return NextResponse.json(
      { error: '获取消息失败，请稍后再试' },
      { status: 500 }
    );
  }
}

// 更新消息状态 (标记为已读)
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 验证用户是否为管理员
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      );
    }

    const { read } = await request.json();
    console.log('更新消息状态，ID:', params.id, '标记为:', read ? '已读' : '未读');
    
    await dbConnect();
    
    const updatedMessage = await Message.findByIdAndUpdate(
      params.id,
      { read },
      { new: true }
    );
    
    if (!updatedMessage) {
      return NextResponse.json(
        { error: '消息不存在' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.error('更新消息状态失败:', error);
    return NextResponse.json(
      { error: '更新消息状态失败，请稍后再试' },
      { status: 500 }
    );
  }
}

// 删除消息
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 验证用户是否为管理员
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      );
    }

    console.log('删除消息，ID:', params.id);
    await dbConnect();
    
    const deletedMessage = await Message.findByIdAndDelete(params.id);
    
    if (!deletedMessage) {
      return NextResponse.json(
        { error: '消息不存在' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, message: '消息已删除' });
  } catch (error) {
    console.error('删除消息失败:', error);
    return NextResponse.json(
      { error: '删除消息失败，请稍后再试' },
      { status: 500 }
    );
  }
} 