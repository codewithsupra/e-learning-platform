
/* eslint-disable @typescript-eslint/no-explicit-any */


import {createContext} from "react";
import type { UserType } from "@/app/provider";

export type UserDetailContextType = {
    userDetail:UserType | null;
    setUserDetail:React.Dispatch<React.SetStateAction<UserType | null>>;
}
export const UserDetailContext = createContext<UserDetailContextType>({
    userDetail:null,
    setUserDetail:()=>{}
})