import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { dbConnect } from '@/app/lib/db';
import Post from '@/app/models/Post';
import mongoose from 'mongoose';

// 确保API路由为动态渲染
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: '未授权访问' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    if (!userId) {
      return NextResponse.json(
        { message: '用户ID不存在' },
        { status: 400 }
      );
    }

    console.log('正在为用户获取帖子:', userId);

    await dbConnect();
    
    // 转换userId为ObjectId并使用正确的字段进行查询
    const objectId = new mongoose.Types.ObjectId(userId);
    console.log('使用ObjectID查询:', objectId);
    
    // 使用更准确的查询，尝试多种可能的结构
    const posts = await Post.find({ 
      $or: [
        { author: objectId },                // 如果author直接存储ID
        { 'author._id': objectId },          // 如果author是对象且有_id
        { 'author._id': userId.toString() }  // 如果author是对象且_id存储为字符串
      ]
    })
    .sort({ createdAt: -1 })
    .populate('author', 'username')
    .lean();
    
    console.log(`找到 ${posts.length} 个帖子`);
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('获取我的帖子失败:', error);
    return NextResponse.json(
      { message: '获取帖子失败', error: (error as Error).message },
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

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: '未授权访问' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    if (!userId) {
      return NextResponse.json(
        { message: '用户ID不存在' },
        { status: 400 }
      );
    }

    console.log('正在为用户获取帖子:', userId);

    await dbConnect();
    
    // 转换userId为ObjectId并使用正确的字段进行查询
    const objectId = new mongoose.Types.ObjectId(userId);
    console.log('使用ObjectID查询:', objectId);
    
    // 使用更准确的查询，尝试多种可能的结构
    const posts = await Post.find({ 
      $or: [
        { author: objectId },                // 如果author直接存储ID
        { 'author._id': objectId },          // 如果author是对象且有_id
        { 'author._id': userId.toString() }  // 如果author是对象且_id存储为字符串
      ]
    })
    .sort({ createdAt: -1 })
    .populate('author', 'username')
    .lean();
    
    console.log(`找到 ${posts.length} 个帖子`);
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('获取我的帖子失败:', error);
    return NextResponse.json(
      { message: '获取帖子失败', error: (error as Error).message },
      { status: 500 }
    );
  }
} 