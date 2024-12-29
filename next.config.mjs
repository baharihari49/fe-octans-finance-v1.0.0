/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'], // Domain untuk gambar
    },
    assetPrefix: 'https://uat-v1.octansidn.com', // Prefix untuk file statis
    basePath: '', // Jika menggunakan subpath, tambahkan path di sini
    trailingSlash: true, // Menambahkan trailing slash untuk URL
    reactStrictMode: true, // Opsional, untuk debugging
};

export default nextConfig;
