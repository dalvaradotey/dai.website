/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    USER_PASSWORD: process.env.USER_PASSWORD,
    CRYPTO_ALGORITHM: process.env.CRYPTO_ALGORITHM,
    CRYPTO_ENCRYPTION_KEY: process.CRYPTO_ENCRYPTION_KEY,
  }
}

module.exports = nextConfig
