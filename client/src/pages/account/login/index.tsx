import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import Divider from '@/components/Divider'
import Loading from '@/components/Loading'
import { login } from '@/services/auth'
import { useRouter } from 'next/router'
import store from '@/store'
import { loggedIn, } from '@/store/user'
import isAuth from '@/utils/isAuth'

type Form = {
    username: string,
    password: string,
}
type Errors = {
    loading: boolean,
    message: string,
    username: string | boolean,
    password: string | boolean,
}

export default function Page() {

    const router = useRouter()

    const formInitial = { username: '', password: '' }
    const errorsInitial = { loading: false, message: '', username: '', password: '', }

    const [form, setForm] = useState<Form>(formInitial);
    const [errors, setErrors] = useState<Errors>(errorsInitial)

    const errorMessage = 'Either your username or password was incorrect. Please double-check and try again.'

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrors({ ...errorsInitial, loading: true })
        if (form.username.trim().length < 1 || form.password.length < 6) {
            setErrors((prev) => ({ ...prev, message: errorMessage, loading: false }))
            return;
        }

        const res = await login(form, undefined)

        if (res.errors) {
            setErrors((prev) => ({ ...prev, ...res.errors, loading: false }))
        }
        if (res.data) {
            console.log('[LOGIN PAGE] Logged In');
            console.log(res.data);
            store.dispatch(loggedIn(res.data))
            router.push('/')
        }
    }

    useEffect(() => {

        if (isAuth()) {
            router.push('/')
        }
    }, [])

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value })
    }

    const inputStyle = 'border w-full text-xs py-[10px] px-2 my-[3px] rounded-sm focus:outline-0 focus:border-zinc-400 bg-zinc-50 text-zinc-800 placeholder:text-gray-500 '
    const inputInvalid = 'border-red-600 '
    const buttonStyle = 'px-4 w-full rounded-lg py-[6px] text-white text-sm bg-igblue-200 disabled:bg-igblue-100 flex justify-center items-center '

    return (
        <>
            <Head>
                <title>Log in &#x2022; Mnstagram</title>
            </Head>
            <div className={`flex flex-col flex-grow w-screen h-full bg-igbg-100 font-inter text-xs antialiased`}>
                <div className="flex flex-col items-center flex-grow pb-20">
                    <div className="flex flex-col items-center w-full my-12 mb-2 bg-white border border-igborder-100" style={{ maxWidth: "350px" }}>
                        <Image className="pt-12" src="/assets/images/mnstagram-text-logo.webp" alt="Instagram Logo" width="201" height="51" />
                        <form onSubmit={onSubmit} className="w-full p-10 pt-6 pb-4">
                            <div className="mb-3">
                                <input className={inputStyle + (errors.username ? inputInvalid : 'border-igborder-100')} onChange={onChange} value={form.username} placeholder="Username or email address" type="text" name="username" required />
                                <input className={inputStyle + (errors.password ? inputInvalid : '')} onChange={onChange} value={form.password} placeholder="Password" type="password" name="password" required />
                            </div>
                            <div>
                                <button className={buttonStyle} disabled={(errors.loading || form.password.length < 6 || form.username.trim().length < 1) ? true : false}>{(errors.loading) ? <Loading /> : 'Log in'}</button>
                                <div className="flex items-center justify-center px-1 mt-4 text-xs text-center text-red-600">{errors.message}</div>
                            </div>
                        </form>

                        <Divider>OR</Divider>

                        <div className="my-5"></div>

                        <Link href="password/" className="my-4 text-igblue-300">Forgotten your password?</Link>
                    </div>

                    <div className="w-full p-6 text-xs text-center bg-white border border-igborder-100" style={{ maxWidth: "350px" }}>
                        <span>Don&apos;t have an account?</span>
                        <span> </span>
                        <Link href="signup/" className="font-bold text-igblue-200">Sign up</Link>
                    </div>
                </div>
                <Footer />
            </div >
        </>
    )
}