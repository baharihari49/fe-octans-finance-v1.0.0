/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'], // Domain untuk gambar
    },
    assetPrefix: process.env.NEXT_PUBLIC_API_URL_INTERNAL, // Prefix untuk file statis
    basePath: '', // Jika menggunakan subpath, tambahkan path di sini
    trailingSlash: true, // Menambahkan trailing slash untuk URL
    reactStrictMode: true, // Opsional, untuk debugging
};

export default nextConfig;
