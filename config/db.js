const mongoose = require("mongoose");

const url = `mongodb+srv://${process.env.mongoose_username}:${process.env.mongoose_password}@cluster0.hdca1.mongodb.net/${process.env.mongoose_database}?retryWrites=true&w=majority&appName=Cluster0`;
mongoose
  .connect(url)
  .then(() => {
    console.log("succefully connect to the database ");
  })
  .catch((err) => {
    console.log("Error recived =>", err);
  });

module.exports = mongoose;
