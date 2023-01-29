import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import Divider from '@/components/Divider'
import Loading from '@/components/Loading'
import { ResetPassword } from '@/services/authService'
import Header from '@/components/Header'

type Form = {
  usernameOrEmail: string,
}
type Errors = {
  loading: boolean,
  message: string,
  usernameOrEmail: string,
}

const Page = () => {

  const formInitial = { usernameOrEmail: '' }
  const errorsInitial = { loading: false, message: '', usernameOrEmail: '' }

  const [form, setForm] = useState<Form>(formInitial);
  const [errors, setErrors] = useState<Errors>(errorsInitial)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({ ...errorsInitial, loading: true })
    if (form.usernameOrEmail.trim().length < 1) {
      setErrors((prev) => ({ ...prev, message: 'Please enter a valid username or email address', loading: false }))
      return;
    }

    const res = await ResetPassword(form)

    if (res.code == 'ERR_NETWORK') {
      setErrors((prev) => ({ ...prev, message: 'Unable to reach the server. Please make sure you\'re connected to the internet.', loading: false }))
      return
    }
  }
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

      <Header></Header>

      <div className={`flex flex-col min-h-screen bg-igbg-100 font-inter text-xs antialiased`}>
        <div className="flex flex-col items-center flex-grow pb-20">
          <div className="border border-igborder-100 flex flex-col items-center my-12 mb-2 bg-white w-full" style={{ maxWidth: "350px" }}>
            <Image className="py-6" src="/assets/images/lock.webp" alt="Instagram Logo" width="96" height="96" />
            <div className="text-center">
              <div className="font-semibold text-sm text-gray-800">Trouble with logging in?</div>
              <div className="text-gray-500 text-xs px-8 py-3">
                Enter your email address or username, and we&apos;ll send you a link to get back into your account.
              </div>
            </div>
            <form onSubmit={onSubmit} className="p-10 pt-6 pb-4 w-full">
              <div className="mb-3">
                <input className={inputStyle + (errors.usernameOrEmail ? inputInvalid : 'border-igborder-100')} onChange={onChange} value={form.usernameOrEmail} placeholder="Username or email address" type="text" name="usernameOrEmail" required />
              </div>
              <div>
                <button className={buttonStyle} disabled={(errors.loading || form.usernameOrEmail.trim().length < 1) ? true : false}>{(errors.loading) ? <Loading /> : 'Log in'}</button>
                <div className="text-xs text-red-600 px-1 mt-4 flex items-center justify-center text-center">{errors.message}</div>
              </div>
            </form>

            <Divider>OR</Divider>

            <Link href="signup/" className="text-xs text-blue-900 my-4">Create New Account</Link>
            <div className="my-5"></div>
            <div className="border border-gray-300 w-full text-center p-3 text-xs bg-gray-50">
              <Link href='login/' className="">Back to Login</Link>
            </div>
          </div>
        </div>
        <Footer />
      </div >
    </>
  )
}

export default Page