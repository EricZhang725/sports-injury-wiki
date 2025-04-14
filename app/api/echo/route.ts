import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // 读取请求体
    const body = await request.json();
    
    // 读取请求头
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      headers[key] = value;
    });
    
    // 返回请求信息
    return NextResponse.json({
      success: true,
      message: 'Echo服务正常工作',
      requestInfo: {
        method: request.method,
        url: request.url,
        headers: headers,
        body: body
      }
    });
  } catch (error) {
    console.error('Echo API错误:', error);
    return NextResponse.json({
      success: false,
      message: '请求处理失败',
      error: error instanceof Error ? error.message : '未知错误'
    }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Echo API正常工作',
    timestamp: new Date().toISOString()
  });
} 