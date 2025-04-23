import express from 'express';
import superheroRouter from './superheroRouter.mjs';
import authRouter from './authRouter.mjs';

const router = express.Router();

router.use('/superheros', superheroRouter);
router.use('/auth', authRouter);

export default router;
// const express = require('express');
// const router = express.Router();
// const superheroRouter = require('./superheroRouter');
// const authRouter = require('./authRouter');

// router.use('/superheros', superheroRouter);
// router.use('/auth', authRouter);

// module.exports = router;