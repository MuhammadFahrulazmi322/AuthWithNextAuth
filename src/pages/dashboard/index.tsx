import { useSession } from 'next-auth/react';
import React from 'react'

function Dashboard() {
  const {data} : any = useSession();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1>Dashboard</h1>
      <h2>Welcome, {data?.user?.fullname}</h2>
    </div>
  )
}

export default Dashboard