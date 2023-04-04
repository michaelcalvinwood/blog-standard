import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBolt, faBoltLightning, faBrain } from "@fortawesome/free-solid-svg-icons"
export const Logo = () => {
    return (
        <div className="text-3xl text-center py-4 font-heading">
            Instant Blog
            <FontAwesomeIcon icon={faBoltLightning} className="pl-1 text-2xl text-yellow-400"/>
        </div>
    )
}


