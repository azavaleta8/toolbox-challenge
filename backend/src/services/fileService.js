const axios = require('axios');

const API_BASE_URL = 'https://echo-serv.tbxnet.com/v1/secret';
const API_KEY = process.env.API_KEY || 'aSuperSecretKey';

exports.getFilesList = async () => {
	const response = await axios.get(`${API_BASE_URL}/files`, {
		headers: {
			authorization: `Bearer ${API_KEY}`,
		},
	});
	return response.data.files;
};

exports.getFileContent = async (fileName) => {
	const response = await axios.get(`${API_BASE_URL}/file/${fileName}`, {
		headers: {
			authorization: `Bearer ${API_KEY}`,
		},
	});
	return response.data;
};

exports.processCSVContent = (content) => {
	const lines = content.split('\n');
	const header = lines[0].split(',');
	const processedLines = [];
	const valuesNotNull = ((values) => {
		return (values[0] && values[1] && values[2] && values[3] ? true : false)
	})

	for (let i = 1; i < lines.length; i += 1) {
		const values = lines[i].split(',');
		if (values.length === header.length && valuesNotNull(values)) {
			processedLines.push({
				text: values[1],
				number: parseInt(values[2], 10),
				hex: values[3],
			});
		}
	}

	return processedLines;
};

exports.getProcessedFilesData = async (fileName) => {
	const files = fileName ? [fileName] : await this.getFilesList();
	const processedData = [];
	await Promise.all(files.map(async (file) => {
		try {
			const content = await this.getFileContent(file);
			const lines = this.processCSVContent(content);
			if (lines.length > 0) {
				processedData.push({ file, lines });
			}
		} catch (error) {
			console.error(`Error processing file ${file}:`, error.message);
		}
	}));

	return processedData;
};
