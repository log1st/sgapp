export type AuthToken = {
  token: string;
  expiresIn: number;
};

export type AuthTokens = {
  accessToken: AuthToken;
  refreshToken: AuthToken;
};
