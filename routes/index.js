const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article_controller');

router.get('/article', articleController.viewAll);
router.get('/article/:title', articleController.view);
router.post('/article', articleController.createArticle);
router.put('/article/:title', articleController.udpate);
router.delete('/article', articleController.deleteAll);
router.delete('/article/:title', articleController.delete);

module.exports = router;