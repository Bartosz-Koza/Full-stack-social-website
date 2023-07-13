import bcrypt from 'bcrypt';
import  jwt  from 'jsonwebtoken';
import User from "../models/User.js"

/*REGISTER  */
export const register = async (req, res) =>{
    try{
        const {
            firstName,
            LastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            LastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewdProfile: Math.florr(Math.random() * 10000),
            impressions: Math.florr(Math.random() * 10000),
        });
        const savedUser = await newUser.save()
        res.status(201).json(savedUser);
    } catch (err){
        res.status(500).json({error: err.message})
    }
}

/*LOGGING*/

export const login = async (req, res) => {
    try{
        const { email, password} = req.body
        const user = await User.findOne({email: email})
        if (!user) return res.status(400).json({msg: "USER DOES NOT EXIST"})

        const isMacht = await bcrypt.compare(password, user.password)
        if (!isMacht) return res.status(400).json({msg: "INVALID CREDENCIALS"})

        const toke = jwt.sign({ id:user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user})

    } catch(error){
        res.status(500).json({error: err.message})
    }
}

export default login;