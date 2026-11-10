export const SignApi = async () => {
  const response = await fetch("http://localhost:5500/api/v1/sign", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const val = await response.json();

  if (!val.data) {
    return 0;
  }

  return val.data;
};
