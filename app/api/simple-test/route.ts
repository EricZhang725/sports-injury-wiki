import { NextResponse } from 'next/server';

// 确保API路由为动态渲染
export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'API is working!',
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: 'Data received successfully',
      data: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Invalid JSON data',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 400 });
  }
} 