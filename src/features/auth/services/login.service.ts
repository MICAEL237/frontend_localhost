import type { LoginType } from "../schemas/login.schema";

const LoginApi = async (data: LoginType): Promise<string> =>{

    const response = await fetch("http://localhost:5500/api/v1/auth/login",
        {
            method:"POST",
            body: JSON.stringify(data),
            credentials: "include",
            headers:{
                "Content-Type": "application/json"
            }
        }

       
    )

     const token  = await response.json()
        return token.success

}

export default LoginApi