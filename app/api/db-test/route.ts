import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { dbConnect } from '@/app/lib/db';

// 确保API路由为动态渲染
export const dynamic = 'force-dynamic';

export async function GET() {
  console.log('DB-TEST API: 开始执行测试');
  
  try {
    console.log('DB-TEST API: 检查环境变量');
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('未设置MONGODB_URI环境变量');
    }
    
    console.log('DB-TEST API: MongoDB URI =', mongoUri);
    
    console.log('DB-TEST API: 尝试连接到数据库');
    const startTime = Date.now();
    
    const conn = await dbConnect();
    const connectionTime = Date.now() - startTime;
    
    console.log(`DB-TEST API: 数据库连接成功 (${connectionTime}ms)`);
    
    const dbStatus = {
      status: 'success',
      message: '数据库连接成功',
      connectionTime: `${connectionTime}ms`,
      mongoose: {
        version: mongoose.version,
        connection: {
          host: mongoose.connection.host,
          port: mongoose.connection.port,
          name: mongoose.connection.name,
          readyState: mongoose.connection.readyState,
          models: Object.keys(mongoose.models),
        }
      }
    };
    
    console.log('DB-TEST API: 数据库状态 =', JSON.stringify(dbStatus, null, 2));
    
    return NextResponse.json(dbStatus);
  } catch (error) {
    console.error('DB-TEST API: 错误 =', error);
    
    return NextResponse.json({
      status: 'error',
      message: '数据库连接失败',
      error: error instanceof Error ? error.message : String(error),
      stack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
} 