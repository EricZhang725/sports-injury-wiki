import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { dbConnect } from '@/app/lib/db';

// 确保API路由为动态渲染
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 尝试连接数据库
    console.log('正在检查数据库连接状态...');
    await dbConnect();
    
    // 检查连接状态
    const state = mongoose.connection.readyState;
    const stateMap = {
      0: '断开连接',
      1: '已连接',
      2: '正在连接',
      3: '正在断开连接'
    };
    
    // 获取连接信息
    const connectionInfo = {
      state: stateMap[state as keyof typeof stateMap] || '未知状态',
      host: mongoose.connection.host || '未知',
      name: mongoose.connection.name || '未知',
      models: Object.keys(mongoose.models),
      readyState: state
    };
    
    return NextResponse.json({
      success: true,
      message: '数据库连接检查完成',
      connection: connectionInfo,
      mongooseVersion: mongoose.version
    });
  } catch (error) {
    console.error('数据库状态检查失败:', error);
    return NextResponse.json({
      success: false,
      message: '数据库连接检查失败',
      error: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
  }
} 