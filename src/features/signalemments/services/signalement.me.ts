import GeneralApi from "../../../services/refresh.token"

const meApiSign = () => {
    return GeneralApi("sign/me", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
}


export default meApiSign