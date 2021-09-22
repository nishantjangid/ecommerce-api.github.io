const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authorizationHeaader  = req.headers.authorization;
    
    if(!authorizationHeaader ) return res.status(400).send("Access denied");    

    // GET THE TOKEN TO REMOVE BEAREER
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.TOKEN_SECRET,{expiresIn:"2d"},(err, decoded)=>{
        if(err){
            console.log(err);
            res.status(400).send("Invalid token");
        }else{
            next();
        }
    });
}

module.exports = verifyToken