import { z } from 'zod';
import { api } from '../api';
import { LoginFormSchema, RegisterFormSchema } from '@/lib/schemas';
import { ApiResponse, RegisterResponse, User } from '@/lib/types';

type ZodRegisterForm = z.infer<typeof RegisterFormSchema>;
type LoginForm = z.infer<typeof LoginFormSchema>;
type VerifyUserQuery = {
  code: string;
  userId: number;
};

interface RegisterForm extends ZodRegisterForm {
  country: string;
}

const authApi = api.injectEndpoints({
  endpoints: build => ({
    registerUser: build.mutation<RegisterResponse, RegisterForm>({
      query: body => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
    loginUser: build.mutation<RegisterResponse, LoginForm>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    verifyUser: build.mutation({
      query: (body: VerifyUserQuery) => ({
        url: '/auth/verify-user',
        method: 'POST',
        body,
      }),
    }),
    sendVerificationCode: build.mutation({
      query: (userId: number) => ({
        url: `/auth/send-verification-code`,
        method: 'POST',
        body: { userId },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useVerifyUserMutation,
  useSendVerificationCodeMutation,
} = authApi;
