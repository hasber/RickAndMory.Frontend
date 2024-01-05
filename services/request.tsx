import axios from "axios";
import Swal from "sweetalert2";

const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_URL_API;
};

let headersAuth = (value?: string, type?: string) => {
  if (value && type) {
    return {
      "Content-Type": "application/json",
      [type]: value,
    };
  } else {
    return {
      "Content-Type": "application/json",
    };
  }
};

const defaultAxios: any = (value?: string, type?: string) => {
  return {
    method: "get",
    headers: headersAuth(value, type),
  };
};

export const alertMsg = (
  title: string,
  msg: string,
  type: "error" | "warning" | "success"
) => {
  Swal.fire(title, msg, type);
};

export const getCharacters = () => {
  return axios({ ...defaultAxios(), url: `${getApiUrl()}/characters` })
    .then((response) => {
      return response.data;
    })
    .catch(() => alertMsg("¡Alerta!", "Error al obtener los datos", "error"));
};

export const getCharactersByGender = (gender: string) => {
  return axios({
    ...defaultAxios(gender, "gender"),
    url: `${getApiUrl()}/charactersByGender`,
  })
    .then((response) => {
      return response.data;
    })
    .catch(() => alertMsg("¡Alerta!", "Error al obtener los datos", "error"));
};

export const getCharactersBySpecie = (specie: string) => {
  return axios({
    ...defaultAxios(specie, "species"),
    url: `${getApiUrl()}/charactersBySpecie`,
  })
    .then((response) => {
      return response.data;
    })
    .catch(() => alertMsg("¡Alerta!", "Error al obtener los datos", "error"));
};

export const setFavorite = (data: any) => {
  return axios({
    ...defaultAxios(),
    url: `${getApiUrl()}/favorite`,
    method: "post",
    data: data,
  }).catch(() =>
    alertMsg(
      "¡Error!",
      "Error al modificar favorito",
      "error"
    )
  );
};
