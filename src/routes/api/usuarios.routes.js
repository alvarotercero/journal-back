//URL BASE: /api/usuarios

const express = require('express');
const enrutador = express.Router();
const { getUsuarios, registrarUsuario, actualizarUsuario, eliminarUsuario, getUsuarioPorId } = require("../../controllers/usuarios.controller.js");


enrutador.get("/", getUsuarios);
enrutador.get("/:id", getUsuarioPorId);

enrutador.post("/", registrarUsuario);

enrutador.put("/:id", actualizarUsuario);

enrutador.delete("/:id", eliminarUsuario);

module.exports = enrutador;