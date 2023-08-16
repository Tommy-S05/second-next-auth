'use client'
import {useCallback, useState} from "react";
import Modal from "@/app/components/Modal";
import Input from "@/app/components/Input";
import useLoginModal from "@/app/hooks/Login";
import useRegisterModal from "@/app/hooks/Register";
import {signIn} from "next-auth/react";

export default function LoginModal() {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const useLogin = useLoginModal();
    const useRegister = useRegisterModal();
    
    //add toggle for register
    const onTaggle = useCallback(() => {
        if(isLoading) return;
        
        useRegister.onOpen();
        useLogin.onClose();
    }, [isLoading, useRegister, useLogin]);
    
    const onSubmit = useCallback(async() => {
        try {
            setIsLoading(true);
            await signIn('credentials', {
                email,
                password,
            });
            
            useRegister.onClose();
            console.log("Account modal closed");
            
        } catch (error) {
            console.log("Account error:");
            console.error(error);
            // Handle the error here, show error message, etc.
        } finally {
            setIsLoading(false);
        }
    }, [useLogin, email, password]);
    
    //body container
    const bodyContainer = (
        <div className={'flex flex-col gap-4'}>
            <Input
                disabled={isLoading}
                placeholder={'Email'}
                type={'email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                disabled={isLoading}
                placeholder={'Password'}
                type={'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
    )
    
    //footer container
    const footerContainer = (
        <div className={'text-neutral-400 text-center mt-4'}>
            <p>
                Don't have an account?{' '}
                <span onClick={onTaggle} className={'text-sky-500 cursor-pointer hover:underline'}>
                    Sing up
                </span>
            </p>
        </div>
    )
    return (
        <div>
            <Modal
                disabled={isLoading}
                title={'Login to your Account'}
                actionLabel={'Login'}
                body={bodyContainer}
                footer={footerContainer}
                isOpen={useLogin.isOpen}
                onClose={useLogin.onClose}
                onSubmit={onSubmit}
            />
        </div>
    )
}