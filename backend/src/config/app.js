const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swagger');
const { notFoundMiddleware, errorHandlerMiddleware } = require('../middlewares/errorHandle');
const { apiLimiter } = require('./rateLimit');

const healthCheckRouter = require('../routes/healthCheckRouter');

const createApp = () => {
	const app = express();

	// Middleware
	app.use(express.json());
	app.use(morgan('dev'));
	app.use(cors());
	app.use(apiLimiter);

	// Swagger Config
	const swaggerDocs = swaggerJsDoc(swaggerOptions);
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

	// Routes
	app.use('/api', healthCheckRouter);

	// Root route
	app.get('/', (req, res) => {
		res.json({ message: 'Toolbox Challenge API is running' });
	});

	// Error handling middlewares
	app.use(notFoundMiddleware);
	app.use(errorHandlerMiddleware);

	return app;
};

module.exports = createApp;
