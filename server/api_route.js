var express = require('express');
var router = express.Router();

var sendEmailctrl = require('./mail_controller');

router.post('/sendmail', sendEmailctrl.sendMail);

module.exports = router;