import React from 'react';
async function AdminLoginLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">

        <body>
        <main className="background-light850_dark100 relative">
            <div className="flex">
                <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-10 max-md:pb-14 sm:px-14">
                    <div className="mx-auto w-full ">{children}</div>
                </section>
            </div>
        </main>
        </body>
        </html>
    );
}

export default AdminLoginLayout;