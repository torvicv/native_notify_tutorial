'use client'

import { useRouter } from 'next/navigation';

export default function Articulos({articulos}) {
  const router = useRouter();
  const create = () => {
    router.push('/admin/articulos/create');
  }  
  return (
    <>
      <h1>Clientes</h1>
      <button onClick={create} >
        Crear Artículo
      </button>
      {articulos?.length > 0 && articulos.map((articulo) => (
        <div key={articulo.nombre}>
          <p>{articulo.nombre}</p>
        </div>
      ))}
    </>
  )
}