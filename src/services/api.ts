import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";
import { signOut } from "../context/AuthContext";
import { AuthTokenError } from "./errors/AuthTokenError";

let isRefreshing = false;
let failedRequestsQueue: {
  onSuccess: (token: string) => void;
  onFailure: (err: AxiosError<any>) => void;
}[] = [];

export function setupAPIClient(ctx: any) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3333/",
    headers: {
      Authorization: `Bearer ${cookies["nextauth.token"]}`,
    },
  });

  //interceptar respuesta de la api proveniendes del backend
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (error.response.data?.code === "token.expired") {
          //Renovar token
          cookies = parseCookies(ctx);

          const { "nextauth.refreshToken": refreshToken } = cookies;

          //error.config tiene toda la configuración de la requesición del backend
          //Tiene toda la configuración que se necesita para repetir una requesición al backend
          const originalConfig = error.config;

          if (!isRefreshing) {
            console.log("refreshing token");
            isRefreshing = true;
            api
              .post("/refresh", { refreshToken })
              .then((response) => {
                const { token } = response.data;

                setCookie(ctx, "nextauth.token", token, {
                  maxAge: 60 * 60 * 24 * 30,
                  //Para que pueda accederse desde todas las páginas
                  path: "/",
                });

                setCookie(
                  ctx,
                  "nextauth.refreshToken",
                  response.data.refreshToken,
                  {
                    maxAge: 60 * 60 * 24 * 30,
                    path: "/",
                  }
                );

                //token actualizado
                api.defaults.headers["Authorization"] = `Bearer ${token}`;

                //Paso el token actualizado por cada request fallada
                failedRequestsQueue.forEach((request) =>
                  request.onSuccess(token)
                );

                failedRequestsQueue = [];
              })
              .catch((err) => {
                failedRequestsQueue.forEach((request) =>
                  request.onFailure(err)
                );

                failedRequestsQueue = [];

                if (typeof window !== "undefined") {
                  signOut();
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers["Authorization"] = `Bearer ${token}`;

                resolve(api(originalConfig));
              },
              onFailure: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        } else {
          //Desconectar el usuario
          if (typeof window !== "undefined") {
            signOut();
          } else {
            return Promise.reject(new AuthTokenError());
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}
