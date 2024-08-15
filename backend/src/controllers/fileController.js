const fileService = require('../services/fileService');

exports.getFilesData = async (req, res) => {
	try {
		const { fileName } = req.query; // Optional query parameter
		const data = await fileService.getProcessedFilesData(fileName);
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};

exports.getFilesList = async (req, res) => {
	try {
		const files = await fileService.getFilesList();
		res.json({ files });
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};
