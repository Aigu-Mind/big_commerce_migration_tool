"use client";
import axios from "axios";
import momentTimezone from "moment-timezone";
import { useDispatch, useSelector } from "react-redux";
import RenderToast from "@/component/atoms/RenderToast";
import { BaseURL } from "@/resources/utils/helper";

const useAxios = () => {
  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector(
    (state) => state.authReducer
  );

  const getErrorMsg = (error = null) => {
    if (error?.message === "Network Error") {
      return `Network Error : Please Check Your Network Connection`;
    }
    const message = error?.response?.data?.message?.error;
    let errorMessage = "";

    Array.isArray(message)
      ? message?.map(
          (item, i) => (errorMessage = `${errorMessage} • ${item} \n`)
        )
      : (errorMessage = message);
    return errorMessage;
  };

  // Function to handle API requests
  const handleRequest = async ({
    method = "",
    route = "",
    data = {},
    headers = {},
    showAlert = true,
    isFormData = false,
    responseType = undefined,
  }) => {
    const url = BaseURL(route);
    const _headers = {
      Accept: "application/json",
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      timezone: momentTimezone.tz.guess(),
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...headers,
    };

    try {
      const axiosConfig = { method, url, data, headers: _headers };
      if (responseType) axiosConfig.responseType = responseType;
      const response = await axios(axiosConfig);
      return { response: response?.data, rawResponse: response, error: null };
    } catch (error) {
      console.log("Error in API call:", error);
      const errorMessage = getErrorMsg(error);
      if (showAlert) {
        RenderToast({
          message: errorMessage || "An unexpected error occurred.",
          type: "error",
        });
      }
      return { error, response: null };
    }
  };

  return {
    Get: ({ route = "", headers = {}, showAlert = true, responseType = undefined }) =>
      handleRequest({ method: "get", route, headers, showAlert, responseType }),

    Post: ({
      route = "",
      data = {},
      headers = {},
      showAlert = true,
      isFormData = false,
    }) =>
      handleRequest({
        method: "post",
        route,
        data,
        headers,
        showAlert,
        isFormData,
      }),

    Put: ({
      route = "",
      data = {},
      headers = {},
      showAlert = true,
      isFormData = false,
    }) =>
      handleRequest({
        method: "put",
        route,
        data,
        headers,
        showAlert,
        isFormData,
      }),

    Patch: ({
      route = "",
      data = {},
      headers = {},
      showAlert = true,
      isFormData = false,
    }) =>
      handleRequest({
        method: "patch",
        route,
        data,
        headers,
        showAlert,
        isFormData,
      }),

    Delete: ({ route = "", headers = {}, showAlert = true }) =>
      handleRequest({ method: "delete", route, headers, showAlert }),
  };
};

export default useAxios;