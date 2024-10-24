export const validate_auth = async ({ headers, jwt }) => {
  // 1. Extract the 'Authorization' header from the incoming request
  const auth = headers["authorization"];
  console.log(auth);

  // 2. Check if the 'Authorization' header contains a Bearer token
  //    If it starts with 'Bearer ', extract the token string after 'Bearer '
  //    Otherwise, set token to null indicating no valid token is present
  const token = auth && auth.startsWith("Bearer ") ? auth.split(" ")[1] : null;

  // 3. If no token is found, return an object with user set to null
  if (!token) return { user: null };

  // 4. Verify the JWT token using the jwt_auth module
  //    This step authenticates the token and retrieves the user information
  const user = await jwt.verify(token);

  // 5. Return an object containing the authenticated user information
  //    This will be available inside de request object
  return { user };
};
