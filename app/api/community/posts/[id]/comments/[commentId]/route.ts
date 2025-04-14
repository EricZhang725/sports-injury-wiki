import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { dbConnect } from '@/app/lib/db';
import Post from '@/app/models/Post';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; commentId: string }> | { id: string; commentId: string } }
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
    const { id, commentId } = resolvedParams;
    
    if (!id || !commentId) {
      return NextResponse.json(
        { message: '无效的帖子ID或评论ID' },
        { status: 400 }
      );
    }

    console.log('删除评论，帖子ID:', id, '评论ID:', commentId);
    await dbConnect();

    // 查找帖子
    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json(
        { message: '帖子不存在' },
        { status: 404 }
      );
    }

    // 查找评论
    const commentIndex = post.comments.findIndex(
      (c: any) => c._id.toString() === commentId
    );
    
    if (commentIndex === -1) {
      return NextResponse.json(
        { message: '评论不存在' },
        { status: 404 }
      );
    }

    const comment = post.comments[commentIndex];

    // 检查权限：只有评论作者或帖子作者可以删除评论
    const isCommentAuthor = comment.user._id.toString() === session.user.id;
    const isPostAuthor = post.author._id.toString() === session.user.id;

    if (!isCommentAuthor && !isPostAuthor) {
      return NextResponse.json(
        { message: '无权删除此评论' },
        { status: 403 }
      );
    }

    // 删除评论
    post.comments.splice(commentIndex, 1);
    await post.save();

    return NextResponse.json(
      { message: '评论删除成功' }
    );
  } catch (error) {
    console.error('删除评论失败:', error);
    return NextResponse.json(
      { message: '删除评论失败，请稍后再试', error: (error as Error).message },
      { status: 500 }
    );
  }
} 