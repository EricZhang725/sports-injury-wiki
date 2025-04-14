import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { dbConnect } from '@/app/lib/db';
import Post from '@/app/models/Post';
import User from '@/app/models/User';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: '请先登录' }, { status: 401 });
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'username')
      .populate('comments.user', 'username');

    const total = await Post.countDocuments();

    return NextResponse.json({
      posts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('获取帖子列表失败:', error);
    return NextResponse.json(
      { message: '获取帖子列表失败，请稍后再试' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: '请先登录' }, { status: 401 });
    }

    const { title, content, tags } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { message: '标题和内容不能为空' },
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await User.findOne({ username: session.user.username });
    if (!user) {
      return NextResponse.json({ message: '用户不存在' }, { status: 404 });
    }

    const post = await Post.create({
      title,
      content,
      author: user._id,
      tags: tags || [],
    });

    const populatedPost = await Post.findById(post._id)
      .populate('author', 'username')
      .populate('comments.user', 'username');

    return NextResponse.json(populatedPost);
  } catch (error) {
    console.error('创建帖子失败:', error);
    return NextResponse.json(
      { message: '创建帖子失败，请稍后再试' },
      { status: 500 }
    );
  }
} 