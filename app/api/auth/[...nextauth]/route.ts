import NextAuth from 'next-auth'

import { authOptions } from '@/config/authOptions'
// import { Firestore } from 'firebase/firestore';

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
