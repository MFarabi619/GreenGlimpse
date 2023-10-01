import NextAuth from 'next-auth'
// import type { NextAuthOptions } from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
// import { FirestoreAdapter } from "@auth/firebase-adapter";
// import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import clientPromise from "@/lib/mongodb"
// import { Adapter } from 'next-auth/adapters'
import {redirect} from "next/navigation";



import Google from "next-auth/providers/google"
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
//ToDo : error handling from data base, redirect nad alerts.

// @ts-ignore
export const authOptions  = {
    secret: process.env.AUTH_SECRET,
    providers: [
        GoogleProvider({
            // @ts-ignore
            clientId: process.env.GOOGLE_ID,
            // @ts-ignore
            clientSecret: process.env.GOOGLE_SECRET ,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),

    ],



}





