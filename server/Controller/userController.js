const userModel = require("../Model/userModel");

//function to  Add a user to the database
exports.addUser = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  try {
    // Trying to get all the emails from the database
    const getEmails = await userModel.findAll({
      attributes: ["email"],
    });

    // Checking if the incoming email already exists in the database
    const isEmailExist = getEmails.some(
      (userEmail) => userEmail.email === email
    );

    if (isEmailExist) {
      return res.status(400).json("Email already exists");
    } else {

      // If the email doesn't exist in the database, create a new user
      await userModel.create({
        username: name,
        email: email,
        password: password,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }

  res.json("User added successfully");
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

    if (isEmailExist) {
      // If the email exists, retrieve the user by email
      const getUser = await userModel.findOne({ where: { email: useremail } });
      if (getUser.password === userPassword) {
        return res.json("Successfully logged in");
      } else {
        return res.json("Incorrect password");
      }
    } else {
      return res.status(404).json("User not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};
