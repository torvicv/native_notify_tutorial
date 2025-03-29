'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Create() {

  const [error, setError] = useState('');
  const resolver = z.object({
    nombre: z.string().min(2)
  });
  const {register, handleSubmit, formState: { errors }} = useForm({
    resolver: zodResolver(resolver),
    defaultValues: {
      nombre: '',
    },
  });

  const onSubmit = async (data) => {
    console.log("Formulario enviado:", data);
    // Enviar los datos al backend
    const response = await fetch('/api/admin/articulos', {
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

  return (
    <>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-1 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register('nombre')}
              type="text"
              name="nombre"
              id="nombre"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="nombre"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name
            </label>
            {error && <p className="text-xs text-red-600">{error}</p>}
            {errors.nombre && <p className="text-red-600">{errors.nombre.message}</p>}
          </div>
        </div>
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
