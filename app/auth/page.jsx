"use client";
import { Button } from '@/components/ui/button';
import { supabase } from '@/Services/supabaseClient';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Login() {
  const router = useRouter();
  const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push('/dashboard');
      } else {
        setChecked(true);
      }
    };
    checkUser();
  }, []);

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
  };

  return (<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4"> <div className="w-full max-w-md sm:max-w-lg bg-white border rounded-2xl p-6 sm:p-8 shadow-md"> <div className="flex justify-center mb-6"> <Image
    src="/logo.png"
    alt="logo"
    width={400}
    height={100}
    className="w-[160px] sm:w-[180px] h-auto"
  /> </div> <div className="flex flex-col items-center gap-4"> <Image
    src="/login.jpg"
    alt="login"
    width={600}
    height={400}
    className="w-full h-auto max-h-[250px] object-cover rounded-2xl"
  /> <h2 className="text-2xl font-bold text-center mt-5">Welcome to AiCruiter</h2> <p className="text-gray-500 text-center">Sign in with Google Authentication</p> <Button
    className="mt-6 w-full cursor-pointer"
    onClick={signInWithGoogle}
  >
        Login with Google </Button> </div> </div> </div>
  );
}

export default Login;
