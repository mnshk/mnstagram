import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import Divider from '@/components/Divider'
import { validateEmail, validateFullName, validateUsername, validatePassword } from '@/utils/validation'
import { Signup } from '@/services/authService'

type Form = {
    email: string,
    fullName: string,
    username: string,
    password: string,
}

type Errors = {
    loading: boolean,
    message: string | boolean,
    email: string | boolean,
    fullName: string | boolean,
    username: string | boolean,
    password: string | boolean,
}

const Page = () => {

    const formInitial = { email: '', fullName: '', username: '', password: '' }
    const errorsInitial = { loading: false, message: '', email: '', fullName: '', username: '', password: '' }

    const [form, setForm] = useState<Form>(formInitial);
    const [errors, setErrors] = useState<Errors>(errorsInitial)

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(form)

        setErrors({
            ...errorsInitial,
            email: validateEmail(form.email),
            fullName: validateFullName(form.fullName),
            username: validateUsername(form.username),
            password: validatePassword(form.password),
        })

        if (errors.email || errors.fullName || errors.username || errors.password) {
            return
        }
        setErrors((prev) => ({ ...prev, loading: true }))

        const res = await Signup(form)

        if (res.code == 'ERR_NETWORK') {
            setErrors((prev) => ({ ...prev, message: 'Unable to reach the server. Please make sure you\'re connected to the internet.', loading: false }))
            return
        }

        setErrors((prev) => ({ ...prev, loading: false }))

    }
    const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value })
    }

    const inputStyle = 'border w-full text-xs py-[10px] px-2 my-[3px] rounded-sm focus:outline-0 focus:border-zinc-400 bg-zinc-50 text-zinc-800 placeholder:text-gray-500 '
    const inputInvalid = 'border-red-600 '
    const errorStyle = 'text-xs text-red-600 px-1 '
    const buttonStyle = 'px-4 w-full rounded-lg py-[6px] text-white text-sm bg-igblue-200 disabled:bg-igblue-100 disabled:bg-igblue-100 '

    return (
        <>
            <Head>
                <title>Log in &#x2022; Mnstagram</title>
            </Head>

            <div className={`flex flex-col min-h-screen bg-igbg-100 font-inter text-xs antialiased`}>
                <div className="flex flex-col items-center flex-grow pb-20">
                    <div className="border border-igborder-100 flex flex-col items-center my-4 mb-2 bg-white w-full" style={{ maxWidth: "350px" }}>

                        <Image className="pt-12" src="/assets/images/mnstagram-text-logo.webp" alt="Instagram Logo" width="201" height="51" />

                        <div className="text-center text-sm px-10 text-zinc-400 pt-5">
                            Sign up to see photos and videos from your friends.
                        </div>

                        <form onSubmit={onSubmit} className="p-10 pt-6 pb-4 w-full">
                            <div className="mb-3">

                                <input className={inputStyle + (errors.email ? inputInvalid : '')} onChange={onChange} value={form.email} placeholder="Email address" type="email" name="email" required />
                                <div className={errorStyle}>{errors.email}</div>

                                <input className={inputStyle + (errors.fullName ? inputInvalid : '')} onChange={onChange} value={form.fullName} placeholder="Full name" type="text" name="fullName" required />
                                <div className={errorStyle}>{errors.fullName}</div>

                                <input className={inputStyle + (errors.username ? inputInvalid : '')} onChange={onChange} value={form.username} placeholder="Username" type="text" name="username" required />
                                <div className={errorStyle}>{errors.username}</div>

                                <input className={inputStyle + (errors.password ? inputInvalid : '')} onChange={onChange} value={form.password} placeholder="Password" type="password" name="password" required />
                                <div className={errorStyle}>{errors.password}</div>
                            </div>

                            <div className="text-center text-gray-500 flex flex-col gap-3" style={{ fontSize: "11px" }}>
                                <div className="text-center">
                                    <span>People who use our service may have uploaded your contact information to Instagram. </span>
                                    <span className="text-igblue-300">Learn more</span>
                                </div>
                                <div className="text-center mb-4">
                                    <span>By signing up, you agree to our </span>
                                    <span className="text-igblue-300">Terms</span>
                                    <span>, </span>
                                    <span className="text-igblue-300">Privacy Policy</span>
                                    <span> and </span>
                                    <span className="text-igblue-300">Cookies Policy</span>
                                    <span>.</span>
                                </div>
                            </div>
                            <div>
                                <button className={buttonStyle} disabled={(errors.loading || !form.email.length || !form.fullName.length || !form.username.length || (!form.password.length)) ? true : false}>{errors.loading ? 'Loading...' : 'Sign up'}</button>
                                <div className="text-xs text-red-600 px-1 mt-5 flex justify-center text-center">{errors.message}</div>
                            </div>
                        </form>
                        <div className="my-5"></div>
                    </div>

                    <div className="p-6 w-full text-center border border-igborder-100 bg-white text-xs" style={{ maxWidth: "350px" }}>
                        <span>Have an account?</span>
                        <span> </span>
                        <Link href="/account/login/" className="text-igblue-200 font-bold">Log in</Link>
                    </div>
                </div>
                <Footer />
            </div >
        </>
    )
}

export default Page