import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// 记录数据库连接状态
console.log('MongoDB URI:', MONGODB_URI);

/**
 * 全局变量来跟踪数据库连接状态
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * 连接重试次数和超时设置
 */
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1秒
const CONNECTION_TIMEOUT = 10000; // 10秒

/**
 * 带重试逻辑的连接到MongoDB数据库
 */
export async function connectToDatabase() {
  if (cached.conn) {
    console.log('已有MongoDB连接，重用现有连接');
    return cached.conn;
  }

  if (!cached.promise) {
    let retries = 0;
    
    const tryConnect = async () => {
      try {
        console.log(`尝试连接到MongoDB (尝试 ${retries + 1}/${MAX_RETRIES})...`);
        
        const opts = {
          bufferCommands: false,
          connectTimeoutMS: CONNECTION_TIMEOUT,
          serverSelectionTimeoutMS: CONNECTION_TIMEOUT,
        };

        // 创建新的连接承诺
        const mongooseInstance = await mongoose.connect(MONGODB_URI!, opts);
        console.log('MongoDB连接成功');
        return mongooseInstance;
      } catch (error) {
        console.error('MongoDB连接失败:', error);
        
        if (retries < MAX_RETRIES - 1) {
          retries++;
          console.log(`${RETRY_DELAY}毫秒后重试...`);
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
          return tryConnect();
        }
        throw error;
      }
    };

    // 开始连接过程
    cached.promise = tryConnect();
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.error('所有MongoDB连接尝试均失败:', error);
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

// 添加显式断开连接的方法
export async function disconnectFromDatabase() {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log('MongoDB连接已断开');
  }
}

// 为了向后兼容，添加dbConnect别名
export const dbConnect = connectToDatabase;

// 为了向后兼容，同时提供默认导出
export default connectToDatabase; 