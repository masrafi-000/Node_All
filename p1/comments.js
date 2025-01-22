// app.set('view engine', 'ejs');

// const admin = express();

// const router = express.Router({
//     caseSensitive: true,
// });

// app.use(router);

// app.use(express.static(`${__dirname}/public/`, { index: 'home.html' }));

// router.get('/', (req, res) => {
//     res.send('This is home page');
// });

// router.get('/about', (req, res) => {
//     res.send('This is about page');
// });

// app.post('/', (req, res) => {
//     res.send('This is home page with post request');
// });

// admin.on('mount', (parent) => {
//     console.log('Admin Mounted!');
//     console.log(parent);
// });

// admin.get('/dashboard', (req, res) => {
//     console.log(admin.mountpath);

//     res.send('Welcome to admin dashboard!');
// });

// app.use('/admin', admin);

// app.get('/', (req, res) => {
//     res.send('Welcome to application home!');
// });

// app.param('id', (req, res, next, id) => {
//     const user = {
//         userid: id,
//         name: 'Bangladesh',
//     };
//     req.userDetails = user;
//     next();
// });

// app.get('/user/:id', (req, res) => {
//     console.log(req.userDetails);

//     res.send('Welcome to application home!');
// });

// app.route('/about/mission')
//     .get((req, res) => {
//         res.send('Welcome to application about get!');
//     })
//     .post((req, res) => {
//         res.send('Welcome to application about post!');
//     })
//     .put((req, res) => {
//         res.send('Welcome to application about put!');
//     });

// app.route('/about/mission')
//     .get((req, res) => {
//         res.render('pages/about');
//     })
//     .post((req, res) => {
//         res.send('Welcome to application about post!');
//     })
//     .put((req, res) => {
//         res.send('Welcome to application about put!');
//     });
