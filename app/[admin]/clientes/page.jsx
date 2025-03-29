import Main from '@/components/layouts/main';
import Clientes from './clientes';

export default async function Page() {  
  const response = await fetch(process.env.NEXTAUTH_URL+'/api/admin/clientes');
  const clientes = await response.json();
  return (
    <Main>
      <Clientes clientes={clientes} />
    </Main>
  )
}