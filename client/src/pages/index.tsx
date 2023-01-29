import React, { useEffect } from 'react'
import Head from 'next/head'

import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, getValue } from '../store/counter'


export default function Home() {
  
  const count = useSelector(getValue)
  const dispatch = useDispatch()

  return (
    <>
      <Head>
        <title>Mnstagram</title>
        <meta name="description" content="Mnstagram" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='font-inter flex flex-col w-full min-h-screen text-sm'>
        <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio non maxime enim sapiente qui amet quis corrupti placeat, nisi atque, repellendus iste ullam excepturi eveniet voluptate ducimus ipsa nobis fugit?</div>
        <div>{count}</div>
        <div>
          <button onClick={() => dispatch(increment())}>+</button>
          <button onClick={() => dispatch(decrement())}>-</button>
        </div>
      </div>
    </>
  )
}