import { redirect } from 'next/navigation';
import UserDashboard from '@/pages/Dashboard/UserDashboard';
import AdminDashboard from '@/pages/Dashboard/AdminDashboard';
import Main from '@/components/layouts/main';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/lib/auth';

export default async function Dashboard() {
  const user = await getServerSession(authOptions);
  
  if (user && user.userId) {
    const userRole = user.roleId; // Assuming 'role' is part of the session object
    
    if (userRole == 1) {
      return (
        <Main>
        <AdminDashboard />
        </Main>
      );
    } else if (userRole == 2) {
      return (
        <Main>
        <UserDashboard />
        </Main>
      );
    } else {
      redirect('/login');
    }
  }
}