"use client";

import {useState}from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import {useRouter} from "next/navigation";

export default function LoginPage() {
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");

    const [error,setError]= useState("");
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    const handleLogin = async( e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
        try{
        
        setError("");

        if (!email ||!password) {
            setError("Please fill in all fields");
            return;
        }

        if(password.length < 6) {
            setError ("Password must be at least 6 characters");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        const response = await fetch("/api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({email,password,}),
        })

        const data = await response.json();

        if(!response.ok){
            setError(data.message);
            return;
        }

        localStorage.setItem("token",data.token);
      
        console.log("Login successful:", data);
            setError("");
            setEmail("");
            setPassword("");

        router.push("/dashboard");
        } catch(error){
            console.error(error);
            setError("An error occurred. Please try again later.");
        }
    };
    
    return (
        <>
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl text-center mt-10 text-gray-800 font-bold mb-4">
          Login
        </h1>
        <p className="text-gray-600 text-center mb-6 ">
          Login to continue
      </p>

      <form onSubmit = {handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-black"> Email </label>
          <input type= "email"
                 placeholder="Enter Your Email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full border rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500">
          </input>
        </div>
        <div>
          <label className="block mb-1 font-medium text-black"> Password </label>
          <div className="relative">
            <input type={showPassword ? "text" : "password"}
                   placeholder="Enter Your Password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full border rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500">
            </input>
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>
        
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}

        <button 
                type ="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Login 
        </button>
      </form>

      <p className="text-gray-600 text-center mt-4">
        Don't have an account?{""}
        <Link href="/signup" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
      </div>
      </main>
      </>
    )
}
