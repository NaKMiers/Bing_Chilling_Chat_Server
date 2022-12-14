const authRouter = require('./authRoute')
const userRouter = require('./userRoute')
const roomRouter = require('./roomRoute')
const messageRouter = require('./messageRoute')
const uploadRouter = require('./uploadRoute')

const AuthMiddleware = require('../app/middlewares/AuthMiddleware')

function routes(app) {
   app.use('/auth', authRouter)
   app.use('/users', AuthMiddleware, userRouter)
   app.use('/rooms', AuthMiddleware, roomRouter)
   app.use('/messages', AuthMiddleware, messageRouter)
   app.use('/uploads', AuthMiddleware, uploadRouter)

   app.use('/', (req, res) => {
      res.send('<h1>This is Home Page</h1>')
   })
}

module.exports = routes
