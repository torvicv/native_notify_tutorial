import { getUser } from '@/app/lib/dal';
import { redirect } from 'next/navigation';
import UserDashboard from '@/pages/Dashboard/UserDashboard';
import AdminDashboard from '@/pages/Dashboard/AdminDashboard';
import Main from '@/components/layouts/main';
import { getServerSession } from 'next-auth';
import authOptions from '../lib/auth';

export default async function Dashboard() {
  const user = await getServerSession(authOptions);
  console.log(user);
  
  if (user && user.userId) {
    const userRole = user.roleId; // Assuming 'role' is part of the session object
    
    if (userRole == 1) {
      return (
        <Main>
        <AdminDashboard user={user} />
        </Main>
      );
    } else if (userRole == 2) {
      return (
        <Main>
        <UserDashboard user={user} />
        </Main>
      );
    } else {
      redirect('/login');
    }
  }
}