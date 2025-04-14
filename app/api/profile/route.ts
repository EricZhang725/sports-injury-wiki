import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { dbConnect } from '@/app/lib/db';
import User from '@/app/models/User';

// 获取用户资料
export async function GET() {
  try {
    // 获取用户会话
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.username) {
      return NextResponse.json(
        { error: '未登录，请先登录系统', status: 'unauthenticated' },
        { status: 401 }
      );
    }

    await dbConnect();

    const username = session.user.username;
    // 使用简单查询，避免类型错误
    const user = await User.findOne({ username });
    
    if (!user) {
      return NextResponse.json(
        { error: '未找到用户', status: 'user_not_found' },
        { status: 404 }
      );
    }

    // Log user role info for debugging
    console.log('Found user in profile API:', user.username);
    console.log('User role in database:', user.role);
    console.log('User is admin?', user.role === 'admin');

    // 转换为普通对象并删除密码
    const userObj = user.toObject();
    delete userObj.password;
    
    return NextResponse.json(userObj);
  } catch (error) {
    console.error('获取用户资料失败:', error);
    return NextResponse.json(
      { error: '服务器错误，请稍后再试', status: 'server_error' },
      { status: 500 }
    );
  }
}

// 更新用户资料
export async function PUT(request: Request) {
  try {
    // 获取用户会话
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.username) {
      return NextResponse.json(
        { error: '未登录，请先登录系统' },
        { status: 401 }
      );
    }

    const data = await request.json();
    await dbConnect();

    // 验证生日格式
    if (data.birthday && isNaN(Date.parse(data.birthday))) {
      return NextResponse.json(
        { error: '生日格式不正确' },
        { status: 400 }
      );
    }

    // 更新用户资料
    const username = session.user.username;
    const updateData = {
      ...(data.signature !== undefined && { signature: data.signature }),
      ...(data.birthday !== undefined && { birthday: data.birthday ? new Date(data.birthday) : null }),
    };

    const user = await User.findOneAndUpdate(
      { username },
      { $set: updateData },
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        { error: '未找到用户' },
        { status: 404 }
      );
    }

    // 转换为普通对象并删除密码
    const userObj = user.toObject();
    delete userObj.password;
    
    return NextResponse.json(userObj);
  } catch (error) {
    console.error('更新用户资料失败:', error);
    return NextResponse.json(
      { error: '服务器错误，请稍后再试' },
      { status: 500 }
    );
  }
} 