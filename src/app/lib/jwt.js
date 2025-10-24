import jwt, { sign, verify } from "jsonwebtoken"

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email,isadmin:user.isadmin },
        process.env.SECRET
        , { expiresIn: "7d" }
    )
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.SECRET)
    } catch (error) {
        return null;
    }
}

export { generateToken, verifyToken }