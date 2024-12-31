const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    let token = req.headers["authorization"];

    console.log(token);
    
    if(token)
    {
        token = token.split(" ")[1];


        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {

            // console.log(err);
            
          if(err)
          {
            return res.status(400).json({message: "Token is not valid"});
          } 
          else{
            console.log(decoded);
            req.user = decoded;
          } 
         
        })

        next();
    }
    else{
        return res.status(400).json({message: "Token is not provided"});
    }
}

module.exports = {
    verifyToken
}