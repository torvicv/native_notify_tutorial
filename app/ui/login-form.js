'use client'
 
import { login } from '@/app/actions/auth';
import { useActionState, useState } from 'react';
import { useRouter } from 'next/navigation';
 
export default function SignupForm({state, user}) {
   
    const [actionForm, setActionForm] = useState({
        email: user?.email ?? 'victor4@gmail.com',
        password: user?.password ?? 'password4#',
    });

    const handleChange = (e) => {
        setActionForm({...actionForm, [e.target.name]: e.target.value });
    }

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(actionForm),
        });

        if (!response.ok) {
            throw new Error('Server error');
        } else {
            console.log('redirecting to');
            router.push('/dashboard');
        }
    }
 
  return (
    <div className='min-h-screen w-full h-full flex justify-center items-center'>
        <div  className='shadow-[0_0_6px_rgba(0,0,0,0.25)] p-6 rounded-lg'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input value={actionForm.email} onChange={handleChange} className='border-b' id="email" name="email" placeholder="Email" />
                        {/*state?.errors?.email && <p className='text-red-600 text-xs'>{/*state.errors.email}</p>*/}
                    </div>
                
                    <div>
                        <label htmlFor="password">Password</label>
                        <input className='border-b' onChange={handleChange} value={actionForm.password} id="password" name="password" type="password" placeholder='Password' />
                        {/*state?.errors?.password && (
                            <div>
                            <p className='text-red-600 text-xs'>Password must:</p>
                            <ul>
                                {state.errors.password.map((error) => (
                                <li className='text-red-600 text-xs' key={error}>- {error}</li>
                                ))}
                            </ul>
                            </div>
                        )*/}
                    </div>
                </div>
                <button type="submit" className='bg-blue-600 py-2 px-3 rounded-lg text-white mt-3'>
                    Log in
                </button>
            </form>
        </div>
    </div>
  )
}