"use client";
import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/Services/supabaseClient';
import React, { useContext, useEffect, useState } from 'react';

function Provider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false); // Avoid double fetch

  const fetchUser = async (sessionUser = null) => {
    setLoading(true);
    try {
      const currentUser = sessionUser ?? (await supabase.auth.getUser()).data?.user;

      if (!currentUser) {
        console.log('No user found yet');
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
      setHasFetched(true);
    }
  };

  useEffect(() => {
    // Restore session and then fetch user once
    const getSessionAndFetch = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        await fetchUser(session.user);
      } else {
        setLoading(false); // No session means not logged in
      }
    };

    getSessionAndFetch();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await fetchUser(session.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setLoading(false);
        }
      }
    );

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
