
async function Login(jwtToken, jwtexpiration, userId, username) {
  localStorage.setItem("token", jwtToken);
  localStorage.setItem("userId", userId);
  localStorage.setItem("username", username);
}

export default Login;
