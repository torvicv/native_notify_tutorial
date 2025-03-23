'use client';

import { useEffect, useState } from "react";
import { Select } from "@radix-ui/themes";
import { z } from "zod";
import { Form, useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

export default function GetUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const schema = z.object({
    user_id: z.coerce.number(),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      user_id: 1,
    },
    resetOptions: true,
  });

  const onSubmit = async (data) => {
    console.log("Submitting form:", data);
  }

  async function fetchUsers() {
    try {
      const response = await fetch("/api/user");
      console.log(response);
      
      const data = await response.json();
      setUsers(data);
      console.log(data);
      
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchUsers();
    console.log(users);
}, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)} control={form.control}>
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <Controller
  name="user_id"
  control={form.control}
  render={({ field }) => (
    <Select.Root value={field.value} onValueChange={field.onChange}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          {users.length > 0 &&
            users.map((user) => (
              <Select.Item key={user.id} value={user.id.toString()}>
                {user.username}
              </Select.Item>
            ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )}
/>
{/* Mostrar error si existe */}
{form.formState.errors.user_id && (
                <p className="text-red-500">
                  {form.formState.errors.user_id.message}
                </p>
              )}
    <button type="submit">Submit</button>
    </div>
    </Form>
  );
}