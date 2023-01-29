import React from 'react'
import Image from 'next/image'

function Header() {
    return (
        <div className="w-full border-b border-gray-300">
            <div className="max-w-3xl mx-auto">
                <Image className="m-4 mx-6 mb-3" src="/assets/images/mnstagram-text-logo.webp" alt="Instagram Logo" width="120" height="40" />
            </div>
        </div>
    )
}

export default Header