const userModel = require("../Model/userModel");
const bcrypt = require("bcrypt");

//function to  Add a new  user to the database
exports.addUser = async (req, res) => {
  const username = req.body.name;
  const useremail = req.body.email.toLowerCase();
  const userpassword = req.body.password;

  try {
    // Trying to get all the emails from the database
    const getEmails = await userModel.findAll({
      attributes: ["email"],
    });

    // Checking if the incoming email already exists in the database
    const isEmailExist = getEmails.some(
      (userEmail) => userEmail.email === useremail
    );

    if (isEmailExist) {
      return res.status(400).json("Email already exists");
    } else {
      // decrypting the password before  comitting into databse
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(userpassword, salt);

      //If the email doesn't exist in the database, create a new user
      await userModel.create({
        username: username,
        email: useremail,
        password: hashPassword,
      });
    }
    return res.json('user added sucessfully');
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

//function to Retrieve user details based on incoming input from form data
exports.getuser = async (req, res) => {
  // Extract incoming data from user input form
  const useremail = req.body.email.toLowerCase();
  const userPassword = req.body.password;

  try {
    // Fetching all the emails from the database
    const allEmailsArray = await userModel.findAll({
      attributes: ["email"],
    });

    // Checking if the incoming email exists
    const isEmailExist = allEmailsArray.some(
      (emailObj) => emailObj.email === useremail
    );

    // If the email exists, retrieve the user by email
    if (isEmailExist) {
      const getUser = await userModel.findOne({ where: { email: useremail } });

      // comparing incoming password with hashed password in db
      const isPasswordValid = await bcrypt.compare(
        userPassword,
        getUser.password
      );
      if (isPasswordValid) return res.json("user logged in sucessfully");
      else return res.json("invalid password");
    } else {
      return res.status(404).json("User not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};
