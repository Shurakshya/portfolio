
/* for nodemoailer login confirmation */
var nodemailer = require('nodemailer');
var moment = require('moment');

//send response
var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

/* Send email */
// module.exports.sendMail = function(req, res) {
// 	// console.log(req);
// 	var transporter = nodemailer.createTransport({
// 		service : "gmail",
// 		auth: {
// 			user: process.env.USER_SECRET, //  email here
// 			pass: process.env.EMAIL_SECRET // password here
// 		}
// 	});
// 	var sendTo="kharel.shurakshya@gmail.com";

// 	var mailOptions = {
// 		from: req.body.email, // sender address
// 		to : sendTo, //neupanesushant6@gmail.com
// 		subject: 'feedback by '+req.body.name, // Subject line
// 		html: "<h3>This feedback was sent by : </h3>Email : "+req.body.email+"<br><br>"+req.body.comment+"<br><br>sent at : "+Date()
// 			// html or text
// 	};

// 	transporter.sendMail(mailOptions, function(err, info) {
// 		if (err) {
// 			sendJSONresponse(res,400,err);
// 			return;
// 		} else if (!info) {
// 			sendJSONresponse(res, 404, {
// 				"message": "email not found."
// 			});
// 			return;
// 		} else {
// 			console.log('Message sent: ' + info);
// 			sendJSONresponse(res, 200, info);

// 		}
// 	});
// };


	module.exports.sendMail = function(req, res) {
		var transporter = nodemailer.createTransport({
			host: 'smtp.metropolia.fi',
			port: 587,
			secure: false, // secure:true for port 465, secure:false for port 587
			auth: {
				user: 'shuraksk',
				pass: process.env.EMAIL_SECRET 
			}
		});
		var sendTo="kharel.shurakshya@gmail.com";
		
		var mailOptions = {
			from: 'shurakshya.kharel@metropolia.fi', // sender address
			to : sendTo, 
			subject: 'feedback by '+req.body.name, // Subject line
			html: "<h3>This feedback was sent by : </h3>Email : "+req.body.email+"<br><br>"+req.body.comment+"<br><br>sent at : "+Date()
			// html or text
			};


		transporter.sendMail(mailOptions, function(err, info) {
			if (err) {
				console.log(err);
				sendJSONresponse(res, 400, err);
				return;
			} else if (!info) {
				sendJSONresponse(res, 404, {
				"message": "email not found."
				});
				return;
			} else {
				console.log('Message sent: ' + info);
				sendJSONresponse(res, 200, info);
			}
		});
	};