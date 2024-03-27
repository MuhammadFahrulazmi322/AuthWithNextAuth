import { useSession } from 'next-auth/react';
import React from 'react'

function Dashboard() {
  const {data} : any = useSession();

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome, {data?.user?.fullname}</h2>
    </div>
  )
}

export default Dashboard