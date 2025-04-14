import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { dbConnect } from '@/app/lib/db';
import User from '@/app/models/User';
import type { AuthOptions } from 'next-auth';

// 确保API路由为动态渲染
export const dynamic = 'force-dynamic';

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
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Please enter username and password');
        }

        await dbConnect();

        const user = await User.findOne({ username: credentials.username });
        if (!user) {
          throw new Error('User not found');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user._id.toString(),
          username: user.username,
          role: user.role
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
        console.log('JWT callback - setting user role:', user.role);
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.sub as string,
          username: token.username as string,
          role: token.role as string
        };
        console.log('Session callback - user role in session:', session.user.role);
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
};

// 使用自定义配置创建 NextAuth 处理程序
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 