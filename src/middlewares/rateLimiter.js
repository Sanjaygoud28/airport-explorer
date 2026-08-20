import rateLimit from "express-rate-limit";


// import rateLimit from "express-rate-limit";

// Limits each IP to 100 requests per 15-minute window.
// Protects the API from being hammered (accidentally or intentionally)
// and is a common, expected security practice for public APIs.
export const apiLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 15 minutes
  max: 10,
  message: {
    success: false,
    message: "Too many requests from this IP. Please try again after 15 minutes.",
  },
  standardHeaders: true, // adds RateLimit-* headers to responses
  legacyHeaders: false,
});
