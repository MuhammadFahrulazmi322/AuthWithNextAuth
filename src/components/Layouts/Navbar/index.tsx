import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image';
import React from 'react'

function Navbar() {
  const {data} : any = useSession();
  console.log(data);
  return (
    <div className='flex flex-row bg-black text-white w-full justify-between px-8 h-10 items-center py-6'>
        <h1>Navbar</h1>
        <div className='flex flex-row items-center gap-4'>
        {data && (
          <h2>Welcome, {data.user.fullname}</h2>
        )}
        {data && data.user.image && (
          <Image width={32} height={32} src={data.user.image} alt={data.user.fullname} className='rounded-full' />
        )}
        {data ? (
          <button className='bg-white text-black p-2 rounded-md'
          onClick={() => signOut()}
          >Sign Out</button>
        ) :
        <button className='bg-white text-black p-2 rounded-md'
        onClick={() => signIn()}
        >Sign In</button>
        }
        </div>
    </div>
  )
}

export default Navbar