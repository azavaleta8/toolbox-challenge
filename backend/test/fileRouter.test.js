const request = require('supertest');
const chai = require('chai');
const createApp = require('../src/config/app');
const fileService = require('../src/services/fileService');

const { expect } = chai;

describe('API Endpoints', () => {
	let app;
	const originalGetProcessedFilesData = fileService.getProcessedFilesData;

	before(() => {
		app = createApp();
	});

	after(() => {
		fileService.getProcessedFilesData = originalGetProcessedFilesData;
	});

	describe('GET /api/files/data', () => {
		it('should return processed files data', async () => {
			const mockData = [
				{
					file: 'file1.csv',
					lines: [
						{ text: 'RgTya', number: 64075909, hex: '70ad29aacf0b690b0467fe2b2767f765' },
					],
				},
			];

			// Mock the fileService method
			fileService.getProcessedFilesData = async () => mockData;

			const response = await request(app)
				.get('/api/files/data')
				.expect('Content-Type', /json/)
				.expect(200);

			expect(response.body).to.deep.equal(mockData);
		});

		it('should handle errors', async () => {
			// Mock the fileService method to throw an error
			fileService.getProcessedFilesData = async () => {
				throw new Error('Service error');
			};

			const response = await request(app)
				.get('/api/files/data')
				.expect('Content-Type', /json/)
				.expect(500);

			expect(response.body).to.deep.equal({ error: 'Internal server error' });
		});

		it('should accept fileName query parameter', async () => {
			const mockData = [
				{
					file: 'file1.csv',
					lines: [
						{ text: 'RgTya', number: 64075909, hex: '70ad29aacf0b690b0467fe2b2767f765' },
					],
				},
			];

			let passedFileName;
			fileService.getProcessedFilesData = async (fileName) => {
				passedFileName = fileName;
				return mockData;
			};

			await request(app)
				.get('/api/files/data?fileName=file1.csv')
				.expect(200);

			expect(passedFileName).to.equal('file1.csv');
		});
	});

	describe('GET /api/files/list', () => {
		it('should return list of files', async () => {
			const mockFiles = ['file1.csv', 'file2.csv'];

			// Mock the fileService method
			fileService.getFilesList = async () => mockFiles;

			const response = await request(app)
				.get('/api/files/list')
				.expect('Content-Type', /json/)
				.expect(200);

			expect(response.body).to.deep.equal({ files: mockFiles });
		});

		it('should handle errors', async () => {
			// Mock the fileService method to throw an error
			fileService.getFilesList = async () => {
				throw new Error('Service error');
			};

			const response = await request(app)
				.get('/api/files/list')
				.expect('Content-Type', /json/)
				.expect(500);

			expect(response.body).to.deep.equal({ error: 'Internal server error' });
		});
	});
});
