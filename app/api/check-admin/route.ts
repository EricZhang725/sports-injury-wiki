import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { dbConnect } from '@/app/lib/db';
import User from '@/app/models/User';

// 确保API路由为动态渲染
export const dynamic = 'force-dynamic';

/**
 * 检查管理员状态的诊断API
 */
export async function GET() {
  try {
    await dbConnect();
    
    // 获取会话，检查是否已登录
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({
        loggedIn: false,
        message: '未登录'
      });
    }
    
    console.log('当前会话信息:', {
      id: session.user.id,
      username: session.user.username,
      role: session.user.role
    });
    
    // 从数据库获取用户信息
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({
        loggedIn: true,
        databaseUserFound: false,
        message: '数据库中未找到用户'
      });
    }
    
    // 获取所有管理员用户
    const adminUsers = await User.find({ role: 'admin' }).select('username email role');
    
    return NextResponse.json({
      loggedIn: true,
      databaseUserFound: true,
      sessionInfo: {
        id: session.user.id,
        username: session.user.username,
        role: session.user.role
      },
      databaseInfo: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive
      },
      adminUsers
    });
  } catch (error) {
    console.error('检查管理员状态失败:', error);
    return NextResponse.json(
      { error: '检查管理员状态失败', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 