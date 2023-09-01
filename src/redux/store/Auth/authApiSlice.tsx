import { authApi } from '@/api/authApi';
import {
    ChangePasswordRequestType,
    LoginResponseType,
    PasswordRecoveryRequestType,
    SignUpRequestType
} from '@/api/types';

export const authApiSlice = authApi.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<LoginResponseType, { login: string; password: string }>({
            query: data => ({
                url: `/auth/login`,
                method: 'POST',
                body: data
            })
        }),
        refreshToken: builder.query<LoginResponseType, void>({
            query: () => ({
                url: '/auth/refresh-token'
            })
        }),
        signUp: builder.mutation<void, SignUpRequestType>({
            query: data => {
                return {
                    method: 'POST',
                    url: '/auth/registration',
                    body: {
                        login: data.userName,
                        password: data.password,
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
    useLazyRefreshTokenQuery
} = authApiSlice;
