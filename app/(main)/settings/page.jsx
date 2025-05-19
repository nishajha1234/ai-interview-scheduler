'use client';
import { useUser } from '@/app/provider';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect } from 'react';
import { supabase } from '@/Services/supabaseClient';

export default function UserProfile() {
  const { user, loading, setUser } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem('user');
    router.replace('/auth');
  };

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth');
    }
  }, [user, loading]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6">
          {user?.picture && (
            <Image
              src={user.picture}
              alt="User Avatar"
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          )}
          <div className="text-center mt-4 sm:text-left">
            <h2 className="text-xl font-bold">{user?.name || 'No Name'}</h2>
            <p className="text-gray-500">{user?.email || 'No Email'}</p>
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
