const dotenv = require('dotenv');
const createApp = require('./src/config/app');

// ENV
dotenv.config();

// Mongoose Conf

// Variables de entorno
const NODE_ENV = process.env.NODE_ENV || 'dev';
const PORT = process.env.PORT || 3000;
const HOST = process.env.RENDER_EXTERNAL_URL || 'localhost';

// Funcion for starting the server
const startServer = async () => {
	try {
		const app = createApp();

		// Run Server
		app.listen(PORT, () => {
			if (NODE_ENV === 'production') {
				console.log(`Server (${NODE_ENV}) running on ${HOST}`);
				console.log(`Swagger docs are available at ${HOST}/api-docs`);
			} else {
				console.log(`Server (${NODE_ENV}) running on http://${HOST}:${PORT}`);
				console.log(`Swagger docs are available at http://${HOST}:${PORT}/api-docs`);
			}
		});
	} catch (error) {
		console.error('Error initializing the server:', error);
		process.exit(1);
	}
};

// Start Server
startServer();
