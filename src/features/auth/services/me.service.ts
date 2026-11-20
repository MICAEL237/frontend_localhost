import GeneralApi from "../../../services/refresh.token"

const CurrentUser =  async () =>{

    // const Reponse = await fetch("http://localhost:5500/api/v1/users/me", {
    //     method: "GET",
    //     credentials: "include",
    //     headers:{
    //        "Content-Type":"application/json"
    //     }
    // })

    // const User =  await Reponse.json()


    // return User

       return GeneralApi("users/me",{
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        } })

}

export default CurrentUser