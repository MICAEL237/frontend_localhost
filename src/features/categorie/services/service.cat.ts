const ListCategorie = async ()=>{
    const response = await fetch("http://localhost:5500/api/v1/cat", {
        method:"GET",
        credentials:"include",
        headers:{
            "Content-Type": "application/json"
        }
    })

    const res = await response.json()
    const data = res.data
    console.log(data)

    return data

}

export default ListCategorie