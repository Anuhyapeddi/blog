const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const blogRoutes = require('./routes/blogRoutes')
const controller = require('./controllers/blogController')
const path = require('path');
const { userRegisterValidate, userLoginValidate } = require('./utils/userValidation.js');
const ensureAuthenticated = require('./utils/auth.js');
require('dotenv').config();
require('./config/db.js');

const app = express()

const port = process.env.PORT || 8080;

// database connection is in db.js
//connect to mongodb
// const uri = "mongodb+srv://apeddi:abhi1993@anudb.thmowva.mongodb.net/?retryWrites=true&w=majority&appName=anudb";
// Connect to MongoDB using async/await
// async function connectToMongoDB() {
//     try {
//       await mongoose.connect(uri);
//       console.log('Connected to MongoDB');
//     } catch (err) {
//       console.error('Failed to connect to MongoDB:', err);
//     }
//   } 
// connectToMongoDB();


//register view engine

app.set('view engine', 'ejs')

//mongoose and mongo sandbox routes
// Route to add a new blog
// app.get('/addblog', async (req, res) => {
//   try {
//     const blog = await Blog.create({
//         title: 'testing-wait',
//         snippet: 'snippet',
//         body: 'sending data to db without await'
//     });    
//     // await blog.save();
//     res.send(blog);
// } catch (err) {
//     console.error('Error creating blog:', err);
//     res.status(500).send('Error creating blog');
// }
// });

//route to retrive all blogs
// app.get('/allblogs', async (req, res) => {
//   try {
//     const blogs = await Blog.find();
//     res.send(blogs);
//   } catch (err) {
//     console.error('Error retrieving blogs:', err);
//     res.status(500).send('Error retrieving blogs');
//   }
// });

//route to retirve single blog
// app.get('/singleblog', async (req, res) => {
//   try {
//     const id = await Blog.findById("66738820f26b651612aa3648");
//     res.send(id);
//   } catch(err){
//     console.error('error in retriving the single blog:', err);
//     res.status(500).send('error in retiving the single blog');
//   }
// });

//static middleware

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.redirect('/blogs')
});

app.get('/about', (req, res) => {
    res.render('about', { title : 'About'})
});

//blog route
app.use('/blogs', blogRoutes);

app.get('/create', controller.blog_create_get);

app.post('/signup', userRegisterValidate , controller.blog_signup)

app.get('/signup', (req, res) => {
  res.render('blogs/signup', { title : 'signup'})
});

app.post('/login', userLoginValidate , controller.blog_login)

app.get('/login', (req, res) => {
  res.render('blogs/login', { title : 'create a new blog'})
});

app.get('/users', ensureAuthenticated ,controller.get_users);

app.use((req, res)=>{
    res.status(404).render('404', { title : '404'})
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

