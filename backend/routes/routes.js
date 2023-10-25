const router=require("express").Router();
const jwt=require("jsonwebtoken");
const secretKey = 'secret-key'

//user verification as middleware
const verifyToken = (req, res, next) => {
  //validate user with token
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = decoded.user; // Attach the decoded user data to the request object for later use
    next();
  });
};


router.post('/login',(req,res)=>{
  //firstly we have to do validation of user

  //create jwt token
  const user = req.body;
  const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour

  //send token to client
  res.status(200).send({token})
})


router.get('/logout',verifyToken,(req,res)=>{
  //in front end remove token from local storage
  if(!req.user){
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.status(200).send("success")
})


router.get('/home',verifyToken,(req,res)=>{
  if(!req.user){
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.status(200).json({ message: 'This is a protected route!', user: req.user });
})


module.exports = router;