import React from 'react'


function divider({ children }: React.PropsWithChildren) {
    return (
        <div className="flex w-full items-center px-10">
            <div className="border-b border-igborder-100 flex-grow"></div>
            <div className="text-center text-slate-500 flex-shrink-0 mx-4">{children}</div>
            <div className="border-b border-igborder-100 flex-grow"></div>
        </div>
    )
}

export default divider