'use client';
import { useUser } from '@/app/provider';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect } from 'react';
import { supabase } from '@/Services/supabaseClient';

export default function UserProfile() {
  const { user, loading, setUser } = useUser();
  const router = useRouter();

  // Handle sign-out logic
  const handleSignOut = async () => {
    // Clear Supabase session
    await supabase.auth.signOut();
    setUser(null); // Clear user context
    localStorage.removeItem('user');
    router.replace('/auth'); // Redirect to auth page
  };

  // Redirect to /auth if user is not logged in
useEffect(() => {
  if (!loading && !user) {
    router.replace('/auth');
  }
}, [user, loading]);

if (loading) {
  return <div>Loading...</div>; // Don't render anything until loading is false
}

if (!user) {
  return null; // Prevents any flashing of content
}

  return (
    <div className="h-[60vh] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-[90%] max-w-sm ">
        <div className='flex flex-2 gap-5'>
        {user?.picture && (
          <div className="flex justify-center mb-4">
            <Image
              src={user.picture}
              alt="User Avatar"
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          </div>
        )}
        <div className='flex flex-col pt-3'>
        <h2 className="text-xl font-bold">{user?.name || 'No Name'}</h2>
        <p className="text-gray-500 mb-6">{user?.email || 'No Email'}</p>
        </div>
</div>
        <button
          onClick={handleSignOut}
          className="w-full bg-white border hover:bg-gray-100 text-black font-medium py-2 px-4 rounded-lg shadow-sm cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
