import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { dbConnect } from '@/app/lib/db';
import Post from '@/app/models/Post';
import mongoose from 'mongoose';

// 确保API路由为动态渲染
export const dynamic = 'force-dynamic';

export async function POST(
  request: Request, 
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: '请先登录' }, 
        { status: 401 }
      );
    }

    // 解包params
    const resolvedParams = 'then' in params ? await params : params;
    const id = resolvedParams.id;
    
    if (!id) {
      return NextResponse.json({ message: '帖子ID无效' }, { status: 400 });
    }

    // 获取评论内容
    const { content } = await request.json();
    if (!content) {
      return NextResponse.json(
        { message: '评论内容不能为空' }, 
        { status: 400 }
      );
    }

    console.log('添加评论到帖子:', id, '用户ID:', session.user.id);
    await dbConnect();

    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ message: '帖子不存在' }, { status: 404 });      
    }

    // 创建用户引用ID
    const userId = new mongoose.Types.ObjectId(session.user.id);
    
    // 添加评论
    post.comments.push({
      user: userId,
      content,
      createdAt: new Date()
    });

    await post.save();

    // 重新获取完整的帖子数据        
    const updatedPost = await Post.findById(id)
      .populate('author', 'username')
      .populate('comments.user', 'username');

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('添加评论失败:', error);
    return NextResponse.json(
      { message: '添加评论失败，请稍后再试', error: (error as Error).message },
      { status: 500 }
    );
  }
} 
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { dbConnect } from '@/app/lib/db';
import Post from '@/app/models/Post';
import mongoose from 'mongoose';

// 确保API路由为动态渲染
export const dynamic = 'force-dynamic';

export async function POST(
  request: Request, 
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: '请先登录' }, 
        { status: 401 }
      );
    }

    // 解包params
    const resolvedParams = 'then' in params ? await params : params;
    const id = resolvedParams.id;
    
    if (!id) {
      return NextResponse.json({ message: '帖子ID无效' }, { status: 400 });
    }

    // 获取评论内容
    const { content } = await request.json();
    if (!content) {
      return NextResponse.json(
        { message: '评论内容不能为空' }, 
        { status: 400 }
      );
    }

    console.log('添加评论到帖子:', id, '用户ID:', session.user.id);
    await dbConnect();

    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ message: '帖子不存在' }, { status: 404 });      
    }

    // 创建用户引用ID
    const userId = new mongoose.Types.ObjectId(session.user.id);
    
    // 添加评论
    post.comments.push({
      user: userId,
      content,
      createdAt: new Date()
    });

    await post.save();

    // 重新获取完整的帖子数据        
    const updatedPost = await Post.findById(id)
      .populate('author', 'username')
      .populate('comments.user', 'username');

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('添加评论失败:', error);
    return NextResponse.json(
      { message: '添加评论失败，请稍后再试', error: (error as Error).message },
      { status: 500 }
    );
  }
} 