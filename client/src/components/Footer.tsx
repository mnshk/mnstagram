import React from 'react'
import Link from 'next/link'

function Footer() {
    return (
        <div className='text-[12px] bg-zinc-50 p-5 pb-20 text-zinc-400 flex flex-col gap-4'>
            <div className='flex justify-center gap-4'>
                <Link href='https://born11.com' target='_blank'>Munish</Link>
                <Link href='https://born11.com' target='_blank'>About</Link>
                <div>Privacy</div>
                <div>Terms</div>
                <div>Help</div>
            </div>
            <div className='flex justify-center gap-4'>
                <div>English &#40;UK&#41;</div>
                <div>&copy; 2023 Mnstagram from Munish</div>
            </div>
        </div>
    )
}

export default Footer