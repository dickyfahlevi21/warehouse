const express = require('express');
const router = express.Router();
const verify = require('../middleware/verifyToken')

router.get('/', verify, (req, res) => {
    res.send('Hello this is index from routes!')
})

module.exports = router;