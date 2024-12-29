import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies.token;
        if(!token) {
            return res.status(401).json({
                message: "User is not Authenticated",
                success: false
            });
        };

        //here token is found, verify jwt token here
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode) {
            return res.status(401).json({
                message: "Invalid Token",
                success: false
            });
        };

        //if user is valid, we store the userId taking from jwt to request body(req.id) so tha it is available further 
        req.id = decode.userId;
        //proced to next step since user is valid
        next();
    } catch (error) {
        console.log(error);
    }
};

export default isAuthenticated;