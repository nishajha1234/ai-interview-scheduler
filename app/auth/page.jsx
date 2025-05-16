"use client"
import { Button } from '@/components/ui/button'
import { supabase } from '@/Services/supabaseClient'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Login() {

      const router = useRouter();
      

 useEffect(() => {
  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      router.push('/dashboard'); // Go to dashboard if already logged in
    } else {
      setChecked(true); // Let the login screen render
    }
  };
  checkUser();
}, []);

const [checked, setChecked] = useState(false);

// Prevent rendering until user check is done
if (!checked) return null;


  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: isLocalhost
        ? 'http://localhost:3000/dashboard'
        : 'https://ai-interview-scheduler-nisha.vercel.app/dashboard',
      },
    });

    if (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <div className='flex flex-col items-center border rounded-2xl p-8'>
            <Image src={'/logo.png'} alt='logo' width={400} height={100} className='w-[180px]'/>
            <div className='flex items-center flex-col gap-4'>
                <Image src={'/login.jpg'} alt='login' width={600} height={400} className='w-[400px] h-[250px] rounded-2xl'/>
                <h2 className='text-2xl font-bold text-center mt-5'>Welcome to AiCruiter</h2>
                <p className='text-gray-500 text-center'>Sign In With Google Authentication</p>
                <Button className='mt-7 w-full cursor-pointer'
                onClick={signInWithGoogle}
                >Login with Google</Button>
            </div>
        </div>
    </div>
  )
}

export default Login