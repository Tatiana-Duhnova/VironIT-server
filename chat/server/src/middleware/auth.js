const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'expressapp');
        const user = await users.findOne({_id: decoded._id, 'tokens.token': token });

        if(!user){
            throw new Error;
        }
        
        req.token = token; 
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({error: 'Please autentificate'})
    }
};

export default auth