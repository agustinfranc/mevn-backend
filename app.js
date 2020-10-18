// https://expressjs.com/es/starter/hello-world.html

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import history from 'connect-history-api-fallback'

const app = express()
const port = 8000

app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rutas
/* app.get('/', (req, res) => {
    res.send('Hello World')
}) */

// Middleware para Vue.js router modo history
// https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
app.use(history())
app.use(express.static(path.join(__dirname, 'public')))

app.set('port', process.env.PORT || port)

app.listen(app.get('port'), () => {
    console.log(`Example app listening at http://localhost:${app.get('port')}`)
})