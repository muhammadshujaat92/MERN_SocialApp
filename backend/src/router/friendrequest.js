const express = require("express");
const router = express.Router();

const req = require("../controller/friendrequest");

router.get('/',req.getAllReq);
router.post('/', req.newReq);
router.get('/:id',req.specificReq);
router.get('/friends/:id',req.getAllFriends);
router.patch('/:id',req.updtReq);
router.delete('/:id',req.delReq);

module.exports = router;