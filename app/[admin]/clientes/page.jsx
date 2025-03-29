'use client'

import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';

export default function Dashboard() {
  const user = getSession();
  
  const router = useRouter();
  const create = () => {
    router.push('/admin/clientes/create');
  }
  return (
    <>
      <h1>Clientes</h1>
      <button onClick={create} >
        Crear Cliente
      </button>
    </>
  )
}