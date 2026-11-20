import GeneralApi from "../../../services/refresh.token"

const SignReadApi = async () => {

    // const Api = await fetch("http://localhost:5500/api/v1/admin", { 
    //     method: "GET",
    //     credentials: "include",
    //     headers: {
    //         "Content-Type": "application/json"
    //     }
    // })

    // console.log("appeler")

    // const userApi = await Api.json()
    // console.log(userApi)

    // return userApi

   return GeneralApi("sign",{
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        } })

}

export default SignReadApi