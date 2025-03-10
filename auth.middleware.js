const jwt = require("jsonwebtoken");
const User = require("./models/users.model");

const authMiddleware = async (req, res, next) => {
    try {
        // Check for Authorization header
        const authHeader = req.header("Authorization");
 
        if (!authHeader) { 
            return res.status(401).json({ message: "Access denied. No authorization header provided." });
        }

        // Ensure it's a Bearer token
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access denied. Invalid token format." });
        }

        // Extract token
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Access denied. Token missing." });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });

        // Find user
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Attach user object to request
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid or expired token." });
    }
};

module.exports = authMiddleware;
