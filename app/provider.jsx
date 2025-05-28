"use client";
import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/Services/supabaseClient';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function Provider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data } = await supabase.auth.getUser();
        const user = data?.user;

        if (!user) {
          setUser(null);
          setLoading(false);
          return;
        }

        const { data: Users, error } = await supabase
          .from('Users')
          .select('*')
          .eq('email', user.email);

        if (error) throw error;

        if (!Users || Users.length === 0) {
          const { data: insertedUser, error: insertError } = await supabase.from('Users').insert([
            {
              name: user.user_metadata?.name,
              email: user.email,
              picture: user.user_metadata?.picture,
            },
          ]);

          if (insertError) throw insertError;

          setUser(insertedUser[0]);
        } else {
          setUser(Users[0]);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        fetchUser();
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Redirect to /auth if loading finished and user is null
  useEffect(() => {
    if (!loading && user === null) {
      router.push('/auth');
    }
  }, [loading, user, router]);

  // While loading or user exists, just render children (dashboard stays visible)
  return (
    <UserDetailContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error('useUser must be used within a UserDetailContext.Provider');
  }
  return context;
};
