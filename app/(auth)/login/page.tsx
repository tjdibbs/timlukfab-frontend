import Login from '@/components/auth/login';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account',
};

export default async function Page() {
  return <Login />;
}
