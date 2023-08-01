const Sib = require("sib-api-v3-sdk");
const client = Sib.ApiClient.instance;
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../DataBase/database");
const userModel = require("../Model/userModel");
const passwordModel = require("../Model/forgottenPasswords");
const bcrypt = require("bcrypt");

const sibKey=process.env.SIB_API_KEY;

exports.forgotPassword = async (req, res) => {
  console.log(req.body.email);

  const t = await sequelize.transaction();

  try {
    const user = await userModel.findOne({ where: { email: req.body.email } });

    if (user) {
      let id = uuidv4();
      await passwordModel.create(
        { id, isActive: true, userId: user.id },
        { transactions: t }
      );

      const apiKey = client.authentications["api-key"];
      apiKey.apiKey =sibKey

      const tranEmailApi = new Sib.TransactionalEmailsApi();

      const sender = {
        email: "m.pavankumar4537@gmail.com",
      };

      const reciever = [
        {
          email: req.body.email,
        },
      ];

      await tranEmailApi.sendTransacEmail({
        sender,
        to: reciever,
        subject: "hello",
        textContent: `http://localhost:3000/resetPassword/${id}`,
      });
      await t.commit();
      userIdForPassword = user.id;
      passwordId = id;
      res.send("Password Link sent Sucessfully");
    } else {
      throw new Error("user not found with the email id");
    }
  } catch (err) {
    await t.rollback();
    console.log(err);
    res.status(500).json(err);
  }
};


// reset the password
exports.resetPassword = async (req, res) => {
  const t = await sequelize.transaction();
  const id = req.params.id;
  const newPassword = req.body.password;

  try {
    const oldpassword = await passwordModel.findOne(
      { where: { id: id }, transaction: t } // Corrected transaction option
    );

    if (oldpassword) {
      await oldpassword.update({ isActive: false }, { transaction: t });
      const userId = oldpassword.userId;

      const user = await userModel.findByPk(userId);

      if (user) {
        // Encrypt the password using bcrypt
        const saltRounds = 10;
        const hash = await bcrypt.hash(newPassword, saltRounds);

        // Update the existing password
        await user.update({ password: hash }, { transaction: t });

        await t.commit(); // Commit the transaction after all updates are successful

        return res.status(200).json('Password is updated.');
      } else {
        await t.rollback(); // Rollback the transaction in case of errors
        return res.status(404).json('User not found.');
      }
    } else {
      await t.rollback(); // Rollback the transaction in case of errors
      return res.status(404).json('Password not found.');
    }
  } catch (error) {
    await t.rollback(); // Rollback the transaction in case of errors
    console.log(error);
    return res.status(500).json('Error resetting the password.');
  }
};

