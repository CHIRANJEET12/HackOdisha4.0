import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    // Get the token from the headers or query parameters
    const token = req.headers['authorization'] || req.query.token;

    if (!token) {
        return res.status(403).json({ message: 'No token provided, authorization denied' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request object
        req.user = decoded;
        
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ message: 'Invalid token, authorization denied' });
    }
};

export default authenticate;
