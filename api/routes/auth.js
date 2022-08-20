const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


const handleErrors = (err) => {
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already in use';
    return errors;
  }

  // validation errors
  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}


//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    let user = await newUser.save();
    newUser.password = hashedPass
    user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    const errors = handleErrors(err); 
    res.status(500).json(errors);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if(!user){
      return res.status(400).json({customMessage: "Wrong credentials!"});
    }

    const validated = await bcrypt.compare(req.body.password, user.password);
    if(!validated){
      return res.status(400).json({customMessage: "Wrong credentials!"});
    }

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    const errors = handleErrors(err); 
    res.status(500).json(errors);
  }
});

module.exports = router;
