import GeneralApi from "../../../services/refresh.token"

const UserApi = async () => {

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

   return GeneralApi("admin",{
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        } })

}

export default UserApi