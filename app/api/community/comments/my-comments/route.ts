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

    // 确保session.user.id存在
    const userId = session.user.id;
    if (!userId) {
      return NextResponse.json(
        { message: '用户ID不存在' },
        { status: 400 }
      );
    }

    // 添加日志
    console.log('正在为用户获取评论:', userId);

    await dbConnect();
    
    // 转换userId为ObjectId
    const objectId = new mongoose.Types.ObjectId(userId);
    console.log('使用ObjectID查询评论:', objectId);
    
    // 获取所有包含用户评论的帖子，考虑多种可能的数据结构
    const postsWithUserComments = await Post.find({
      $or: [
        { 'comments.user': objectId },              // 如果user直接存储ID
        { 'comments.user._id': objectId },          // 如果user是对象且有_id
        { 'comments.user._id': userId.toString() }  // 如果user是对象且_id存储为字符串
      ]
    })
    .populate('comments.user', 'username')
    .lean();
    
    console.log(`找到 ${postsWithUserComments.length} 个包含评论的帖子`);
    
    // 从每个帖子中提取用户的评论
    const userComments = [];
    
    for (const post of postsWithUserComments) {
      // 检查并记录评论的结构
      if (post.comments && post.comments.length > 0) {
        console.log('评论结构示例:', JSON.stringify(post.comments[0]));
      }
      
      // 提取属于当前用户的评论，考虑多种可能的结构
      const comments = post.comments.filter((comment: any) => {
        if (!comment.user) return false;
        
        if (typeof comment.user === 'string') {
          return comment.user === userId;
        } else if (comment.user._id) {
          // user是一个对象，检查_id
          const commentUserId = String(comment.user._id);
          return commentUserId === userId;
        }
        return false;
      });
      
      // 给每个评论添加帖子信息以便前端显示
      comments.forEach((comment: any) => {
        userComments.push({
          ...comment,
          postId: post._id,
          postTitle: post.title
        });
      });
    }
    
    // 按照时间排序
    userComments.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    console.log(`总共找到 ${userComments.length} 条评论`);
    
    return NextResponse.json(userComments);
  } catch (error) {
    console.error('获取我的评论失败:', error);
    return NextResponse.json(
      { message: '获取评论失败', error: (error as Error).message },
      { status: 500 }
    );
  }
} 