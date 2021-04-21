exports.allAccess = (req, res) => {
  res.status(200).send("Este contenido es Publico.");
};


exports.userBoard = (req, res) => {
  res.status(200).send("Contenido para Usuarios Registrados");
};


