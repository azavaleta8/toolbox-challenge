const chai = require('chai');
const fileService = require('../src/services/fileService');

const { expect } = chai;

describe('File Service', () => {
	describe('processCSVContent', () => {
		it('should process valid CSV content correctly', () => {
			const csvContent = `file,text,number,hex
file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765
file1.csv,AtjW,6,d33a8ca5d36d3106219f66f939774cf5`;

			const result = fileService.processCSVContent(csvContent);
			expect(result).to.deep.equal([
				{
					text: 'RgTya',
					number: 64075909,
					hex: '70ad29aacf0b690b0467fe2b2767f765',
				},
				{
					text: 'AtjW',
					number: 6,
					hex: 'd33a8ca5d36d3106219f66f939774cf5',
				},
			]);
		});

		// eslint-disable-next-line no-unused-expressions
		it('should handle empty CSV content', () => {
			const csvContent = 'file,text,number,hex';
			const result = fileService.processCSVContent(csvContent);
			expect(result).to.be.an('array').with.lengthOf(0);
		});

		it('should ignore invalid lines in CSV content', () => {
			const csvContent = `file,text,number,hex
file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765
invalid,line,with,too,many,columns
file1.csv,AtjW,6,d33a8ca5d36d3106219f66f939774cf5`;

			const result = fileService.processCSVContent(csvContent);
			expect(result).to.have.lengthOf(2);
		});
	});

	describe('getProcessedFilesData', () => {
		it('should process multiple files', async () => {
			// Mock the getFilesList and getFileContent methods
			fileService.getFilesList = async () => ['file1.csv', 'file2.csv'];
			fileService.getFileContent = async (fileName) => {
				if (fileName === 'file1.csv') {
					return 'file,text,number,hex\nfile1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765';
				}
				return 'file,text,number,hex\nfile2.csv,AtjW,6,d33a8ca5d36d3106219f66f939774cf5';
			};

			const result = await fileService.getProcessedFilesData();
			expect(result).to.deep.equal([
				{
					file: 'file1.csv',
					lines: [{ text: 'RgTya', number: 64075909, hex: '70ad29aacf0b690b0467fe2b2767f765' }],
				},
				{
					file: 'file2.csv',
					lines: [{ text: 'AtjW', number: 6, hex: 'd33a8ca5d36d3106219f66f939774cf5' }],
				},
			]);
		});

		it('should handle errors for individual files', async () => {
			fileService.getFilesList = async () => ['file1.csv', 'file2.csv'];
			fileService.getFileContent = async (fileName) => {
				if (fileName === 'file1.csv') {
					return 'file,text,number,hex\nfile1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765';
				}
				throw new Error('File not found');
			};

			const result = await fileService.getProcessedFilesData();
			expect(result).to.have.lengthOf(1);
			expect(result[0].file).to.equal('file1.csv');
		});

		it('should filter by fileName if provided', async () => {
			fileService.getFileContent = async () => 'file,text,number,hex\nfile1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765';

			const result = await fileService.getProcessedFilesData('file1.csv');
			expect(result).to.have.lengthOf(1);
			expect(result[0].file).to.equal('file1.csv');
		});
	});
});
