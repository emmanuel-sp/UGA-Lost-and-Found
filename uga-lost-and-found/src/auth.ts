import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { User } from './models/UserSchema';
import connectMongoDB from '@/libs/mongodb';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'example@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error('Missing credentials:', credentials);
          return null;
        }

        try {
          console.log('Connecting to MongoDB...');
          await connectMongoDB();
          console.log('Connected to MongoDB.');

          const normalizedEmail = credentials.email.toLowerCase();
          console.log(`Finding user with email: ${normalizedEmail}`);

          const user = await User.findOne({ email: normalizedEmail }).lean();
          console.log('User query result:', user);

          if (!user) {
            console.error('User not found');
            return null;
          }

          console.log('Comparing passwords...');
          const isMatch = await bcrypt.compare(credentials.password, user.password);

          if (!isMatch) {
            console.error('Password mismatch');
            return null;
          }

          console.log('Authentication successful');
          return { id: user._id.toString(), email: user.email };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
});
