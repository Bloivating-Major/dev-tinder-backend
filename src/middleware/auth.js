const adminAuth = (req, res, next)=>{
    const token = 'xyz';
    const isVerified = token === 'xyz';
    if(!isVerified){
        return res.status(403).send('Unauthorized access');
    }else{
        next();
    }
}

const userAuth = (req, res, next)=>{
    const token = 'abc';
    const isVerified = token === 'absdfc';
    if(!isVerified){
        return res.status(403).send('Unauthorized access');
    }else{
        next();
    }
}


module.exports = {adminAuth, userAuth};