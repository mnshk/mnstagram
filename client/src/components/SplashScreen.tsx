import Image from "next/image"

export default function () {
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-white'>
            <Image src='/assets/images/mnstagram.svg' alt='Mnstagram' width='60' height='60' />
        </div>
    )
}