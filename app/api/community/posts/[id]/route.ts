import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { dbConnect } from '@/app/lib/db';
import Post from '@/app/models/Post';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: '请先登录' }, { status: 401 });
    }

    // 在Next.js 15中，我们需要await params
    const resolvedParams = 'then' in params ? await params : params;
    const id = resolvedParams.id;
    
    if (!id) {
      return NextResponse.json({ message: '帖子ID无效' }, { status: 400 });
    }
    
    console.log('获取帖子详情，ID:', id);
    await dbConnect();

    const post = await Post.findById(id)
      .populate('author', 'username')
      .populate('comments.user', 'username');

    if (!post) {
      return NextResponse.json({ message: '帖子不存在' }, { status: 404 });
    }

    // 增加浏览量
    post.views += 1;
    await post.save();

    return NextResponse.json(post);
  } catch (error) {
    console.error('获取帖子失败:', error);
    return NextResponse.json(
      { message: '获取帖子失败，请稍后再试' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: '请先登录' }, { status: 401 });
    }

    // 先await params
    const resolvedParams = 'then' in params ? await params : params;
    const id = resolvedParams.id;
    
    if (!id) {
      return NextResponse.json({ message: '帖子ID无效' }, { status: 400 });
    }

    console.log('删除帖子，ID:', id);
    await dbConnect();

    // Use the static deletePost method from the Post model
    await Post.deletePost(id, session.user.id);

    return NextResponse.json({ message: '帖子删除成功' });
  } catch (error) {
    console.error('删除帖子失败:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : '删除帖子失败，请稍后再试' },
      { status: 500 }
    );
  }
} 