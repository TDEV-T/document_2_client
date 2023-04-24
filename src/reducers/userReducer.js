export function userReducer(state = null, action) {
  switch (action.type) {
    case "LOGIN":
      return action.user;
    case "LOGOUT":
      localStorage.clear();
      return action.user;
    default:
      return null;
  }
}
