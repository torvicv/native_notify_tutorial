'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AddTickets from "../components/addTickets";

export default function Create() {

  const [cliente, setCliente] = useState(null);
  const [detalles, setDetalles] = useState([]);
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
        bono_uso: z.array(
          z.object({ 
            bonoId: z.string()
            .transform((val) => (val === "" ? null : Number(val))),
          })
        )
      })
    ).min(0).optional(),
    bonos_uso: z.array(
      z.array(
        z.object({ 
          bonoId: z.string()
          .transform((val) => (val === ""? null : Number(val))),
          cantidad: z.coerce.number().min(1),
          articuloId: z.coerce.number(),
          detalle_id: z.string()
        .transform((val) => (val === ""? null : Number(val))),
        })
      )
    ).min(0).optional(),
  });

  const {watch, setValue, register, handleSubmit, formState: { errors }} = useForm({
    resolver: zodResolver(resolver),
    defaultValues: {
      nombre: '',
      detalles: [],
      bonos_uso: [],
    },
  });

  useEffect(() => {
    console.log(errors);

  }, [errors]);
    

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

  const getCliente = async (id) => {
    const res = await fetch('/api/admin/clientes/' + id);
    console.log(res);
    
    if (!res.ok) {
      throw new Error('Error fetching artículos');
    }
    const response = await res.json();
    console.log(response);
    
    setDetalles(response?.tickets.flatMap((t) => t.detalles));
    console.log(detalles);
    
  };

  useEffect(() => {
    console.log(detalles);
    
  }, [detalles]);

  const detallesSeleccionados = watch('detalles');

  const getCantidadRestante = (cantidad, uso, esArticulo, id) =>  {
    let sum = 0;
    if (uso?.detalles?.length > 0) {
      sum = uso.detalles
      .filter((d) => {
        if (esArticulo) {
          return d.articuloId == id;
        } else {
          return d.servicioId == id;
        }
      })
      .reduce((sum, v) => {
        return sum + v.cantidad;
      }, 0);
    }
    return cantidad - sum;
  }

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
            onChange={(e) => getCliente(e.target.value)}
          >
            <option value="">Seleccionar cliente</option>
            {clientes.map((cliente, index) => {
              return <option key={'option-cliente-'+index} value={cliente.id}>{cliente.nombre}</option>;
            })}
          </select>
          </div>
        </div>
        <div>
          {detalles?.map((d, index) => {
            return (
              <div key={index}>
                <div>
                  {d.uso.bono.nombre}
                </div>
                {d.uso.bono.detalles.map((detalles, ind) => {
                  if (detalles.articuloId) {
                    return <div key={`${index}-${ind}`} className="flex items-center">
                      <div>
                        {detalles.articulo.nombre}
                      </div>
                      <div>
                        Te quedan: {getCantidadRestante(detalles.cantidad, d.uso, true, detalles.articuloId)}
                      </div>
                      <div>
                        <input type="number" name="cantidad" id="cantidad"
                        defaultValue={0}
                          {...register(`bonos_uso.${index}.${ind}.cantidad`)} />
                      </div>
                      <input type="hidden" {...register(`bonos_uso.${index}.${ind}.articuloId`)} value={detalles.articuloId} />
                      <input type="hidden" {...register(`bonos_uso.${index}.${ind}.bonoId`)} value={detalles.bonoId} />
                      <input type="hidden" {...register(`bonos_uso.${index}.${ind}.detalle_id`)} value={d.id} />
                    </div>
                  } else if (detalles.servicioId) {
                    return <div key={`${index}-${ind}`} className="flex items-center">
                      <div>
                        {detalles.servicio.nombre}
                      </div>
                      <div>
                        Te quedan: {getCantidadRestante(detalles.cantidad, d.uso, false, detalles.servicioId)}
                      </div>
                    </div>
                  }
                })}
              </div>
            )
          })}
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
