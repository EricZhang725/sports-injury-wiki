import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import User from '@/app/models/User';

// 确保API路由为动态渲染
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('DB测试: 尝试连接数据库');
    
    // 尝试连接到数据库
    const conn = await dbConnect();
    console.log('DB测试: 数据库连接成功', {
      connected: !!conn,
      host: process.env.MONGODB_URI?.split('@')[1]?.split('/')[0] || 'unknown'
    });
    
    // 尝试获取用户数量
    const userCount = await User.countDocuments();
    console.log('DB测试: 用户数量', userCount);
    
    return NextResponse.json({
      status: 'success',
      message: '数据库连接成功',
      details: {
        connected: true,
        host: process.env.MONGODB_URI?.split('@')[1]?.split('/')[0] || 'unknown',
        userCount
      }
    });
  } catch (error) {
    console.error('DB测试: 连接失败', error);
    
    return NextResponse.json({
      status: 'error',
      message: '数据库连接失败',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 