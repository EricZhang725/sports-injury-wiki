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

export const authOptions: AuthOptions = {
  debug: true, // 启用调试
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log("NextAuth authorize function called with username:", credentials?.username);
        
        if (!credentials?.username || !credentials?.password) {
          console.error("Missing credentials");
          return null;
        }

        try {
          await dbConnect();
          console.log("Database connected, searching for user...");

          // 尝试用用户名查找
          let user = await User.findOne({ username: credentials.username }).select('+password');
          
          // 如果没找到，尝试用邮箱查找
          if (!user) {
            user = await User.findOne({ email: credentials.username }).select('+password');
            console.log("Searching by email, found user:", !!user);
          } else {
            console.log("Found user by username");
          }

          if (!user) {
            console.error("User not found");
            return null;
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);
          console.log("Password validation result:", isValid);
          
          if (!isValid) {
            console.error("Invalid password");
            return null;
          }

          console.log("User authenticated successfully:", user.username);
          
          return {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            role: user.role
          };
        } catch (error) {
          console.error("Error in authorize function:", error);
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
  secret: process.env.NEXTAUTH_SECRET,
};

// 使用自定义配置创建 NextAuth 处理程序
const handler = NextAuth(authOptions);
console.log("NextAuth handler created");

export { handler as GET, handler as POST }; 