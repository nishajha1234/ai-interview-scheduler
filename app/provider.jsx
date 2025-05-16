"use client"
import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/Services/supabaseClient';
import React, { useContext, useEffect, useState } from 'react';

function Provider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Check if user exists in the database
        let { data: Users, error } = await supabase
          .from('Users')
          .select('*')
          .eq('email', user.email);

        if (Users?.length === 0) {
          // If the user doesn't exist, create new record
          const { data, error } = await supabase.from('Users').insert([
            {
              name: user?.user_metadata?.name,
              email: user?.email,
              picture: user?.user_metadata?.picture,
            },
          ]);
          setUser(data[0]);
        } else {
          // Set the user from the database
          setUser(Users[0]);
        }
      } else {
        setUser(null); // If no user is logged in, set null
      }
      setLoading(false); // Set loading to false after user data is checked
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
