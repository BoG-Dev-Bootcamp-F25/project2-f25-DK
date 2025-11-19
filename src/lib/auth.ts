import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import { NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';


const providers = [
    CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
            username: {
                label: 'Username',
                type: 'text',
                placeholder: 'jsmith',
            },
            password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials, req) {
            console.log('Authorize request ', req);
            try {
                const baseUrl = process.env.NEXTAUTH_URL;
                const res = await fetch(`${baseUrl}/api/user/verify`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(req.body),
                });
                const respBody = await res.json();
                if (res.status == 200) {
                    return respBody;
                }
                // Return null if user data could not be retrieved
                return null;
            } catch {
                return null;
            }
        },
    }),
];

export const authOptions: NextAuthOptions = {
    providers,
    callbacks: {
        async jwt({ token, user }) {
            console.log('JWT callback user ', user);
            const userData = user as any;
            if (user) {
                token.name = userData.fullName;
                token.admin = userData.admin;
                token.sub = userData._id;
            }
            return token;
        },
        async session({ session, token }) {
            // Add custom properties from the token to the session user object
            if (token) {
                (session.user as any).fullName = token?.name;
                (session.user as any).email = token?.email;
                (session.user as any).admin = token?.admin;
                (session.user as any)._id = token?.sub;
            }
            return session;
        },
    },
    pages: {
        signIn: '/signin',
    },
};

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions)
}
