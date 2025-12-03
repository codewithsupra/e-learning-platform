
/* eslint-disable @typescript-eslint/no-explicit-any */


import {createContext} from "react";
export const UserDetailContext = createContext<any>({
    userDetail:undefined,
    setUserDetail:()=>{}
})