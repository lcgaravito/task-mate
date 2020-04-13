const { Router } = require("express");
const router = Router();

//const { getUsers, createUser, deleteUser } = require('../controllers/users.controller');
const { getUsers, createUser, deleteUser } = require("../db/MongoUtils");

router.route("/").get(getUsers).post(createUser);
router.route("/:id").delete(deleteUser);

module.exports = router;
