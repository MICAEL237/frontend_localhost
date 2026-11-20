import GeneralApi from "../../../services/refresh.token"

const CatApiSign = (categorie: string) => {
    return GeneralApi(`sign/cat/${categorie}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
}


export default CatApiSign