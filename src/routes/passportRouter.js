const express = require("express");
const router = express.Router();
const passport = require("passport");

// Define routes.


router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/');
        });
    })(req, res, next);
});

router.get("/logout", function(req, res) {
    req.logout();
    res.json({ ok: true });
});

router.get("/getUser", (req, res) => {
    return res.json(req.user || null);
});

router.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res) {
        res.json({ user: req.user });
    });

module.exports = router;