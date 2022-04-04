// third party server
const express = require('express');
// third party middleware
const morgan = require('morgan');
// for connecting db
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');



// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://netyodha:test1234@blogyo.ur2zh.mongodb.net/Blog-yodha?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

// View engine
app.set('view engine', 'ejs');




// //my middleware
// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// });




// middleware & static files
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}))

// third party middleware
app.use(morgan('dev'));




// // mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });
//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// });

// app.get('/all-blog', (req, res) => {
//     Blog.find()
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// })

// app.get('/single-blog', (req, res) => {
//     Blog.findById('6238aa223f1825281a72f3c0')
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// })






app.get('/', (req, res) => {
    // res.send('<p>home page</p>');
    // const blogs = [
    //     {title: 'Ramaji defeated Ravana', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam dolore temporibus architecto modi aut. Nisi incidunt praesentium sunt modi tenetur! Beatae sed repudiandae quo qui cumque aliquid illo, exercitationem delectus.'},
    //     {title: 'Arjuna defeated duryodhan', snippet: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, voluptatibus. Vel odio est itaque esse minus saepe sequi assumenda aperiam fugiat error, iste dolore pariatur quibusdam sunt, dolorem in similique.'},
    //     {title: 'Pandavs wins mahabharata', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio veniam molestiae nesciunt necessitatibus officiis aperiam beatae reiciendis maxime dolores aliquam? Incidunt officiis labore vitae beatae tempora reprehenderit. Pariatur, quidem necessitatibus.'},
    // ]
    // res.render('index', {title : 'Home', blogs});

    res.redirect('/blogs');
});


app.get('/about', (req, res) => {
    // res.send('<p>home page</p>');
    res.render('about', {title : 'About'});
});




// // redirects
// app.get('/about-us', (req,res) => {
//     res.redirect('/about');
// });

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title : '404 - Not found'});
});