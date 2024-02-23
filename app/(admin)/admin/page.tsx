'use client'
import React, {useEffect} from 'react';
import Image from "next/image";
import {createSupabaseBrowserClient} from "@/lib/supabase/BrowserClient";
import {usePathname} from 'next/navigation'
import {useRouter} from 'next/navigation'
import {User} from "@supabase/supabase-js";

function Page() {
    const [session, setSession] = React.useState<User>()
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const supabase = createSupabaseBrowserClient()
    const router = useRouter()
    const pathname = usePathname()
    const LoginWithGoogleHandler = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: location.origin + "/auth/callback?next=" + pathname
            }
        })
        router.refresh()
    }
    const LoginWithEmailHandler = async () => {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
           if (error) {
                alert(error.message)
            }
        if (data) {
            console.log(data)
        }
    }

    const readSession = async () => {
        const {data, error} = await supabase.auth.getSession()
        if (data) {
            // @ts-ignore
            setSession(data.session?.user)
            if (data.session) {
                router.push('/')
            }
        }
    }

    useEffect(() => {
            readSession()
        },
        [])
    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                <div className="md:w-1/2 px-8 md:px-16">
                    <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
                    <p className="text-xs mt-4 text-[#002D74]">If you are already a member, easily log in</p>

                    <form onSubmit={LoginWithEmailHandler} className="flex flex-col gap-4">
                        <input className="p-2 mt-8 rounded-xl border" type="email" name="email"
                               placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <div className="relative">
                            <input className="p-2 rounded-xl border w-full" type="password" name="password"
                                   placeholder="Password" value={password}
                                   onChange={(e) => setPassword(e.target.value)}>
                            </input>
                        </div>
                        <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Login
                        </button>
                    </form>

                    <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                        <hr className="border-gray-400"></hr>
                        <p className="text-center text-sm">OR</p>
                        <hr className="border-gray-400"></hr>
                    </div>

                    <button onClick={LoginWithGoogleHandler}
                            className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
                        <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
                            <path fill="#FFC107"
                                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                            <path fill="#FF3D00"
                                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                            <path fill="#4CAF50"
                                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                            <path fill="#1976D2"
                                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                        </svg>
                        Login with Google
                    </button>

                    <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
                        <a href="#">Forgot your password?</a>
                    </div>

                    <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                        <p>Don't have an account?</p>
                        <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Register
                        </button>
                    </div>
                </div>
                <div className="md:block hidden w-1/2">
                    <Image alt='img' width={400} height={400} className="rounded-2xl"
                           src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"/>
                </div>
            </div>
        </section>
    );
}

export default Page;