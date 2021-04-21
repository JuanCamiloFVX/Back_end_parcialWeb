const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    nombre:req.body.nombre,
    apellido:req.body.apellido,
    dni:req.body.dni,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "Su registro ha ha sido exitoso!" });
        });
      };




exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
   
    .exec((err, user) => {
      if (err) {
          res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "Usuario no existente" });
      }


      var passwordIsValid = bcrypt.compareSync(
         req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Clave Incorrecta"
        });
      }


      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 
      });

      
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        apellido: user.apellido,
        nombre: user.nombre,
        dni: user.dni,
        accessToken: token
      });
    });
};
