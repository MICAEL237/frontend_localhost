import type { UpdateRoleType } from "../schemas/updaterole";

const UpdateRole = async (data: UpdateRoleType) => {
    const ApiRole = await fetch("http://localhost:5500/api/v1/users/updaterole", {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify(data),
        headers:{
            "Content-Type": "application/json"
        }
    })

    const update = await ApiRole.json()

    return update



}


export default UpdateRole