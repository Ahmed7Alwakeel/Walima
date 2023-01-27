import { useEffect } from "react";
import Router from "next/router";
import { API_URL } from "../api_baseURL"
import axios from "axios";
import Cookie from "js-cookie";

export const signUp = (values) => {

  if (typeof window === "undefined") {
    return;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/register`, values)
      .then((res) => {

        Cookie.set("token", res.data.jwt);

        resolve(res);

        Router.push("/");
      })
      .catch((error) => {

        reject(error);
      });
  });
};

export const login = (values) => {

  if (typeof window === "undefined") {
    return;
  }

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/`, values)
      .then((res) => {

        Cookie.set("token", res.data.jwt);

        resolve(res);

        Router.push("/");
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};

export const logout = () => {
  Cookie.remove("token");
  localStorage.removeItem("currentUser")
  delete window.__user;
  window.localStorage.setItem("logout", Date.now());
  Router.push("/");
};

