"use client";

import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
    const [email, setEmail] = useState("admin@example.com");
    const [password, setPassword] = useState("password");
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleChange = (e) => {
        setActionForm({...actionForm, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await signIn("credentials", {
            redirect: false, // ✅ Para manejar la redirección manualmente
            email,
            password,
        });

        if (result?.error) {
            console.log(result.error);
        } else {
            router.push("/dashboard"); // ✅ Redirige manualmente si es exitoso
        }
    };
 
  return (
    <div className='min-h-screen w-full h-full flex justify-center items-center'>
        <div  className='shadow-[0_0_6px_rgba(0,0,0,0.25)] p-6 rounded-lg'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input value={email} onChange={handleChange} className='border-b' id="email" name="email" placeholder="Email" />
                        {/*state?.errors?.email && <p className='text-red-600 text-xs'>{/*state.errors.email}</p>*/}
                    </div>
                
                    <div>
                        <label htmlFor="password">Password</label>
                        <input className='border-b' onChange={handleChange} value={password} id="password" name="password" type="password" placeholder='Password' />
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
                <button onClick={() => signOut()}>Logout</button>
            </form>
        </div>
    </div>
  )
}