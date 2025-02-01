"use client"

import { useContext } from "react"

// Search Context
import { SearchContext } from "../context/Search"

import SatisfactionRate from "./SatisfactionRate"
import CustomerSupport from "./CustomerSupport"
import SecurePayment from "./SecurePayment"

const Search = () => {
    const { searchActive } = useContext(SearchContext)

    return (
        <div className={`${searchActive ? 'bg-white rounded-none xl:h-[80px]' : 'bg-white rounded-[20px] py-6 xl:h-[98px]'} hidden xl:block w-full relative shadow-lg`}>
            <div className={`flex h-full ${searchActive && 'container mx-auto'}`}>
                <SatisfactionRate />
                <CustomerSupport />
                <SecurePayment />
            </div>
        </div>
    )
}

export default Search