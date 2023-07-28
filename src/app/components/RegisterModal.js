'use client'
import {useCallback, useState} from "react";
import Modal from "@/app/components/Modal";
import Input from "@/app/components/Input";
import useRegisterModal from "@/app/components/hooks/Register";
import useLoginModal from "@/app/components/hooks/Login";

export default function RegisterModal() {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const useRegister = useRegisterModal()
    const useLogin = useLoginModal()
    
    //add toggle for register
    const onTaggle = useCallback(() => {
        if(isLoading) return;
        
        useRegister.onClose();
        useLogin.onOpen();
    }, [isLoading, useRegister, useLogin]);
    
    //body container
    const bodyContainer = (
        <div className={'flex flex-col gap-4'}>
            <Input
                disabled={isLoading}
                placeholder={'Name'}
                type={'text'}
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
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
                Already have an account?{' '}
                <span onClick={onTaggle} className={'text-sky-500 cursor-pointer hover:underline'}>
                    Sing in
                </span>
            </p>
        </div>
    )
    return (
        <div>
            <Modal
                disabled={isLoading}
                title={'Register an Account'}
                actionLabel={'Register'}
                body={bodyContainer}
                footer={footerContainer}
                isOpen={useRegister.isOpen}
            />
        </div>
    )
}