'use client'

import { Table } from './components/table';

export default function Servicios({bonos}) {
  return (
    <>
      <h1>Clientes</h1>
      <Table bonos={bonos} />
    </>
  )
}