"use client";
import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/Services/supabaseClient';
import React, { useContext, useEffect, useState } from 'react';

function Provider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async (sessionUser = null) => {
    setLoading(true);
    try {
      const currentUser = sessionUser ?? (await supabase.auth.getUser()).data?.user;

      if (!currentUser) {
        console.log('User not ready yet');
        setUser(null);
        return;
      }

      const { data: Users, error } = await supabase
        .from('Users')
        .select('*')
        .eq('email', currentUser.email);

      if (error) throw error;

      if (!Users || Users.length === 0) {
        const { data: insertedUser, error: insertError } = await supabase.from('Users').insert([
          {
            name: currentUser.user_metadata?.name,
            email: currentUser.email,
            picture: currentUser.user_metadata?.picture,
          },
        ]).select();

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

  useEffect(() => {
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        fetchUser(session?.user); // Use user directly from session
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe?.();
    };
  }, []);

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
