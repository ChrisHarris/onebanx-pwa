import { useEffect, useReducer } from "react";
import { getUserId } from "./auth";
import { debug } from "./debug";
import { DEFAULT_ORG } from "./config";

const initialState = {
  uiState: null, // "returning" | "signed_in" | null (default - Sign In)
  userId: null,
};

// Static values parsed once from URL params (e.g. from QR code scan)
const params = new URLSearchParams(window.location.search);
const location = params.get("location") || "Business Cash Flow";
const locale = params.get("locale") || "en-GB";
const org = (params.get("org") || DEFAULT_ORG).replace(/ /g, "-");
debug("URL params", { location, locale, org });

function reducer(state, action) {
  switch (action.type) {
    case "SET_RETURNING":
      return { ...state, uiState: "returning", userId: action.userId };
    case "SET_SIGNED_IN":
      return { ...state, uiState: "signed_in", userId: action.userId };
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

  function handleAuthenticated(id) {
    dispatch({ type: "SET_SIGNED_IN", userId: id });
  }

  return { ...state, location, locale, org, handleAuthenticated };
}
