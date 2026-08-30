import  jwt  from "jsonwebtoken";

//create access token
const generateAccessToken = (userId,role)=>{
  return jwt.sign(
    {
      userId,
      role
    
    },
    
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn : process.env.ACCESS_TOKEN_EXPIRY}
  )
}
const generateRefreshToken = (userId,role) => {
    return jwt.sign(
        { userId ,
          role
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    )
}

export {generateAccessToken, generateRefreshToken} 