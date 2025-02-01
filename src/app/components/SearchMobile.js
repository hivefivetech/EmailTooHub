
// Components
import CustomerSupport from "./CustomerSupport"
import SatisfactionRate from "./SatisfactionRate"
import SecurePayment from "./SecurePayment"

const SearchMobile = () => {
    return (
        <div className="hidden font-medium">
            <div className="container mx-auto">
                <div className="flex flex-col gap-y-4">
                    {/* Customer Satisfaction Rate */}
                    <SatisfactionRate />

                    {/* Customer Support */}
                    <CustomerSupport />

                    {/* Secure Payment */}
                    <SecurePayment />
                </div>
            </div>
        </div>
    )
}

export default SearchMobile