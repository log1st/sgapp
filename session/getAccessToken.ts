import { cookies } from "next/headers";

const authTokenName = "auth";
const refreshTokenName = "authRefresh";

export const getAccessToken = () =>
  cookies().get(authTokenName)?.value.split("/")[0];

export const getAccessTokenExpirationDate = (): Date | null => {
  const string = cookies().get(authTokenName)?.value.split("/")[1];

  return string ? new Date(string) : null;
};

export const setAccessToken = (token: string, expiresIn: number) => {
  const expires = new Date(Date.now() + expiresIn * 1000);

  cookies().set(authTokenName, `${token}/${expires.toString()}`, {
    path: "/",
    httpOnly: true,
    expires,
  });
};

export const dropAccessToken = () => {
  cookies().delete(authTokenName);
};

export const getRefreshToken = () => cookies().get(refreshTokenName)?.value;

export const setRefreshToken = (token: string, expiresIn: number) => {
  cookies().set(refreshTokenName, token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + expiresIn * 1000),
  });
};

export const dropRefreshToken = () => {
  cookies().delete(refreshTokenName);
};

export const isAuthorized = () => !!getAccessToken();
