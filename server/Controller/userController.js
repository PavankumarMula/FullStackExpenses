const userModel = require("../Model/userModel");

//adding user into dataBase
exports.addUser = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  try {

    // trying to get all the emails from database
    const getEmails = await userModel.findAll({
      attributes: ["email"],
    });

    // find out if the incoming email is already exists in the db.
    const isEmailExist = getEmails.some(
      (userEmail) => userEmail.email === email
    );

    if (isEmailExist) {
      return res.status(400).json("Email already exists");
    } else {
      // if email is not exist in the db create One
      await userModel.create({
        username: name,
        email: email,
        password: password,
      });
    }
  } catch (error) {
    console.log(error);
  }

  res.json(" user added sucessfully");
};


// get the user details based incoming input from form data
exports.getuser=(req,res)=>{
    res.json('will build this logic')
}
