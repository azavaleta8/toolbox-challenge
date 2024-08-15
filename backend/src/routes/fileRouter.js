const express = require('express');
const fileController = require('../controllers/fileController');

const fileRouter = express.Router();

/**
 * @swagger
 * /api/files/data:
 *   get:
 *     summary: Get processed file data
 *     parameters:
 *       - in: query
 *         name: fileName
 *         schema:
 *           type: string
 *         description: Optional file name to filter results
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   file:
 *                     type: string
 *                   lines:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         text:
 *                           type: string
 *                         number:
 *                           type: integer
 *                         hex:
 *                           type: string
 */
fileRouter.get('/data', fileController.getFilesData);

/**
 * @swagger
 * /api/files/list:
 *   get:
 *     summary: Get list of available files
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 files:
 *                   type: array
 *                   items:
 *                     type: string
 */
fileRouter.get('/list', fileController.getFilesList);

module.exports = fileRouter;
