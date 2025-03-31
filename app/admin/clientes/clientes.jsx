'use client'

import { useRouter } from 'next/navigation';

export default function Clientes({clientes}) {
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
      {clientes?.length > 0 && clientes.map((cliente) => (
        <div key={cliente.nombre}>
          <p>{cliente.nombre}</p>
        </div>
      ))}
    </>
  )
}