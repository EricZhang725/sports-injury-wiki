import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { dbConnect } from '@/app/lib/db';
import Post from '@/app/models/Post';

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

    await dbConnect();
    
    // 获取指定用户的所有帖子
    const posts = await Post.find({ author: params.id })
      .sort({ createdAt: -1 })
      .populate('author', 'username');
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('获取用户帖子失败:', error);
    return NextResponse.json(
      { error: '获取用户帖子失败，请稍后再试' },
      { status: 500 }
    );
  }
} 