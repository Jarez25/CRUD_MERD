const UsuarioCtrl = {}

const Usuario = require('../models/Usuario')  // "require" corregido

UsuarioCtrl.getUsu = async (req, res) => {
    const usuarios = await Usuario.find()
    res.json(usuarios)
}

UsuarioCtrl.createUsu = async (req, res) => {
    const { nombre, apellido, correo, telefono, edad } = req.body;  // "telefono" corregido
    const newUsu = new Usuario({
        nombre,
        apellido,
        correo,
        telefono,  // "telefono" corregido
        edad
    })
    await newUsu.save();
    res.json({ message: 'El usuario ha sido creado' })  // "ha sido" corregido
}

UsuarioCtrl.getUsuario = async (req, res) => {
    const usuario = await Usuario.findById(req.params.id)
    res.json(usuario)
}

UsuarioCtrl.deleteUsu = async (req, res) => {
    await Usuario.findByIdAndDelete(req.params.id)
    res.json({ message: 'El usuario ha sido eliminado' })  // "ha sido" corregido
}

UsuarioCtrl.updateUsu = async (req, res) => {  // Método separado para actualización
    const { nombre, apellido, correo, telefono, edad } = req.body;  // "telefono" corregido
    await Usuario.findByIdAndUpdate(req.params.id, {  // "req.params.id" corregido
        nombre,
        apellido,
        correo,
        telefono,  // "telefono" corregido
        edad
    })
    res.json({ message: 'El usuario ha sido actualizado' })  // "ha sido" corregido
}

module.exports = UsuarioCtrl
