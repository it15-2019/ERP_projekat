const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");


//REGISTER
router.post("/register", 
  [
    check("email", "Invalid email!").isEmail(),
    check("password", "Password must be at least 6 character long!").isLength({
      min: 6,
    })
  ],
  async (req, res) => {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString()
    });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try 
    {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } 
    catch (err) 
    {
      res.status(500).json(err);
    }
});


//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong username!");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password && res.status(401).json("Wrong password!");
    
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      {expiresIn:"3d"}
    );

    const { password, ...others } = user._doc;
    

    res.status(200).json({...others, accessToken});
  } 
  catch (err) 
  {
    res.status(500).json(err);
  }
});

//LOGOUT
router.get("/logout", async (req, res) => {
  try 
  {
    const user = await User.findOne();
    !user && res.status(401).json("Nobody is registed!");

    const accessToken = null;
    const { password, ...others } = user._doc;
  
    res.status(200).send("User is logged out.");
  } 
  catch (err) 
  {
    res.status(500).json(err);
  }
});


module.exports = router;
