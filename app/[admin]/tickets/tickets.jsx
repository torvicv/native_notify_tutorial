'use client'

import { Table } from './components/table';

export default function Tickets({tickets}) {
  return (
    <>
      <h1>Tickets</h1>
      <Table tickets={tickets} />
    </>
  )
}