export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3080"
    : "https://h2s-sms-api.herokuapp.com";
export * from "./firebase";
export * from "./axiosauth";
export * from "./sign";