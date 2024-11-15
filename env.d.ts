declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    API_BASE_URL: string;
    NEXT_PUBLIC_API_BASE_URL: string;
    NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY: string;
    NEXT_PUBLIC_PAYSTACK_SECRET_KEY: string;
  }
}
