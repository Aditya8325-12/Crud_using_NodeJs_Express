const express = require("express");

const { home } = require("../controller/userControl.js");
const { updateData } = require("../controller/userControl.js");
const { insertData } = require("../controller/userControl.js");
const { deleteData } = require("../controller/userControl.js");
const { putUpdateData } = require("../controller/userControl.js");
const router = express.Router();
router.get("/", home);
router.patch("/updateData", updateData);
router.post("/insert", insertData);
router.post("/delete", deleteData);
router.put("/putupdate", putUpdateData);
module.exports = router;
