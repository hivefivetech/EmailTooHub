"use client"

import Image from "next/image"
import Icon from "../../../public/icons/saving.png"

const CustomerSupport = () => {
    return (
        <div className="w-full h-full flex xl:flex-row justify-center">
            <div className='flex flex-col sm:flex-row items-center justify-center gap-y-4 sm:gap-y-0 gap-x-4 hover:bg-slate-400 hover:text-white transition-all duration-1000 p-5 rounded-[6px]'>
                <div className='w-[40px]'>
                    <Image
                        src={Icon}
                        alt='icon'
                    />
                </div>
                <div>
                    <p className='text-[16px] font-bold'>Save Money On Email Marketing</p>
                </div>
            </div>
        </div>
    )
}

export default CustomerSupport