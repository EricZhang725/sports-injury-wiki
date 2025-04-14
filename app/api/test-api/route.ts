import { NextResponse } from 'next/server';

// 确保API路由为动态渲染
export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    message: "API测试成功",
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: Request) {
  try {
    // 尝试解析请求体
    const body = await request.json();
    
    return NextResponse.json({ 
      success: true, 
      message: "POST请求处理成功",
      receivedData: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("测试API错误:", error);
    return NextResponse.json({
      success: false,
      message: "请求处理失败",
      error: error instanceof Error ? error.message : "未知错误"
    }, { status: 400 });
  }
} 