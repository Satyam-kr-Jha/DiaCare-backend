const express = require("express");
const { signup, login, logout,} = require("../controllers/authController");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post('/logout', logout)
router.get("/me", isLoggedIn, (req, res) => {
  res.json({
    id: req.user.id,
    fullname: req.user.fullname,
    role: req.user.role,
  });
});
module.exports = router;