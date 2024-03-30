import React from 'react'
import Navbar from '../Navbar'
//using font from next font
import {Roboto} from 'next/font/google'

type AppShellProps = {
    children: React.ReactNode
};

const roboto = Roboto({ subsets: ['latin'], weight: '400' });

const AppShell = (props : AppShellProps) => {
    const {children} = props;
  return (
    <main className={roboto.className}>
        <Navbar/>
        {children}
    </main>
  )
}

export default AppShell;
