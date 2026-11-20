import { useNavigate } from "react-router";

const BASE_URL = "http://localhost:5500/api/v1";
export const RefreshToken = async () => {
  const response = await fetch(`${BASE_URL}/users/token`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await response.json();
  const token = res.token;

  if (!token) {
    return false;
  }

  return true;
};

const GeneralApi = async (url: string, content: RequestInit) => {
  const makeFunction = async () => {
    const response = await fetch(`${BASE_URL}/${url}`, content);

    return response;
  };
  ;

   let response = await makeFunction();
    console.log(response)
  const debuts = ["cat", "auth", "commune"];

  for (const d of debuts) {

    if (response.status === 401 && !url.startsWith(d)) {
                console.log("dedans")

      const token = await RefreshToken();
      console.log("totken", token);

      if (token) {
        const nav = useNavigate();
        nav("/login");
      } else {
        response = await makeFunction();
      }
    }
  }

  console.log("cna", response);

  return response;
};

export default GeneralApi;
