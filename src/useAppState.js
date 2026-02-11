import { useEffect, useReducer } from "react";
import { getUserId } from "./auth";

const initialState = {
  uiState: null, // "returning" | "signed_in" | null (default - Sign In)
  userId: null,
  location: "Business Cash Flow",
  locale: "en-GB",
  org: "default",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_RETURNING":
      return { ...state, uiState: "returning", userId: action.userId };
    case "SET_SIGNED_IN":
      return { ...state, uiState: "signed_in", userId: action.userId };
    case "SET_URL_PARAMS":
      return {
        ...state,
        location: action.location,
        locale: action.locale,
        org: action.org,
      };
    default:
      return state;
  }
}

export default function useAppState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Read stored user ID (if any) – returning user
  useEffect(() => {
    const stored = getUserId();
    if (stored) {
      dispatch({ type: "SET_RETURNING", userId: stored });
    }
  }, []);

  // Read location and org from URL params (e.g. from QR code scan)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const location = params.get("location");
    const locale = params.get("locale") || "en-GB";
    const org = (params.get("org") || "default").toLowerCase().replace(/ /g, "-");
    if (location || params.has("org") || params.has("locale")) {
      dispatch({ type: "SET_URL_PARAMS", location, locale, org });
      // Clean params from URL without reload
      params.delete("location");
      params.delete("org");
      params.delete("locale");
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params}`
        : window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, []);

  function handleAuthenticated(id) {
    dispatch({ type: "SET_SIGNED_IN", userId: id });
  }

  return { ...state, handleAuthenticated };
}
