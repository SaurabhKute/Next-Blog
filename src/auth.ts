import NextAuth, { CredentialsSignin } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { sql } from "@vercel/postgres"
import bcrypt from 'bcryptjs'


export const { auth, handlers, signIn, signOut } = NextAuth({
    //   providers: [GitHub, Google,Credentials],
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            authorize: async (credentials) => {
                console.log(credentials);
                const email = credentials.email as string;
                const password = credentials.password as string;

                if (!email || !password) {
                    throw new CredentialsSignin({ cause: "Email and Password are required" });
                }
                try {

                    const result = await sql`SELECT * FROM users WHERE email = ${email}`;
                    const user = result.rows[0];

                    if (!user) {
                        throw new CredentialsSignin({ cause: "User not found" });
                    }

                    const isValidPassword = await bcrypt.compare(password, user.password);
                    if (!isValidPassword) {
                        throw new CredentialsSignin({ cause: "Invalid password" });
                    }

                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        image: user.image,
                    };


                } catch (error) {
                    console.error(error);
                    throw new CredentialsSignin({ cause: "An error occurred during authentication" });

                }

            }
        })
    ],
    pages:{
        signIn:'/login',

    }
})
