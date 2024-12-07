import axios from "axios";

const HOSTBACKEND = `http://localhost:3000/api`

export const LoginUserAccess = async (data) => {
  const endpoint = `${HOSTBACKEND}/login`;

  try {
    const response = await axios.post(endpoint, data);

    const { user, token } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));


    setTimeout(() => {
      window.location.reload();
    }, 3000);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.msj || "Error al conectar con el servidor",
      status: error.response?.status || 500,
    };
  }
};


export const registerUserApi = async (data) => {
    const endpoint = `${HOSTBACKEND}/create-user`;
    try {
        
        const respuesta = await axios.post(endpoint, data)

        return respuesta.data


    } catch (error) {
        console.error(error);
        
    }
}