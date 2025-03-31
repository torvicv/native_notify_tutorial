'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Create() {

  const [error, setError] = useState('');
  const resolver = z.object({
    email: z.string().email('No tiene el formato correcto'),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    nombre: z.string().min(2)
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Las contraseñas no coinciden",
        code: "custom",
      });
    }
  });
  const {register, handleSubmit, formState: { errors }} = useForm({
    resolver: zodResolver(resolver),
    defaultValues: {
      password: '',
      confirmPassword: '',
      nombre: '',
      email: '',
    },
  });

  const onSubmit = async (data) => {
    console.log("Formulario enviado:", data);
    // Enviar los datos al backend
    const response = await fetch('/api/admin/clientes', {
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
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register('email')}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {error && <p className="text-xs text-red-600">{error}</p>}
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register('password')}
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {errors.password && <p className="text-red-600">{errors.password.message}</p>}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register('confirmPassword')}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="confirm_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>
          {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}
        </div>
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
