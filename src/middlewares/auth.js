import jwt from "jsonwebtoken";

const verifyAccessToken = (req, res, next) => {
  try {
    // get the token from the request headers

    // const authHeader = req.headers['authorization'];
    //or
    const authHeader = req.headers.authorization;
    console.log("Auth Header: ", authHeader);

    // Format: "Bearer TOKEN"  expected Authorization header format is:
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const err = new Error("Not authorized — no token provided");
      err.statusCode = 401;
      throw err;
    }

    //Split header
    const token =  authHeader.split(" ")[1];
    console.log("Token: ", token);

    // if (!token) {
    //   throw new Error("Access denied, No token provided.");
    // }

    const decodedDataFromAccessToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
    );
    console.log("Decoded Data from ACCESS TOKEN: ", decodedDataFromAccessToken);

    // Add the user info. to request object.
    req.user = decodedDataFromAccessToken;

    // Continue to next middleware/ route
    next();
  } catch (error) {
    res.status(401).json({
      error: true,
      message: error.message,
    });
  }
};

export { verifyAccessToken };
