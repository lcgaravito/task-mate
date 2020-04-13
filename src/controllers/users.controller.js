const usersCtrl = {};

const UserModel = require("../models/User");

usersCtrl.getUsers = (req, res) => {
    UserModel.find((err, users) => {
        res.json(users);
    });
};

usersCtrl.createUser = async(req, res) => {
    const { username } = req.body;
    const newUser = new UserModel({
        username,
    });
    try {
        await newUser.save();
        res.json({ message: "User Saved" });
    } catch (err) {
        res.json({ message: err.errmsg || "Error" });
    }
};

usersCtrl.deleteUser = (req, res) => {
    UserModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            res.json({ message: err });
        } else {
            res.json({ message: "User Deleted" });
        }
    });
};

module.exports = usersCtrl;