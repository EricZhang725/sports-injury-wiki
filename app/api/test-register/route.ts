import { NextRequest, NextResponse } from 'next/server';

// 这是一个不需要数据库连接的测试API，用于检查前端是否可以正确解析响应
export async function POST(request: NextRequest) {
  console.log('测试注册API收到请求');
  
  try {
    // 解析请求体
    const body = await request.json();
    console.log('测试注册API收到数据:', body);
    
    // 模拟成功响应
    return NextResponse.json({
      success: true,
      message: '测试注册成功',
      user: {
        id: 'test-user-id',
        username: body.username || 'test-user',
        email: body.email || 'test@example.com',
        role: body.adminCode === 'admin123' ? 'admin' : 'user'
      }
    });
  } catch (error) {
    console.error('测试注册API错误:', error);
    
    // 即使出错也返回JSON
    return NextResponse.json({
      success: false,
      message: '测试注册失败',
      error: error instanceof Error ? error.message : '未知错误'
    }, { status: 400 });
  }
} 