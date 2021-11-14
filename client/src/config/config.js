import dotenv from "dotenv";
dotenv.config();

export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export const FACEBOOK_CLIENT_ID = process.env.REACT_APP_FACEBOOK_CLIENT_ID;

export const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8080/api";

export const PUBLIC_URL =
  process.env.REACT_APP_PUBLIC_URL || "http://localhost:8080";
