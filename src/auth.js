export function saveCredentialId(id) {
  localStorage.setItem("credentialId", id);
}

export function getCredentialId() {
  return localStorage.getItem("credentialId");
}

export function saveUserId(id) {
  localStorage.setItem("userId", id);
}

export function getUserId() {
  return localStorage.getItem("userId");
}


