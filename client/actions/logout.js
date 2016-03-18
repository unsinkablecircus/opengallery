
const logout = {
    type: "LOGOUT"
  }

// Logs the user out
export function logoutUser() {
  // kill the token, return action
  localStorage.removeItem('id_token');
  return logout;
}