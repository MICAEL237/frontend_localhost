const ListCommune = async ()=>{
    const response = await fetch("http://localhost:5500/api/v1/commune", {
        method:"GET",
        credentials:"include",
        headers:{
            "Content-Type": "application/json"
        }
    })

    const res = await response.json()
    const data = res.data

    return data

}

export default ListCommune