const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Se ha conectado a la Base de datos MONGODB.");
    
  })
  .catch(err => {
    console.error("Error de conexion", err);
    process.exit();
  });


app.get("/", (req, res) => {
  res.json({ message: "Parcial PW." });
});


require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`El servidor esta corriendoe en el puerto ${PORT}.`);
});


