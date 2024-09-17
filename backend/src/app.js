const express = require('express')
const  cors = require('cors')
const app = express()

app.set('port', process.env.PORT || 4000)

//middelewares
app.use(cors())
app.use(express.json())

//rutas

app.get('/', (req, res)=>{
    res.send('bienvenido a mi api rest full')
})


//ruta para nuestra api
app.use('/api/usuarios', require('./routes/usuario'))

module.exports = app;