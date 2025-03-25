import 'server-only'
 
import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import { cache } from 'react';
import prisma from '@/lib/prisma';
 
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
 
  if (!session.userId) {
    redirect('/login')
  }
 
  return { isAuth: true, userId: session.userId }
})

export const getUser = cache(async () => {
    const session = await verifySession();
    if (!session) return null;
   
    const { userId } = session;
    try {
      const data = await prisma.user.findFirst({
        where: {id: userId},
      });
   
      console.log(data);
      const user = data;
      
      return user;
    } catch (error) {
      console.log('Failed to fetch user', error);
      return null;
    }
  })