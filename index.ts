import { FastifyServerOptions } from 'fastify'
const mongoose = require('mongoose');
import config from './src/config'
import buildApp from './src/app' 



const options : FastifyServerOptions = {
    logger :true 
}

const app = buildApp(options) ;

mongoose.connect(config.mongodb.uri , {
    useCreateIndex : true ,
    useNewUrlParser : true ,
    useUnifiedTopology : true 
})
mongoose.connection.on('error' , (error) => app.log.error(error))
mongoose.connection.once('open' , () => app.log.info('MongoDB has been connected !!!'))

app.listen(config.port)