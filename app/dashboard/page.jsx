import { verifySession } from '@/app/lib/dal'
 
export default async function Dashboard() {
  const session = await verifySession()
  const userRole = session.role // Assuming 'role' is part of the session object
 
  if (userRole === 'admin') {
    return <AdminDashboard />
  } else if (userRole === 'user') {
    return <UserDashboard />
  } else {
    redirect('/login')
  }
}