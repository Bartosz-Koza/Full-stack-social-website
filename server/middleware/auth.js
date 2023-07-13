import jwt from "jsonwebtoken";
import verify from "jsonwebtoken"

export const verifyToken = async (req, res, next) =>{
    try{
        let token = req.header("Authorization");

        if (!token){
            return res.status(403).send("ACCES DENIED")
        }
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.lenght).trimLeft()
        }

        const vrify = jwt.verify(token.process.env.JWT_SECRET)
        req.user = verify

    } catch (err){
      res.status(400).json({error: err.message})
    }
}