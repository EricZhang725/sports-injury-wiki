import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { dbConnect } from '@/app/lib/db';
import User from '@/app/models/User';
import type { AuthOptions } from 'next-auth';

// 确保API路由为动态渲染
export const dynamic = 'force-dynamic';

// 帮助调试
console.log("NextAuth API route loaded");
console.log("Current NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
console.log("Current environment:", process.env.NODE_ENV);
console.log("Current MONGODB_URI:", process.env.MONGODB_URI?.substring(0, 20) + "...");

// 扩展 session 类型和用户类型
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username?: string;
      email?: string;
      role?: string;
    }
  }
  
  interface User {
    id: string;
    username?: string;
    email?: string;
    role?: string;
  }

  interface JWT {
    username?: string;
    role?: string;
  }
}

// 添加超时处理的函数
const withTimeout = <T>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`操作超时 (${timeoutMs}ms)`));
    }, timeoutMs);

    promise
      .then(value => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch(error => {
        clearTimeout(timer);
        reject(error);
      });
  });
};

export const authOptions: AuthOptions = {
  debug: true, // 启用调试
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: 'Credentials',
      credentials: {
        username: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log("NextAuth authorize function called with username:", credentials?.username);
        
        if (!credentials?.username || !credentials?.password) {
          console.error("Missing credentials");
          return null;
        }

        try {
          console.log("====== 认证流程开始 ======");
          console.log("1. 尝试连接到数据库...");
          
          // 尝试连接数据库，使用改进的dbConnect函数
          try {
            await dbConnect();
            console.log("2. 数据库连接成功，开始搜索用户...");
          } catch (dbError) {
            console.error("2. 数据库连接失败:", dbError);
            throw new Error("Database connection failed: " + (dbError instanceof Error ? dbError.message : String(dbError)));
          }

          // 尝试用用户名查找
          let user;
          try {
            user = await User.findOne({ username: credentials.username }).select('+password');
            if (user) {
              console.log("3. 通过用户名找到用户");
            } else {
              console.log("3. 用户名搜索无结果，尝试通过邮箱搜索");
              // 如果没找到，尝试用邮箱查找
              user = await User.findOne({ email: credentials.username }).select('+password');
              if (user) {
                console.log("4. 通过邮箱找到用户");
              } else {
                console.log("4. 用户不存在");
              }
            }
          } catch (userError) {
            console.error("查找用户时出错:", userError);
            throw new Error("User search failed: " + (userError instanceof Error ? userError.message : String(userError)));
          }

          if (!user) {
            console.error("用户不存在");
            return null;
          }

          try {
            const isValid = await bcrypt.compare(credentials.password, user.password);
            console.log("5. 密码验证结果:", isValid);
            
            if (!isValid) {
              console.error("密码无效");
              return null;
            }
          } catch (bcryptError) {
            console.error("密码比对失败:", bcryptError);
            throw new Error("Password comparison failed: " + (bcryptError instanceof Error ? bcryptError.message : String(bcryptError)));
          }

          console.log("6. 用户认证成功:", user.username);
          console.log("====== 认证流程结束 ======");
          
          return {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            role: user.role
          };
        } catch (error) {
          console.error("======认证过程中的错误======");
          console.error(error);
          console.error("==========================");
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('SignIn callback called with user:', user?.username || user?.email);
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        console.log('JWT callback - Adding user data to token:', user.username);
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        console.log('Session callback - Adding token data to session');
        session.user = {
          ...session.user,
          id: token.sub as string,
          username: token.username as string,
          email: token.email as string,
          role: token.role as string
        };
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  // 增加超时设置
  theme: {
    colorScheme: "light",
  },
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    },
  },
  logger: {
    error(code, ...message) {
      console.error('NextAuth error:', code, ...message);
    },
    warn(code, ...message) {
      console.warn('NextAuth warning:', code, ...message);
    },
    debug(code, ...message) {
      if (process.env.NEXTAUTH_DEBUG === 'true') {
        console.log('NextAuth debug:', code, ...message);
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// 使用自定义配置创建 NextAuth 处理程序
const handler = NextAuth(authOptions);
console.log("NextAuth handler created");

export { handler as GET, handler as POST }; 