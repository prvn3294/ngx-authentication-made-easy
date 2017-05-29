var express = require('express');
var router = express.Router();

var jwt    = require('jsonwebtoken');     
var User   = require('../model/user');  
var passwordHash = require('password-hash');

router.post('/signin', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (! passwordHash.verify( req.body.password , user.password)) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        var token = jwt.sign(user, req.app.get('superSecret'), {
          expiresIn: '1h'
        });
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   
    }
  });
});


router.post('/signup', function(req , res){
var user = new User({ 
    email: req.body.email, 
    password: req.body.password,
    confirm : false
  });
  user.save(function(err) {
    if (err) throw err;
    console.log('User saved successfully');
    res.json({ success: true });
  });
})

module.exports = router;
