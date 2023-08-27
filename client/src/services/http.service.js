import axios from "axios";
import configureFile from "../config.json";
import authService from "./auth.service";
import localStorageService from "./localStorage.service";

const http = axios.create({
    baseURL: configureFile.apiEndpoint
});

http.interceptors.request.use(
    async function (config) {
        const expiresDate = localStorageService.getTokenExpiresDate();
        const refreshToken = localStorageService.getRefreshToken();
        const isExpired = refreshToken && expiresDate < Date.now();
        if (configureFile.isFireBase) {
            const contianSlash = /\/$/gi.test(config.url);
            config.url =
                (contianSlash ? config.url.slice(0, -1) : config.url) + ".json";

            if (isExpired) {
                const data = await authService.refresh();

                localStorageService.setTokens({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    expiresIn: data.expires_in,
                    localId: data.user_id
                });
                const accessToken = localStorageService.getAccessToken();
                if (accessToken) {
                    config.params = { ...config.params, auth: accessToken };
                }
            }
        } else {
            if (isExpired) {
                const data = await authService.refresh();
                localStorageService.setTokens(data);
            }
            const accessToken = localStorageService.getAccessToken();
            if (accessToken) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${accessToken}`
                };
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

function transformData(data) {
    return data && !data.id
        ? Object.keys(data).map((key) => ({
              ...data[key]
          }))
        : data || [];
}

http.interceptors.response.use(
    (res) => {
        if (configureFile.isFireBase) {
            res.data = transformData(res.data);
        }

        return res;
    },
    function (error) {
        const expeftedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expeftedErrors) {
            console.log(error);
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: http.get,
    put: http.put,
    delete: http.delete,
    post: http.post,
    patch: http.patch
};

export default httpService;
