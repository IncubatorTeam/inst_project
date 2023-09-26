import { api } from '@/api/api';
import { ChangePasswordRequestType, LoginResponseType, PasswordRecoveryRequestType } from '@/api/types';
import { RegisterFormType } from '@/pages/sign-up';

export const authApiSlice = api.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<LoginResponseType, { login: string; password: string }>({
            query: data => ({
                url: `/auth/login`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Profile']
        }),
        refreshToken: builder.query<LoginResponseType, void>({
            query: () => ({
                url: '/auth/refresh-token'
            })
        }),
        authWithProvider: builder.query<LoginResponseType, { provider: string; token: string }>({
            query: data => ({
                url: '/auth/' + data.provider,
                params: {
                    token: data.token
                }
            })
        }),
        signUp: builder.mutation<void, RegisterFormType>({
            query: data => {
                return {
                    method: 'POST',
                    url: '/auth/registration',
                    body: {
                        login: data.userName,
                        password: data.password.password,
                        email: data.email
                    }
                };
            }
        }),
        signUpConfirmation: builder.mutation<void, { code: string }>({
            query: data => ({
                url: '/auth/registration-confirmation',
                method: 'POST',
                body: data
            })
        }),
        resendEmailConfirmation: builder.mutation<void, { email: string }>({
            query: data => {
                return {
                    method: 'POST',
                    url: '/auth/registration-email-resending',
                    body: {
                        email: data.email
                    }
                };
            }
        }),
        passwordRecovery: builder.mutation<void, PasswordRecoveryRequestType>({
            query: data => ({
                url: '/auth/password-recovery',
                method: 'POST',
                body: data
            })
        }),
        resetPassword: builder.mutation<void, ChangePasswordRequestType>({
            query: data => ({
                url: '/auth/new-password',
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: `/auth/logout`,
                method: 'POST'
            })
        })
    })
});

export const {
    useSignUpMutation,
    useResendEmailConfirmationMutation,
    useRefreshTokenQuery,
    useLoginMutation,
    useSignUpConfirmationMutation,
    useResetPasswordMutation,
    usePasswordRecoveryMutation,
    useLogoutMutation,
    useLazyRefreshTokenQuery,
    useLazyAuthWithProviderQuery
} = authApiSlice;
