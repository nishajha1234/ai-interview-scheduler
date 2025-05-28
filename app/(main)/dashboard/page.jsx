"use client"
import React, { useEffect } from 'react'
import CreateOptions from './_components/CreateOptions'
import LatestInterviewsList from './_components/LatestInterviewsList'
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/provider';

function Dashboard() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth');
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;
  return (
    <div>
      <h2 className='my-3 font-bold text-2xl'>Dashboard</h2>
      <CreateOptions />
      <LatestInterviewsList />
    </div>
  )
}

export default Dashboard