import { getUser } from '@/app/lib/dal';
import { redirect } from 'next/navigation';
import UserDashboard from '@/pages/Dashboard/UserDashboard';
import AdminDashboard from '@/pages/Dashboard/AdminDashboard';
 
export default async function Dashboard() {
  const user = await getUser();
  
  const userRole = user.roleId // Assuming 'role' is part of the session object
  
  if (userRole == 1) {
    return (
      <AdminDashboard user={user} />
    );
  } else if (userRole == 2) {
    return (
      <UserDashboard user={user} />
    );
  } else {
    redirect('/login');
  }
}