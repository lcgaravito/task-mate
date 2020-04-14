const usersCtrl = {};

const mu = require("../db/MongoUtils");

usersCtrl.getUsers = (req, res) => {
  mu.getUsers().then((users) => {
    console.log(users);
    res.json(users);
  });
};

usersCtrl.createUser = async (req, res) => {
  console.log("params", req.body);
  const username = { username: req.body };
  mu.createUser(username).then(res.json({ message: "User Saved" }));
};

usersCtrl.deleteUser = (req, res) => {
  mu.deleteUser(req.params.id);
  res.json({ message: "User Deleted" });
};

module.exports = usersCtrl;
