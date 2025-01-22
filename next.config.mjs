/** @type {import('next').NextConfig} */

const nextConfig = {
    async headers() {
        return [
            {
              source: '/api/socket',
              headers: [
                { key: 'Cache-Control', value: 'no-cache' },
                { key: 'Access-Control-Allow-Origin', value: '*' },
              ],
            },
        ];
    },
}

export default nextConfig;
