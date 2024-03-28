import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const RegisterView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const {push} = useRouter();
    const handleSubmit = async (event:any) =>{

        event.preventDefault();
        setIsLoading(true);
        setError("");
        const data = {
            email: event.target.email.value,
            fullname: event.target.fullname.value,
            password: event.target.password.value
        }
        const result = await fetch("/api/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if(result.status === 200){
            event.target.reset();
            setIsLoading(false);
            push("/auth/login");
        }
        else{
            setIsLoading(false);
            setError(result.status === 400 ? "Email already exists" : "");
        }
    }
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div>
        <h1 className="text-2xl font-bold text-center">Register</h1>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>} 
        <div className="flex flex-col border-2 border-gray-300 py-6 px-2 w-96 gap-4 mt-4 shadow-xl">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 py-2">
            <label htmlFor="email"
            className="font-bold"
            >Email</label>
            <input 
            id="email"
            name="email"
            type="email" 
            placeholder="Email"
            className="border-2 border-gray-400 px-2 py-2"
            />
          </div>
          <div className="flex flex-col gap-2 py-2">
            <label 
            htmlFor="Fullname"
            className="font-bold"
            >Fullname</label>
            <input 
            id="fullname"
            name="fullname"
            type="fullname" 
            placeholder="Fullname"
            className="border-2 border-gray-400 px-2 py-2"
             />
          </div>
          <div className="flex flex-col gap-2 py-2">
            <label 
            htmlFor="password"
            className="font-bold"
            >Password</label>
            <input 
            id="password"
            name="password"
            type="password" 
            placeholder="Password"
            className="border-2 border-gray-400 px-2 py-2"
             />
          </div>
        <button
        className="bg-black text-white w-full py-2 mt-4"
        >{isLoading ? "Loading..." : "Register"}</button>
        </form>
        </div>
        <p className="text-center mt-4">
          Already have an account? <Link href="/auth/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterView;
