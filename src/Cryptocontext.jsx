import React, { createContext, useContext, useEffect, useState } from "react";

const Crypto=createContext();

const CryptoContexts=({children})=>{
    const [curr,setCurr]=useState("INR");
    const [sym,setSym]=useState("₹");

    useEffect(()=>{
        if(curr==="INR") setSym("₹");
        else if(curr==="USD") setSym("$");
    },[curr]);
    return (
        <Crypto.Provider value={{curr,sym,setCurr}}>
        {children}
        </Crypto.Provider>);
};
export default CryptoContexts;

export const Cryptostate=()=>{
    return useContext(Crypto);
}