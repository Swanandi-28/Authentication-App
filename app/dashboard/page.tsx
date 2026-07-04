"use client";

import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useState} from "react";
import {jwtDecode} from "jwt-decode";

type JwtPayload = {
    email: string;
    name: string;
};

export default function DashboardPage() {

    const [name, setName] = useState("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token){
            router.push("/login");
        }else{
            try{
            const decoded = jwtDecode<JwtPayload>(token);
            setName(decoded.name);
            } catch {
                localStorage.removeItem("token");
                router.push("/login");
            }
        }
    }, [router]);
return(
    <>
    <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-6 bg-gray-900">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg">Welcome, {name}!</p>
        <button onClick={() => {
        localStorage.removeItem("token");
        router.push("/login");
    }} className="mt-10 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Logout
    </button>
    </div> 
    </>
  )
}
    
