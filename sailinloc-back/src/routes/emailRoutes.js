const express = require('express');
const {  handleSendEmail } = require ('../controllers/emailController');


const router = express.Router();

router.post("/send-email", handleSendEmail);

module.exports = router;
