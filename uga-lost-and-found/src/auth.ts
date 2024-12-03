import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { User } from './models/UserSchema';
import connectMongoDB from '@/libs/mongodb';
import { authConfig } from './auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        let data = null;
        if (!credentials) throw new Error('No credentials');
        

        const user = await User.findOne({ email: credentials.email }).lean();

        if (user) {
          const isMatch = await bcrypt.compare(
            credentials.password, 
            user.password
          );

          if (isMatch) {
            data = {
              id: user._id.toString(),
              email: user.email,
              name: user.username,
            };
          } else {
            throw new Error("Email or Password incorrect");
          }
        } else {
          throw new Error("User not found")
        }
        
        return data;
      },
    }),
  ],
});
