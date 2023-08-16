'use client'
import {useCallback, useState} from "react";
import Modal from "@/app/components/Modal";
import Input from "@/app/components/Input";
import useRegisterModal from "@/app/hooks/Register";
import useLoginModal from "@/app/hooks/Login";
import {signIn} from "next-auth/react";

export default function RegisterModal() {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const useRegister = useRegisterModal()
    const useLogin = useLoginModal()
    
    //on submit function
    const onSubmit = useCallback(async() => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                    username,
                    name
                })
            });
            
            if(!response.ok) {
                throw new Error('Request failed');
            }
            
            setIsLoading(false);
            
            await signIn('credentials', {
                email,
                password,
            });
            
            console.log("Account created");
            
            useRegister.onClose();
            console.log("Account modal closed");
            
        } catch (error) {
            console.log("Account error:");
            console.error(error);
            // Handle the error here, show error message, etc.
        } finally {
            setIsLoading(false);
        }
    }, [useRegister, email, password, username, name]);
    
    //add toggle for register
    const onToggle = useCallback(() => {
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
                placeholder={'Username'}
                type={'text'}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                <span onClick={onToggle} className={'text-sky-500 cursor-pointer hover:underline'}>
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
                onSubmit={onSubmit}
                onClose={useRegister.onClose}
            />
        </div>
    )
}