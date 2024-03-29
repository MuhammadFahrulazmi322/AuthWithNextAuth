import { query } from "firebase/firestore";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const {push, query} = useRouter();

    //this is for callback url 
    const callbackUrl:any = query.callbackUrl || '/';
    const handleSubmit = async (event:any) =>{

        event.preventDefault();
        setIsLoading(true);
        setError("");
        
        try {
            const res = await signIn("credentials",{
                redirect: false,
                email: event.target.email.value,
                password: event.target.password.value,
                callbackUrl
            })

            if(!res?.error){
                setIsLoading(false);
                push(callbackUrl);
            }
            else{
                setIsLoading(false);
                setError("Email or Password is Incorect");
            }
        } catch (error : any) {
            setIsLoading(false);
            setError("Email or Password is Incorect");
        }

        
    }
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div>
        <h1 className="text-2xl font-bold text-center">Login</h1>
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
        >{isLoading ? "Loading..." : "Login"}</button>
        </form>
        <button className="text-center "
        onClick={()=>{signIn("google",{
            callbackUrl,
            redirect:false
        })}}
        >Sign With Google</button>
        </div>
        <p className="text-center mt-4">
          Dont have an account? <Link href="/auth/register" className="text-blue-500">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginView;
