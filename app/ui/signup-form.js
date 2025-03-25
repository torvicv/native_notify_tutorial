'use client'
 
import { signup } from '@/app/actions/auth';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
 
export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)

  if (state && state.status == 201) {
    const router = useRouter();
    console.log('redirecting to');
    
    router.push('/dashboard');
  }  
 
  return (
    <div className='min-h-screen w-full h-full flex justify-center items-center'>
        <div  className='shadow-[0_0_6px_rgba(0,0,0,0.25)] p-6 rounded-lg'>
            <form action={action}>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input className='border-b' id="name" name="name" placeholder="Name" />
                        {state?.errors?.name && <p className='text-red-600 text-xs'>{state.errors.name}</p>}
                    </div>
                
                    <div>
                        <label htmlFor="email">Email</label>
                        <input className='border-b' id="email" name="email" placeholder="Email" />
                        {state?.errors?.email && <p className='text-red-600 text-xs'>{state.errors.email}</p>}
                    </div>
                
                    <div>
                        <label htmlFor="password">Password</label>
                        <input className='border-b' id="password" name="password" type="password" placeholder='Password' />
                        {state?.errors?.password && (
                            <div>
                            <p className='text-red-600 text-xs'>Password must:</p>
                            <ul>
                                {state.errors.password.map((error) => (
                                <li className='text-red-600 text-xs' key={error}>- {error}</li>
                                ))}
                            </ul>
                            </div>
                        )}
                    </div>
                </div>
                <button disabled={pending} type="submit" className='bg-blue-600 py-2 px-3 rounded-lg text-white mt-3'>
                    Sign Up
                </button>
            </form>
        </div>
    </div>
  )
}