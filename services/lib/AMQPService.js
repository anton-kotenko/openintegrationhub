const amqp = require('amqplib');
class AMQPService {
    constructor (app) {
        this._app = app;
    }

    async start() {
        const logger = this._app.getLogger();
        const amqpUri = this._app.getConfig().get('RABBITMQ_URI');
        let counter = 0;
        while (counter < 100) {
            counter++;
            logger.info({amqpUri}, 'Going to connect to amqp');
            try {
                this._conn = await Promise.race([
                    amqp.connect(amqpUri),
                    new Promise((res, rej) => setTimeout(rej.bind(null, new Error('Timeout')), 1000))
                ]);
                return;
            } catch (e) {
                logger.error(e, 'Failed to connect to Rabbitmq, retry in 1sec');
                await new Promise(res => setTimeout(res, 1000));
            }
        }
        logger.error('Give up connecting to rabbitmq');
        throw new Error('can not connect to rabbitmq');
    }
    async stop() {
        throw new Error('implement me'); 
    }

    getConnection () {
        return this._conn; 
    }

}
module.exports = AMQPService;
