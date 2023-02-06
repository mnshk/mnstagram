import React, { useEffect, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import SplashScreen from '@/components/SplashScreen'
import Footer from '@/components/Footer'
import Loading from '@/components/Loading'

import { validateEmail, validateFullName, validateUsername, validatePassword, validateConfirmationCode } from '@/utils/validation'
import { signup } from '@/services/auth'
import store from '@/store'
import { loggedIn } from '@/store/user'

export default function Page() {
    const [view, setView] = useState<JSX.Element>(<SplashScreen />)

    useEffect(() => {
        setView(<SignupForm setView={setView} />)
    }, [])

    return (
        <>
            <Head>
                <title>Sign up &#x2022; Mnstagram</title>
            </Head>
            {view}
        </>
    )
}

type Form = {
    email: string,
    fullName: string,
    username: string,
    password: string,
    confirmationToken: string,
}

function SignupForm({ setView }: { setView: React.Dispatch<React.SetStateAction<JSX.Element>> }) {

    type Errors = {
        loading: boolean,
        message: string | boolean,
        email: string | boolean,
        fullName: string | boolean,
        username: string | boolean,
        password: string | boolean,
    }

    // Form values
    const formInitial: Form = { email: 'mk6229478@gmail.com', fullName: 'Munish Kumar', username: 'munish', password: '123456', confirmationToken: '' }
    const errorsInitial = { loading: false, message: '', email: '', fullName: '', username: '', password: '' }
    const [form, setForm] = useState<Form>(formInitial);
    const [errors, setErrors] = useState<Errors>(errorsInitial)

    // Handle inputs
    const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value })
    }

    // Handle submit
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        // Validate the form
        setErrors({
            ...errorsInitial,
            email: validateEmail(form.email),
            fullName: validateFullName(form.fullName),
            username: validateUsername(form.username),
            password: validatePassword(form.password),
        })

        if (validateEmail(form.email) || validateFullName(form.fullName) || validateUsername(form.username) || validatePassword(form.password)) {
            return
        }

        // If all good send confirmation code and move to enter code view

        setErrors({ ...errorsInitial, loading: true })

        const res = await signup(form);

        if (res.errors) {
            return setErrors({ ...errorsInitial, ...res.errors, loading: false })
        }
        setView(<ConfirmationCode setView={setView} prevForm={{ ...form, confirmationToken: res.data.token }} />)
    }

    const inputStyle = 'border w-full text-xs py-[10px] px-2 my-[3px] rounded-sm focus:outline-0 focus:border-zinc-400 bg-zinc-50 text-zinc-800 placeholder:text-gray-500 '
    const inputInvalid = 'border-red-600 '
    const errorStyle = 'text-xs text-red-600 px-1 '
    const buttonStyle = 'px-4 w-full rounded-lg py-[6px] text-white text-sm bg-igblue-200 disabled:bg-igblue-100 disabled:bg-igblue-100 '

    return (
        <>
            <div className={`flex flex-col flex-grow w-screen h-full bg-igbg-100 font-inter text-xs antialiased`}>
                <div className="flex flex-col items-center flex-grow pb-20">
                    <div className="flex flex-col items-center w-full my-4 mb-2 bg-white border border-igborder-100" style={{ maxWidth: "350px" }}>

                        <Image className="pt-12" src="/assets/images/mnstagram-text-logo.webp" alt="Instagram Logo" width="201" height="51" />

                        <div className="px-10 pt-5 text-sm text-center text-zinc-400">
                            Sign up to see photos and videos from your friends.
                        </div>

                        <form onSubmit={onSubmit} className="w-full p-10 pt-6 pb-4">
                            <div className="mb-3">

                                <input className={inputStyle + (errors.email ? inputInvalid : '')} onChange={onChange} value={form.email.toLowerCase()} placeholder="Email address" type="email" name="email" required />
                                <div className={errorStyle}>{errors.email}</div>

                                <input className={inputStyle + (errors.fullName ? inputInvalid : '')} onChange={onChange} value={form.fullName} placeholder="Full name" type="text" name="fullName" required />
                                <div className={errorStyle}>{errors.fullName}</div>

                                <input className={inputStyle + (errors.username ? inputInvalid : '')} onChange={onChange} value={form.username.toLowerCase()} placeholder="Username" type="text" name="username" required />
                                <div className={errorStyle}>{errors.username}</div>

                                <input className={inputStyle + (errors.password ? inputInvalid : '')} onChange={onChange} value={form.password} placeholder="Password" type="password" name="password" required />
                                <div className={errorStyle}>{errors.password}</div>
                            </div>

                            <div className="flex flex-col gap-3 text-center text-gray-500" style={{ fontSize: "11px" }}>
                                <div className="text-center">
                                    <span>People who use our service may have uploaded your contact information to Instagram. </span>
                                    <span className="text-igblue-300">Learn more</span>
                                </div>
                                <div className="mb-4 text-center">
                                    <span>By signing up, you agree to our </span>
                                    <span className="text-igblue-200">Terms</span>
                                    <span>, </span>
                                    <span className="text-igblue-200">Privacy Policy</span>
                                    <span> and </span>
                                    <span className="text-igblue-200">Cookies Policy</span>
                                    <span>.</span>
                                </div>
                            </div>
                            <div>
                                <button className={buttonStyle} disabled={(errors.loading || !form.email.length || !form.fullName.length || !form.username.length || (!form.password.length)) ? true : false}>{errors.loading ? <Loading /> : 'Sign up'}</button>
                                <div className="flex justify-center px-1 mt-5 text-xs text-center text-red-600">{errors.message}</div>
                            </div>
                        </form>
                        <div className="my-5"></div>
                    </div>

                    <div className="w-full p-6 text-xs text-center bg-white border border-igborder-100" style={{ maxWidth: "350px" }}>
                        <span>Have an account?</span>
                        <span> </span>
                        <Link href="/account/login/" className="font-bold text-igblue-200">Log in</Link>
                    </div>
                </div>
                <Footer />
            </div >
        </>
    )
}

