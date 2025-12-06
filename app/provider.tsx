"use client"
import React, { use, useEffect } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useState } from 'react';
import { UserDetailContext } from '@/context/UserDetailContext';
import Header from './_components/Header';

function Provider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
   const { user } = useUser();
  const[userDetail,setUserDetail]=useState();
  
 
//create new user in our database if not exists
  const CreateNewUser = async () => {
    console.log("Provider User:", user);
    const res = await axios.post('/api/user', {});
    console.log("User API Response:", res.data);
    //we have to set the userDetail context here
    setUserDetail(res.data.user);
  };

  useEffect(() => {
    if(!user?.id) return;
    if(userDetail) return;
    async function func(){
      await CreateNewUser();
    } //userDetail already set
    if(user.id) func();

  }, [user?.id]);

  return (
    <NextThemesProvider {...props}>
      <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
        <div className='flex flex-col items-center'>
        <Header />
        </div>
      {children}
      </UserDetailContext.Provider>
    </NextThemesProvider>
  )
    
}

export default Provider;
