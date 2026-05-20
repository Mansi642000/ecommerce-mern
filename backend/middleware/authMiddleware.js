import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
}

    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, name: decoded.name };
    next();
    } catch (error) {
    return res.status(401).json({ message: "Not authorized, token invalid" });
    }
};