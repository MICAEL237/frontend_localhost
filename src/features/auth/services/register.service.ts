import type { RegisterType } from "../schemas/register.schema"

const RegisterApi = async (data: RegisterType): Promise<RegisterType> => {

    const res = await fetch('http://localhost:5500/api/v1/users/', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })

    const ApiRegister = await res.json()
    console.log(ApiRegister)

    return  ApiRegister

}

export default RegisterApi