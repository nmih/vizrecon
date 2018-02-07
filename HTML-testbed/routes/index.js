const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');

router.get('/', (req, res, next) => {
    res.sendFile('index.html');
  });