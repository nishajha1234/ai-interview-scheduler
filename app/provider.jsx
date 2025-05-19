"use client"
import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/Services/supabaseClient';
import React, { useContext, useEffect, useState } from 'react';

function Provider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        let { data: Users, error } = await supabase
          .from('Users')
          .select('*')
          .eq('email', user.email);

        if (Users?.length === 0) {
          const { data, error } = await supabase.from('Users').insert([
            {
              name: user?.user_metadata?.name,
              email: user?.email,
              picture: user?.user_metadata?.picture,
            },
          ]);
          setUser(data[0]);
        } else {
          setUser(Users[0]);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    checkUser();
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
  return context;
};
