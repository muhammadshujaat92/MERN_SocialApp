const express = require('express');
const router = express.Router();
const user = require("../controller/users")

router.get("/", user.serachUser);
router.get("/:id", user.getUser);
router.get("/friends/:id", user.getUserFriends);
router.patch("/:id/:friendId", user.addRemoveFriend);

module.exports = router;