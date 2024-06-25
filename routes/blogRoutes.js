const express = require('express');
const router = express.Router();
const controller = require('../controllers/blogController')

router.get('/', controller.blog_index);
  
router.post('/', controller.blog_create_post);
  
// Route to get a specific blog by ID
router.get('/:id', controller.blog_details);
  
router.delete('/:id', controller.blog_delete );

  module.exports = router;