import prisma from '@/lib/prisma';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

const authOptions = {
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'Enter your email' },
                password: { label: 'Password', type: 'password', placeholder: 'Enter your password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password are required');
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                console.log(user);
                
                if (!user) {
                    throw new Error('User not found');
                }

                const passwordMatch = await bcrypt.compare(credentials.password, user.password);
                if (!passwordMatch) {
                    throw new Error('Invalid credentials');
                }

                // desde aquí se logea y pasa al jwt.
                return {
                    id: Number(user.id),
                    email: user.email,
                    roleId: Number(user.roleId),
                    username: user.username,
                };
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, user }) {
            // desde aquí pasa a la session
            if (user) {
                token.id = user.id; // ✅ Agregamos `id` al token
                token.email = user.email; // ✅ Agregamos `email` al token
                token.roleId = user.roleId; // ✅ Agregamos `roleId` al token
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.id) {
                session.userId = token.id; // ✅ Usamos `token.id` en vez de `user.id`
                session.email = token.email; // ✅ Usamos `token.email` en vez de `user.email`
                session.roleId = token.roleId; // ✅ Agregamos `roleId` al token
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default authOptions;
