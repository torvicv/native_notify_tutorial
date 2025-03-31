'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AddTickets from "../components/addTickets";

export default function Show({ticket}) {

  console.log(ticket);
  
  const [error, setError] = useState('');
  const [clientes, setClientes] = useState([]);
  const resolver = z.object({
    clienteId: z.string()
        .transform((val) => (val === "" ? null : Number(val))),
    detalles: z.array(
      z.object({ 
        servicioId: z.string()
        .transform((val) => (val === "" ? null : Number(val)))
        .nullable()
        .optional(), // Permite `null` y hace que el campo sea opcional,
        cantidad: z.coerce.number().min(1),
        articuloId: z.string()
        .transform((val) => (val === "" ? null : Number(val)))
        .nullable()
        .optional(), // Permite `null` y hace que el campo sea opcional
        bonoId: z.string()
        .transform((val) => (val === "" ? null : Number(val)))
        .nullable()
        .optional(), // Permite `null` y hace que el campo sea opcional
      })
    ).min(1)
  });
  const {watch, setValue, register, handleSubmit, formState: { errors }} = useForm({
    resolver: zodResolver(resolver),
    defaultValues: {
      nombre: ticket?.nombre,
      detalles: [
        ticket?.detalles.map(t => {
          return {
            servicioId: t.servicioId,
            cantidad: t.cantidad,
            articuloId: t.articuloId,
            bonoId: t.bonoId,
          }
        })
      ]
    },
  });

  const tiket = fetch("/api/admin/tickets/1")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
  console.log(tiket);
  

  const onSubmit = async (data) => {
    // console.log("Formulario enviado:", data);
    // Enviar los datos al backend
    const response = await fetch('/api/admin/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    .then((res) => {
      if (res.status === 400) {
        const error = res.json().then(err => {
          return err.error;
        });
        setError(error);
      }
    })
    .catch(err => {
      console.error('Error:', err);
    });
  };

  useEffect(() => {
      fetch('/api/admin/clientes')
       .then((res) => {
         if (!res.ok) {
          throw new Error('Error fetching artículos');
        }
        const response = res.json().then((data) => {
          console.log(data);
          setClientes(data);
        });
        
      }).catch((error) => {
        console.error('Error:', error);
      });
    }, []);

  const detallesSeleccionados = watch('detalles');

  return (
    <>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-1 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
          <select
            {...register('clienteId')}
            type="text"
            name="clienteId"
            id="clienteId"
          >
            <option value="">Seleccionar cliente</option>
            {clientes.map((cliente, index) => {
              return <option key={'option-cliente-'+index} value={cliente.id}>{cliente.nombre}</option>;
            })}
          </select>
          </div>
        </div>
        <AddTickets setValue={setValue} addDetalle={detallesSeleccionados} />
        {errors?.detalles?.message && <p className="text-red-500">{errors.detalles.message}</p>}

        {errors.detalles?.length > 0 && errors?.detalles?.map((error, index) => (
          <div key={index} className="text-red-500">
            {error?.cantidad?.message && <p>Cantidad: {error.cantidad.message}</p>}
            {error?.servicioId?.message && <p>Servicio: {error.servicioId.message}</p>}
            {error?.articuloId?.message && <p>Artículo: {error.articuloId.message}</p>}
          </div>
        ))}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
};
