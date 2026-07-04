"use client";

import {useState}from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import {useRouter} from "next/navigation";

export default function SignupPage() {
    const [name, setName]= useState("");
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const [confirmPassword,setConfirmPassword]= useState("");

    const [error,setError]= useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => { 
      e.preventDefault();
       try{

      setError("");

      if(!name || !email || !password || !confirmPassword){
        setError("Please fill in all fields");
        return;
      }

       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
     }


      if(password.length <6){
        setError("Password must be at least 6 characters");
        return;
      }

      if(password !==confirmPassword){
        setError("Passwords do not match");
        return;
      }

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {  
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to create account.");
        return;
      }

      alert("Account created successfully!");
      router.push("/login");
       }catch(error){
        console.error(error);
        setError("An error occurred. Please try again later.");
       }
    };
  return (
    <>
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-3xl text-center mt-10 text-gray-800 font-bold mb-4">
        Create Account
      </h1>
      <p className="text-gray-600 text-center mb-6 ">
        Sign Up to continue
      </p>

      <form onSubmit = {handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-black"> Name </label>
          <input type="text" 
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"> 
          </input>
        </div>

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
          <label className="block mb-1 font-medium text-black "> Password </label>

          <div className="relative">
          <input 
                 type={showPassword ? "text" : "password"}
                 placeholder="Enter Your Password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full border rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12">   
          </input>
        <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black">
            {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
        </button>
        </div>
      </div>

        <div>
          <label className="block mb-1 font-medium text-black "> Confirm Password </label>
          <div className="relative">
          <input type= {showConfirmPassword ? "text" : "password"}
                 placeholder="Confirm Your Password"
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
                 className="w-full border rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500">
          </input>
          <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black">
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
                  Create Account
        </button>
      </form>

      <p className="text-gray-600 text-center mt-4">
        Already have an account?{""}
        <Link href="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>

    </div>
    </main>
    </>
  );
}