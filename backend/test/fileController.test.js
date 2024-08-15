const chai = require('chai');
const fileController = require('../src/controllers/fileController');
const fileService = require('../src/services/fileService');

const { expect } = chai;

describe('File Controller', () => {
	let req; let
		res;

	beforeEach(() => {
		req = { query: {} };
		res = {
			json: (data) => {
				res.jsonData = data;
				return res;
			},
			status: (code) => {
				res.statusCode = code;
				return res;
			},
		};
	});

	describe('getFilesData', () => {
		it('should return processed files data', async () => {
			const mockData = [{ file: 'file1.csv', lines: [{ text: 'RgTya', number: 64075909, hex: '70ad29aacf0b690b0467fe2b2767f765' }] }];
			fileService.getProcessedFilesData = async () => mockData;

			await fileController.getFilesData(req, res);

			expect(res.jsonData).to.deep.equal(mockData);
		});

		it('should handle errors', async () => {
			fileService.getProcessedFilesData = async () => { throw new Error('Service error'); };

			await fileController.getFilesData(req, res);

			expect(res.statusCode).to.equal(500);
			expect(res.jsonData).to.deep.equal({ error: 'Internal server error' });
		});

		it('should pass fileName to service if provided', async () => {
			req.query.fileName = 'file1.csv';
			let passedFileName;
			fileService.getProcessedFilesData = async (fileName) => {
				passedFileName = fileName;
				return [];
			};

			await fileController.getFilesData(req, res);

			expect(passedFileName).to.equal('file1.csv');
		});
	});

	describe('getFilesList', () => {
		it('should return list of files', async () => {
			const mockFiles = ['file1.csv', 'file2.csv'];
			fileService.getFilesList = async () => mockFiles;

			await fileController.getFilesList(req, res);

			expect(res.jsonData).to.deep.equal({ files: mockFiles });
		});

		it('should handle errors', async () => {
			fileService.getFilesList = async () => { throw new Error('Service error'); };

			await fileController.getFilesList(req, res);

			expect(res.statusCode).to.equal(500);
			expect(res.jsonData).to.deep.equal({ error: 'Internal server error' });
		});
	});
});
