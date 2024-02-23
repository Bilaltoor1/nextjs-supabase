/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['qorhrzufwprvqylcrwzt.supabase.co','lh3.googleusercontent.com',"images.unsplash.com"],
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
};

export default nextConfig;
