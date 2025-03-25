import { SignupFormSchema } from '@/app/lib/definitions';
import { createSession, deleteSession } from '@/app/lib/session';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

export async function signup(state, formData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    })
   
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }
   
    // Call the provider or db to create a user...
    // 2. Prepare data for insertion into database
  const { name, email, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it
 
  const data = { name, email, password };
  // 3. Insert the user into the database or call an Library API
  const response = await fetch('/api/user', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  const json = await response.json();
  const { message, status, user } = json;

 
  if (status != 200) {
    return {
      message: 'An error occurred while creating your account.',
    }
  }
  console.log(user);
  
  // 4. Create user session
  await createSession(user.id)
  // 5. Redirect user
  console.log('2');
  
  return new NextResponse(
    JSON.stringify({ success: true, user, message: 'User created successfully' }),
    { status: 201 }
  );
}

export async function logout() {
  deleteSession()
  redirect('/login')
}
