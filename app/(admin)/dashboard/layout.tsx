import React from 'react';
import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import {createServerClient} from "@supabase/ssr";
import DashboardNavbar from "@/app/(admin)/components/dashboardNavbar/DashboardNavbar";


async function DashboardLayout({children}: { children: React.ReactNode }) {
    const cookieStore = cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
            },
        }
    );
    const {data: userSession} = await supabase.auth.getSession()
    if (userSession.session?.user.user_metadata.role !== "admin") {
        return redirect("/");
    }
    return (
        <html lang="en">
        <body>
        <main className="background-light850_dark100 relative">
            <DashboardNavbar/>
                {/*<Sidebar/>*/}
                <section className="flex min-h-screen flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
                    <div className="mx-auto w-full ">{children}</div>
                    {/*<Toaster/>*/}
                </section>
        </main>
        </body>
        </html>
    );
}

export default DashboardLayout;