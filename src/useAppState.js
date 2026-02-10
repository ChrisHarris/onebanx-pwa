import { useEffect, useReducer } from "react";
import { getUserId } from "./auth";

const initialState = {
  uiState: null, // "returning" | "signed_in" | null (default - Sign In)
  userId: null,
  location: "Business Cash Flow",
  institution: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_RETURNING":
      return { ...state, uiState: "returning", userId: action.userId };
    case "SET_SIGNED_IN":
      return { ...state, uiState: "signed_in", userId: action.userId };
    case "SET_URL_PARAMS":
      return { ...state, location: action.location, institution: action.institution };
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

  // Read location and institution from URL params (e.g. from QR code scan)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const location = params.get("location");
    const institution = params.get("institution");
    if (location || institution) {
      dispatch({ type: "SET_URL_PARAMS", location, institution });
      // Clean params from URL without reload
      params.delete("location");
      params.delete("institution");
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
