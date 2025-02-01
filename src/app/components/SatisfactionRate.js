"use client"

import Icon from "../../../public/icons/paid.png"
import Image from 'next/image';

const SatisfactionRate = () => {
    return (
        <div className="w-full h-full flex xl:flex-row justify-center">
            <div className='flex flex-col sm:flex-row items-center gap-y-4 sm:gap-y-0 gap-x-4 hover:bg-slate-400 hover:text-white transition-all duration-1000 p-5 rounded-[6px]'>
                <div className='w-[40px]'>
                    <Image
                        src={Icon}
                        alt='icon'
                    />
                </div>
                <div>
                    <p className='text-[16px] font-bold'>Paid Tools Now 100% Free!</p>
                </div>
            </div>
        </div>
    )
}

export default SatisfactionRate