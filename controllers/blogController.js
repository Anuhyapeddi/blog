
const Blog = require('../models/blog');

// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = async (req, res) => {
    try{
        const allblogs = await Blog.find().sort({ createdAt: -1 })
        res.render('blogs/index', { title : 'All blogs', blogs : allblogs })
      } catch(err) {
        console.error('error in retriving all blogs: ', err)
        res.status(500).send('error in retriving all blogs')
      }
};

const blog_details = async (req, res) => {
    try {
        const id = req.params.id;
        const blog_id = await Blog.findById(id);
        res.render('blogs/details', { blog : blog_id, title : 'blog w id' });
    } catch (err) {
        console.error('Error retrieving single blog:', err);
        res.status(500).send('Error retrieving single blog');
    }
  };

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title : 'create a new blog'})
};

const blog_create_post =  async (req, res) => {
    try {
        const { title, snippet, body } = req.body;
  
        // Ensure all required fields are provided
        if (!title || !snippet || !body) {
            return res.status(400).send('Title, snippet, and body are required');
        }
  
        const blog = new Blog({ title, snippet, body });
        await blog.save();
        res.redirect('/blogs');
    } catch (err) {
        console.error('Error in creating the blog:', err);
        res.status(500).send('Error in creating a blog');
    }
};

const blog_delete = async (req, res) => {
    try {
      const id = req.params.id;
      const blog = await Blog.findByIdAndDelete(id);
      
      if (!blog) {
        return res.status(404).json.render({ error: 'Blog post not found' });
      }
      
      res.status(200).json({ redirect: '/blogs', blog });
  
    } catch (err) {
      console.error('Error in deleting the blog post:', err);
      res.status(500).json({ error: 'An error occurred while deleting the blog post' });
    }
  }


module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}