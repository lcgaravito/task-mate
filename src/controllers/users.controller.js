const usersCtrl = {};

const mu = require("../db/MongoUtils");

usersCtrl.getUsers = (req, res) => {
    mu.getUsers().then((users) => {
        res.json(users);
    });
};

usersCtrl.createUser = async(req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        displayName: req.body.displayName,
        emails: req.body.emails,
    };
    mu.createUser(user).then(res.json({ message: "User Saved" }));
};

usersCtrl.deleteUser = (req, res) => {
    mu.deleteUser(req.params.id);
    res.json({ message: "User Deleted" });
};

module.exports = usersCtrl;