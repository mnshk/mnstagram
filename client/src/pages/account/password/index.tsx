import React, { useEffect, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import SplashScreen from '@/components/SplashScreen'
import Footer from '@/components/Footer'
import Loading from '@/components/Loading'
import Divider from '@/components/Divider'

import { validatePassword, validateConfirmationCode } from '@/utils/validation'
import { resetPassword } from '@/services/auth'

export default function Page() {

  const [view, setView] = useState<JSX.Element>(<SplashScreen />)

  useEffect(() => {
    setView(<PasswordResetForm setView={setView} />)
  }, [])

  return (
    <>
      <Head>
        <title>Reset Password &#x2022; Mnstagram</title>
      </Head>
      {/* {view} */}
      <SuccessScreen />
    </>
  )
}

type Form = {
  username: string,
  confirmationToken: string,
}

function PasswordResetForm({ setView }: { setView: React.Dispatch<React.SetStateAction<JSX.Element>> }) {

  type Errors = {
    loading: boolean,
    message: string | boolean,
    username: string | boolean,
  }

  // Form values
  const formInitial: Form = { username: 'mk6229478@gmail.com', confirmationToken: '' }
  const errorsInitial = { loading: false, message: '', username: '' }
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
      username: form.username ? false : 'This field is required.'
    })

    if (!form.username) {
      return
    }

    // If all good send confirmation code and move to enter code view

    setErrors({ ...errorsInitial, loading: true })

    const res = await resetPassword(form);

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

            <Image className="pt-12" src="/assets/images/lock.webp" alt="Instagram Logo" width="96" height="96" />


            <div className="px-10 pt-5 text-sm font-semibold text-center">
              Trouble with logging in?
            </div>

            <div className="px-10 pt-5 text-xs text-center text-zinc-500">
              Enter your email address or username, and we&apos;ll send you a verification code to get back into your account.
            </div>

            <form onSubmit={onSubmit} className="w-full p-10 pt-6 pb-4">
              <div className="mb-3">
                <input className={inputStyle + (errors.username ? inputInvalid : '')} onChange={onChange} value={form.username.toLowerCase()} placeholder="Username or email address" type="text" name="username" required />
                <div className={errorStyle}>{errors.username}</div>
              </div>

              <div>
                <button className={buttonStyle} disabled={(errors.loading || !form.username.length) ? true : false}>{errors.loading ? <Loading /> : 'Next'}</button>
                <div className="flex justify-center px-1 mt-5 text-xs text-center text-red-600">{errors.message}</div>
              </div>
            </form>

            <Divider>OR</Divider>

            <div className="p-5">
              <Link href="/account/signup/" className="">Create New Account</Link>
            </div>
            <div className="p-5"></div>
          </div>


          <div className="w-full p-6 text-xs text-center bg-white border border-igborder-100" style={{ maxWidth: "350px" }}>
            <Link href="/account/login/" className="">Back to Login</Link>
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

    const res = await resetPassword({ ...prevForm, confirmationCode: form.confirmationCode })

    console.log(res);


    if (res.errors) {
      return setErrors((prev) => ({ ...prev, ...res.errors, loading: false }))
    }
    if (res.data) {
      setView(<NewPasswordScreen setView={setView} prevForm={{ ...prevForm, confirmationCode: form.confirmationCode }} />)
    }
    // store.dispatch(loggedIn(res.data))
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
                <button onClick={() => { setView(<PasswordResetForm setView={setView} />) }} className="p-4 font-semibold text-igblue-200">Go Back</button>
                <div className="flex justify-center px-1 mt-5 text-xs text-center text-red-600">{errors.message}</div>
              </div>
            </form>
          </div>

          <div className="w-full p-6 text-xs text-center bg-white border border-igborder-100" style={{ maxWidth: "350px" }}>
            <Link href="/account/signup/" className="">Create New Account</Link>
          </div>
        </div>
        <Footer />
      </div >
    </>
  )
}


function NewPasswordScreen({ setView, prevForm }: { setView: React.Dispatch<React.SetStateAction<JSX.Element>>, prevForm: any }) {

  type Form = {
    password: string,
  }

  type Errors = {
    loading: boolean,
    message: string | boolean,
    password: string | boolean,
  }

  // Form values
  const formInitial: Form = { password: '' }
  const errorsInitial = { loading: false, message: '', password: '' }
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
      password: validatePassword(form.password),
    })

    if (validatePassword(form.password)) {
      return
    }

    // If all good send confirmation code and move to enter code view

    setErrors({ ...errorsInitial, loading: true })

    const res = await resetPassword({ ...prevForm, ...form });

    if (res.errors) {
      return setErrors({ ...errorsInitial, ...res.errors, loading: false })
    }
    if (res.data) {
      setView(<SuccessScreen />)
    }
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

            <Image className="pt-12" src="/assets/images/lock.webp" alt="Instagram Logo" width="96" height="96" />

            <div className="px-10 pt-5 text-sm font-semibold text-center">
              Create New Password
            </div>
            <form onSubmit={onSubmit} className="w-full p-10 pt-6 pb-4">
              <div className="mb-3">
                <input className={inputStyle + (errors.password ? inputInvalid : '')} onChange={onChange} value={form.password} placeholder="New password" type="password" name="password" required />
                <div className={errorStyle}>{errors.password}</div>
              </div>
              <div>
                <button className={buttonStyle} disabled={(errors.loading || (!form.password.length)) ? true : false}>{errors.loading ? <Loading /> : 'Done'}</button>
                <div className="flex justify-center w-full">
                  <Link href='/account/login' className="p-4 font-semibold text-igblue-200">Cancel</Link>
                </div>
                <div className="flex justify-center px-1 mt-5 text-xs text-center text-red-600">{errors.message}</div>
              </div>
            </form>
            <div className="my-5"></div>
          </div>
        </div>
        <Footer />
      </div >
    </>
  )
}


function SuccessScreen() {
  return (
    <div className={`flex flex-col flex-grow w-screen h-full bg-igbg-100 font-inter text-xs antialiased`}>
      <div className="flex flex-col items-center flex-grow pb-20">
        <div className="flex flex-col items-center w-full my-4 mb-2 bg-white border border-igborder-100" style={{ maxWidth: "350px" }}>

          <Image className="pt-12" src="/assets/images/done.webp" alt="Instagram Logo" width="96" height="96" />
          <div className="px-10 pt-5 text-sm font-semibold text-center">
            Password changed successfully.
          </div>
          <div className='p-5'>
            <Link href='/account/login' className='w-full text-sm font-semibold text-center text-igblue-200'>Click here to login</Link>
          </div>
          <div className="p-5"></div>
        </div>
      </div>
      <Footer />
    </div >
  )
}