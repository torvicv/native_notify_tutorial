'use client'

import { Table } from './components/table';

export default function Servicios({servicios}) {
  return (
    <>
      <h1>Clientes</h1>
      <Table servicios={servicios} />
    </>
  )
}