function ConfirmationCode({ setView, prevForm }: { setView: React.Dispatch<React.SetStateAction<JSX.Element>>, prevForm: Form }) {

    type Form = {
        confirmationCode: string,
    }

    type Errors = {
        loading: boolean,
        message: string | boolean,
        confirmationCode: string | boolean
    }

    // Form values
    const formInitial = { confirmationCode: '' }
    const errorsInitial = { loading: false, message: '', confirmationCode: '' }
    const [form, setForm] = useState<Form>(formInitial);
    const [errors, setErrors] = useState<Errors>(errorsInitial)

    // Handle inputs
    const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value })
    }

    // Handle submit
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        // Validate the form
        setErrors({
            ...errorsInitial,
            confirmationCode: validateConfirmationCode(form.confirmationCode),
        })

        if (!form.confirmationCode || validateConfirmationCode(form.confirmationCode)) {
            return
        }

        // If form is valid and ready to be submitted
        setErrors((prev) => ({ ...prev, loading: true }))

        const res = await signup({ ...prevForm, confirmationCode: form.confirmationCode })

        if (res.errors) {
            return setErrors((prev) => ({ ...prev, ...res.errors, loading: false }))
        }
        store.dispatch(loggedIn(res.data))
    }

    const inputStyle = 'border w-full text-xs py-[10px] px-2 my-[3px] rounded-sm focus:outline-0 focus:border-zinc-400 bg-zinc-50 text-zinc-800 placeholder:text-gray-500 '
    const inputInvalid = 'border-red-600 '
    const errorStyle = 'text-xs text-red-600 px-1 '
    const buttonStyle = 'px-4 w-full rounded-lg py-[6px] text-white text-sm bg-igblue-200 disabled:bg-igblue-100 disabled:bg-igblue-100 '

    return (
        <>
            <div className={`flex flex-col flex-grow w-screen h-full bg-igbg-100 font-inter text-xs antialiased`}>
                <div className="flex flex-col items-center flex-grow pb-20">
                    <div className="flex flex-col items-center w-full my-4 mb-2 bg-white border border-igborder-100" style={{ maxWidth: "350px" }}>

                        <Image className="pt-12" src="/assets/images/emailSent.webp" alt="Instagram Logo" width="98" height="67" />

                        <div className="px-10 pt-5 mb-4 text-sm font-semibold text-center">
                            Enter confirmation code
                        </div>

                        <div className="px-10 text-center">
                            {/* Enter the confirmation code that we sent to {prevForm.email}.&nbsp; */}
                            Enter the confirmation code that we sent to your email address.&nbsp;
                            {/* <span className='font-semibold text-igblue-200'>Resend code.</span> */}
                        </div>

                        <form onSubmit={onSubmit} className="w-full p-10 pt-6 pb-4">
                            <div className="mb-3">

                                <input className={inputStyle + (errors.confirmationCode ? inputInvalid : '')} onChange={onChange} value={form.confirmationCode} placeholder="Confirmation code" type="number
                                " name="confirmationCode" required />
                                <div className={errorStyle}>{errors.confirmationCode}</div>

                            </div>

                            <div className='flex flex-col items-center'>
                                <button className={buttonStyle} disabled={((errors.loading)) ? true : false}>{errors.loading ? <Loading /> : 'Next'}</button>
                                <button onClick={() => { setView(<SignupForm setView={setView} />) }} className="p-4 font-semibold text-igblue-200">Go Back</button>
                                <div className="flex justify-center px-1 mt-5 text-xs text-center text-red-600">{errors.message}</div>
                            </div>
                        </form>
                    </div>

                    <div className="w-full p-6 text-xs text-center bg-white border border-igborder-100" style={{ maxWidth: "350px" }}>
                        <span>Have an account?</span>
                        <span> </span>
                        <Link href="/account/login/" className="font-bold text-igblue-200">Log in</Link>
                    </div>
                </div>
                <Footer />
            </div >
        </>
    )
}