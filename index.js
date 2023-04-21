const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.post("/formulario", (req, res) => {
  console.log(req.body);
  const { id, nombre, apellido, titulo, autor, editorial, año } = req.body;

  if (!id || !nombre || !apellido || !titulo || !autor || !editorial || !año)
    return res.redirect("/error.html");

  const filename = "id_123.txt";

  //Crear el archivo de texto con la información enviada
  const data = `${id} - ${nombre} - ${apellido} - ${titulo} - ${autor} - ${editorial} - ${año}`;
  fs.writeFile(`./public/datos${filename}`, data, (err) => {
    if (err) throw err;
    console.log(`Archivo ${filename} creado.`);
    //Enviar el archivo al usuario para descargar
    const file = path.join(__dirname, `./public/datos${filename}`);
    res.download(file, filename, (err) => {
      if (err) throw err;
      console.log(`Archivo ${filename} descargado.`);
    });
  });
});

app.get("/", (req, res) => {
  res.send("Hola desde express");
});

app.listen(port, () => {
  console.log(`app funcionando en puerto: ${port}`);
});
