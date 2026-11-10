
const ApiCreateSign = async (data: FormData) =>{

    try {
        const ApiCreateSignRoute = await fetch("http://localhost:5500/api/v1/sign", {
        method:"POST",
        credentials:"include",
        body: data,

        // headers:{
            
        // }
    })
    const res = await ApiCreateSignRoute.json()
    if(res.success === false) return false

    return ApiCreateSignRoute
    } catch (error) {
        console.log("la creation du signalement a echouer", error)
        
    }


}

export default ApiCreateSign