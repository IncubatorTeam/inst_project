import {getLayout} from "src/components/Layout/BaseLayout/BaseLayout";
import s from "@/pages/signUp/SignUp.module.scss";
import {yupResolver} from "@hookform/resolvers/yup";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {useSignUpMutation} from "api/authApi";
import {signUpSchema} from "src/shared/utils/yupResolvers/yupResolver";
import EmailSentModal from "src/styles/styledComponents/Modal/EmailSentModal";
import {useState} from "react";
import {Card} from "@/shared/ui/card";
import {Typography} from "@/shared/ui/typography";
import {Button} from "@/shared/ui/button";
import {Github} from "../../../public/icon/github-logo";
import {Google} from "../../../public/icon/google-logo";
import {registerSchema} from "@/shared/utils/schemas/register-schema";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {ControlledTextField} from "@/shared/ui/controlled";
import {log} from "next/dist/server/typescript/utils";

// export type SignUpFormData = {
//     userName: string
//     email: string
//     password: string
//     passwordConfirmation: string
// };

export type RegisterFormType = z.infer<typeof registerSchema>
type RegisterFormPropsType = {
    linkPath: string
    onSubmitHandler: (data: RegisterFormType) => void
}

const SignUp = () => {
       const [showForgotModal, setShowForgotModal] = useState(false)
    const [signUp] = useSignUpMutation()
const onSubmitHandler=(data:RegisterFormType)=>console.log(data)
    const {control, handleSubmit} = useForm<RegisterFormType>({resolver: zodResolver(registerSchema)})
    const onSubmit = handleSubmit(data => {
        console.log(data)
        onSubmitHandler(data)
        setShowForgotModal(true)
        signUp(data)
    })
    // const [signUp] = useSignUpMutation()

    // const {register, handleSubmit, formState: {errors}} =
    //     useForm<SignUpFormData>({
    //         resolver: yupResolver(signUpSchema),
    //         defaultValues: {
    //             email:"qweqew@qweqew.com",
    //             password:"qweqew",
    //             passwordConfirmation:"qweqew",
    //             userName:"UserName111"
    //         }})
    //
    // const onSubmit = handleSubmit(data => {
    //     console.log(data)
    //     // signUp(data)
    //     // setShowForgotModal(true)
    // })


    return (
        <div className={s.container}>
            <Card className={s.card}>
                <Typography variant={"large"}>
                    Sign Up
                </Typography>
                <div className={s.iconContainer}>
                    <Button as={'a'} variant={'link'} className={s.link}>
                        <Google width={36} height={36}/>
                    </Button>
                    <Button as={'a'} variant={'link'} className={s.link}>
                        <Github width={36} height={36}/>
                    </Button>

                </div>

                <form onSubmit={onSubmit}>
                    <ControlledTextField control={control} name={'userName'} label={'Username'} className={s.email}/>
                    <ControlledTextField control={control} name={'email'} label={'Email'} className={s.email}/>
                    <ControlledTextField control={control} name={'password'} label={'Password'} className={s.password} type={'password'}
                    />
                    <ControlledTextField control={control} name={'confirmPassword'} label={'Confirm password'} className={s.confirmPassword}
                               type={'password'}
                    />
                    <Button type={'submit'} fullWidth className={s.registerBtn}>
                        Sign Up
                    </Button>
                </form>
                <Typography variant={'body2'} className={s.subtitle}>
                    Do you have an account?
                </Typography>
                <Button as={'a'} variant={'link'} className={s.link} href={'/signIn'}>
                    Sign In
                </Button>
            </Card>
            <EmailSentModal handleClose={() => setShowForgotModal(false)} show={showForgotModal}/>
        </div>

        // <div className={classes.container}>
        //
        //     <div className={classes.signUpForm}>
        //         <h2>
        //             Sign Up
        //         </h2>
        //         <form className={classes.inputForm} onSubmit={onSubmit}>
        //             name
        //             <input {...register("userName")} />
        //             email
        //             <input {...register("email")}/>
        //             password
        //             <input {...register("password")}/>
        //             confirm password
        //             <input {...register("passwordConfirmation")}/>
        //             <button type="submit">
        //                 Sign Up
        //             </button>
        //         </form>
        //         Do you have an account?
        //         <Link href={'/signIn'}>
        //             Sign in
        //         </Link>
        //     </div>
        //
        //     <EmailSentModal handleClose={() => setShowForgotModal(false)} show={showForgotModal}/>
        // </div>
    );
}

SignUp.getLayout = getLayout
export default SignUp;
