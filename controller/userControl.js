const mongoose = require("../config/db.js");
const usreSchma = require("../dbschema/user.js");
const { use } = require("../Route/userRutes.js");
exports.home = async (req, res) => {
  if (req.url == "/") {
    const User = await mongoose.model("User", usreSchma);
    const data = await User.find();
    res.send({ status: 200, message: "datarecived", data });
  }
};

exports.insertData = async (req, res) => {
  const { name, age } = req.body;
  if (name != "" && age) {
    const User = await mongoose.model("User", usreSchma);
    await User.insertMany([{ name, age }])
      .then(() => {
        res.send({
          status: 200,
          message: "data acess ",
          name,
          age,
        });
      })
      .catch(() => {
        res.send({
          status: 400,
          message: "data can not insert ",
        });
      });
  } else {
    res.send({
      status: 400,
      message: "data can not acess",
    });
  }
};

exports.deleteData = async (req, res) => {
  const { name } = req.body;
  console.log("name", name);
  if (name != "") {
    const User = await mongoose.model("User", usreSchma);
    const data = await User.find({ name: name });
    console.log("data ", data);
    if (data.length > 0) {
      User.deleteOne({ name })
        .then(() => {
          res.status(200).send({ message: "data deleted" });
        })
        .catch((err) => {
          res.status(400).send({ message: "data can not delete => " + err });
        });
    } else {
      res.status(400).send({ message: "data can not acess" });
    }
  }
};

exports.updateData = async (req, res) => {
  const user = await mongoose.model("User", usreSchma);
  const { name, newname } = req.body;
  const data = await user.find({ name });
  if (data.length > 0) {
    await user
      .updateOne({ name: name }, { $set: { name: newname } })
      .then(() => {
        res.status(200).send({ message: "data updated " });
      })
      .catch(() => {
        res.status(400).send({ message: "data will not update =>  " + err });
      });
  } else {
    res.status(400).send({ message: "data not find " });
  }
};

exports.putUpdateData = async (req, res) => {
  try {
    const User = await mongoose.model("User", usreSchma);
    const { name, newname, age, newage } = req.body;
    const data = await User.find({ name, age });
    if (data.length > 0) {
      const id = data[0]._id;
      const updateuser = await User.findByIdAndUpdate(
        id,
        { name: newname, age: newage },
        { new: true, runValidators: true }
      );

      if (!updateuser) {
        res.status(404).send({ message: "User not found" });
      }

      res.status(200).send(updateuser);
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
};
