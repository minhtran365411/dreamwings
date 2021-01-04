//INSTALLING ALL PACKAGES

var express 				= require("express"),
	bodyParser 				= require("body-parser"),
	mongoose 				= require("mongoose"),
	methodOverride 			= require("method-override"),
	nodemailer				= require("nodemailer"),
	passport				= require("passport"),
	LocalStrategy			= require("passport-local"),
    expressValidator = require("express-validator"),
	passportLocalMongoose	= require("passport-local-mongoose");
require("dotenv").config();
const cors = require("cors");
const multiparty = require("multiparty");
const mailGun = require('nodemailer-mailgun-transport');

var cloudinary = require('cloudinary').v2;
const multer = require("multer");
const { CloudinaryStorage } = require('multer-storage-cloudinary');

var crypto = require('crypto')
var fs = require('fs');
var mime = require('mime');
const util = require("util");
const path = require("path");


//MODELS install

var Image = require("./models/image");
var Video = require("./models/video");
var Blog = require("./models/blog");
var User = require("./models/user");
var Album = require("./models/album");



var app = express();
// cors
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());





mongoose.connect('mongodb+srv://minhtran:Hotngong123@dreamwings.oyzpv.mongodb.net/dreamwingsenglish?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.set("view engine", "ejs");
app.locals.moment = require("moment");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Login as administrator only!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

// CLOUDINARY GALLERY STORAGE CONFIGURATION

cloudinary.config({ 
  cloud_name: 'dreamwingsenglish', 
  api_key: '827679218448917', 
  api_secret: '_yOXdIiN1c1Tp-22cCaLj4JlilA' 
});
//middleware

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "image",
		allowedFormats: ["jpg", "png"]
	 },
});

const parser = multer({ storage: storage });

const videoStorage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "video",
		resource_type: "video",
		source_types: ['mp4', 'webm', 'ogv']
	 },
});

const parserVideo = multer({ storage: videoStorage });

const blogImageStorage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "blogImage",
		allowedFormats: ["jpg", "png"]
	 },
});

const parserBlog = multer({ storage: blogImageStorage });

const albumImageStorage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "albumImage",
		allowedFormats: ["jpg", "png"]
	 },
});

const parserAlbum = multer({ storage: albumImageStorage });





//START ROUTES

//home page

app.get("/", function(req, res) {
	var currenturl = req.url;
	res.render("index", {url: currenturl});
});



// show register form
app.get("/register", function(req, res){
	var currenturl = req.url;
   res.render("register", {url: currenturl}); 
});

//handle sign up logic
app.post("/register", function(req, res){
	var currenturl = req.url;
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {url: currenturl});
        }
        passport.authenticate("local")(req, res, function(){
           console.log("Successfully Signed Up! Nice to meet you " + req.body.username);
           res.redirect("/"); 
        });
    });
});

//show login form

app.get("/login", function(req, res) {
	var currenturl = req.url;
	res.render("login", {url: currenturl});
});

//handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/");
});




//cac khoa hoc page

app.get("/cac-khoa-hoc", function(req, res) {
	var currenturl = req.url;
	res.render("caclop", {url: currenturl});
});



//cac khoa hoc page

app.get("/lich-thi", function(req, res) {
	var currenturl = req.url;
	res.render("lichthi", {url: currenturl});
});


//loiich page

app.get("/loi-ich-hoc-tieng-anh-som", function(req, res) {
	var currenturl = req.url;
	res.render("loiich", {url: currenturl});
});

//reading with tony page
app.get("/readingwithtony", function(req, res) {
	var currenturl = req.url;
	res.render("readingwithtony", {url: currenturl});
});

//reading with tony page
app.get("/phongvan/Thu", function(req, res) {
	var currenturl = req.url;
	res.render("phongvanThu", {url: currenturl});
});

//tiêu chí page
app.get("/tieu-chi-day-hoc-DWE", function(req, res) {
	var currenturl = req.url;
	res.render("tieuchidayhoc", {url: currenturl});
});


//tiếng anh tại nhà
app.get("/english-at-home", function(req, res) {
	var currenturl = req.url;
	res.render("tienganhtainha", {url: currenturl});
});

//PAGE hoat dong, memories hinh anh - from here

//new album

app.get("/albummoi", isLoggedIn, function(req, res) {
	var currenturl = req.url;
	res.render("albummoi", {url: currenturl});
});






//show idividual album

app.get("/hoat-dong-ki-niem/:id", function(req, res) {
	console.log(req.params.id);
	var currenturl = req.url;
	var curAlbum = mongoose.Types.ObjectId(req.params.id);
	
	//find the blog
	Album.findById(req.params.id, function(err, foundAlbum) {

		if(err) {
			console.log(err);
		} else {
			Image.find({album: curAlbum}, function(err, allImages){
		       if(err){
		           console.log(err);
		       } else {
		         res.render("showAlbum", {url: currenturl, album: foundAlbum, image: allImages});
		       }

		   	 });
			
		}
	})
	//pass in value
	//render
	
});




app.get("/hoat-dong-ki-niem-videos", function(req, res) {
	var currenturl = req.url;

//Get all images from DB
	 Video.find({}, function(err, allVideos){
       if(err){
           console.log(err);
       } else {
         res.render("hoatdong-video", {url: currenturl, videos: allVideos});
       }

   	 });



});


app.post("/hoat-dong-ki-niem-videos", parserVideo.array("video", 12), (req, res) => {
	for(let i = 0; i < req.files.length; i++) {
		console.log(req.files[i]) // to see what is returned to you

		const data = {
		  	videoURL:req.files[i].path
		  }
		  
		   Video.create(data, function(err, video) {
				if(err) {
					console.log(err);
				} else {
					video.save();
				}
			});
        }
      

     res.redirect('/hoat-dong-ki-niem-videos');
	
});

//PAGE hoat dong, memories hinh anh
app.get("/hoat-dong-ki-niem", function(req, res) {
	var currenturl = req.url;

//Get all images from DB
	 Album.find({}).sort({ createAt: 'desc' }).exec(function(err, allAlbums){
       if(err){
           console.log(err);
       } else {
         res.render("hoatdong", {url: currenturl, albums: allAlbums});

       }

   	 });

});

//create new album

app.post("/hoat-dong-ki-niem", isLoggedIn, parserAlbum.single("albumImage"), function(req, res) {
	var currenturl = req.url;
	// console.log(req.file);
	// console.log(req.body.blog);
		  
	Album.create({
		title: req.body.album.title,
		imageURL: req.file.path
	}, function(err, album) {
		if(err) {
			console.log(err);
		} else {
			album.save();
		}

	});
	res.redirect("/hoat-dong-ki-niem");
}) ;

app.post("/hoat-dong-ki-niem/:id", parser.array("image", 12), (req, res) => {
	for(let i = 0; i < req.files.length; i++) {
		console.log(req.files[i]) // to see what is returned to you
		var curAlbum = mongoose.Types.ObjectId(req.params.id);
		
		
		  
		  // const image = {};
		  // image.url = req.files[i].url;
		  // image.id = req.files[i].public_id;
		  const data = {
		  	imageURL:req.files[i].path,
		  	album: curAlbum
		  }
		  
		   Image.create(data, function(err, image) {
				if(err) {
					console.log(err);
				} else {
					image.save();
				}
			});
        }
      

     res.redirect(`/hoat-dong-ki-niem/${curAlbum}`);
	
});

//edit album

app.get("/hoat-dong-ki-niem/:id/edit", isLoggedIn, function(req, res) {
	var currenturl = req.url;
	//find the blog
	Album.findById(req.params.id, function(err, foundAlbum) {
		if(err) {
			console.log(err);
		} else {
			res.render("editAlbum", {url: currenturl, album: foundAlbum});
		}
	})
});

//put in newly edit album

app.put("/hoat-dong-ki-niem/:id", isLoggedIn, parserAlbum.single("albumImage"), function(req, res) {
	if(req.file) {
			Album.findByIdAndUpdate(req.params.id, {
			title: req.body.album.title,
			imageURL: req.file.path
		}, function(err, updatedAlbum) {
			if(err) {
				console.log(err);
			} else {
				res.redirect("/hoat-dong-ki-niem/"+req.params.id);
			}
		});
		} else {
					Album.findByIdAndUpdate(req.params.id, req.body.album, function(err, updatedAlbum) {
				if(err) {
					console.log(err);
				} else {
					res.redirect("/hoat-dong-ki-niem/"+req.params.id);
				}
			});
		}

	
});

//delete blog

app.delete("/hoat-dong-ki-niem/:id", isLoggedIn, function(req, res) {
	Album.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			console.log(err);
			console.log(req.params.id);
		} else {
			res.redirect("/hoat-dong-ki-niem");
		}
	});
});





//Page THONG TIN LIEN LAC

 


app.get("/thong-tin-lien-lac", function(req, res) {
	var currenturl = req.url;
	res.render("lienlac", {url: currenturl});
});


app.post("/thong-tin-lien-lac", function(req, res) {
	var currenturl = req.url;

	const auth = {
        auth: {
            api_key: '227OR7FW2SEJRJYF7BJV',
            domain: 'https://dreamwingsenglish.com/'
        }
    };

    const transporter = nodemailer.createTransport(mailGun(auth));

    const sendMail = (ten, email, sodienthoai, tinnhan, cb) => {
	    const mailOptions = {
	        name: ten,
	        email: email,
	        phone: sodienthoai,
	        to: 'dreamwingsenglish@email.com',
	        text: tinnhan
	    };

	    transporter.sendMail(mailOptions, function(err, data) {
	        if (err) {
	            console.log(err);
		    	console.log(mailOpts);
			      res.render('contact-failure', {url: currenturl}) // Show a page indicating failure
			      // window.alert('Gửi thư thất bại, xin thử lại sau hoặc liên hệ số điện thoại: 0903674268.');
	        } else {
	             // window.alert('Đã gửi thư thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.');
			    console.log(mailOpts);
			      res.render('contact-success', {url: currenturl}) // Show a page indicating success
			      
		        }
	    });
	}


  });
// });

//BLOG PAGE
app.get("/tintuc", function(req, res) {
	var perPage = 5;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
	var currenturl = req.url;
	// Get all blogs from DB
	
    // Blog.find({}, function(err, allBlogs){
    //    if(err){
    //        console.log(err);
    //    } else {
    //      res.render("blog", {url: currenturl, blogs: allBlogs});
    //    }

    // }).sort({ createAt: 'desc' });

    Blog.find({}).sort({ createAt: 'desc' }).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allBlogs) {
        Blog.count().exec(function (err, count) {
            if (err) {
                console.log(err);
            } else {
                res.render("tintuc", {
                	url: currenturl,
                    blogs: allBlogs,
                    current: pageNumber,
                    pages: Math.ceil(count / perPage)
                });
            }
        });
    });
	
});



//new blog

app.get("/tintuc/new", isLoggedIn, function(req, res) {
	var currenturl = req.url;
	res.render("newBlog", {url: currenturl});
});

//create new blog

app.post("/tintuc", isLoggedIn, parserBlog.single("blogImage"), function(req, res) {
	var currenturl = req.url;
	// console.log(req.file);
	// console.log(req.body.blog);
		  
	Blog.create({
		title: req.body.blog.title,
		lead: req.body.blog.lead,
		text: req.body.blog.text,
		imageURL: req.file.path
	}, function(err, blog) {
		if(err) {
			console.log(err);
		} else {
			blog.save();
		}

	});
	res.redirect("/tintuc");
}) ;

//show idividual blog

app.get("/tintuc/:id", function(req, res) {
	var currenturl = req.url;
	
	//find the blog
	Blog.findById(req.params.id, function(err, foundBlog) {

		if(err) {
			console.log(err);
		} else {
			res.render("showBlog", {url: currenturl, blog: foundBlog});
		}
	})
	//pass in value
	//render
	
});

//edit blog

app.get("/tintuc/:id/edit", isLoggedIn, function(req, res) {
	var currenturl = req.url;
	//find the blog
	Blog.findById(req.params.id, function(err, foundBlog) {
		if(err) {
			console.log(err);
		} else {
			res.render("editBlog", {url: currenturl, blog: foundBlog});
		}
	})
});

//put in newly edit blog

app.put("/tintuc/:id", isLoggedIn, parserBlog.single("blogImage"), function(req, res) {
	if(req.file) {
			Blog.findByIdAndUpdate(req.params.id, {
			title: req.body.blog.title,
			lead: req.body.blog.lead,
			text: req.body.blog.text,
			imageURL: req.file.path
		}, function(err, updatedBlog) {
			if(err) {
				console.log(err);
			} else {
				res.redirect("/tintuc/"+req.params.id);
			}
		});
		} else {
					Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
				if(err) {
					console.log(err);
				} else {
					res.redirect("/tintuc/"+req.params.id);
				}
			});
		}
	
});

//delete blog

app.delete("/tintuc/:id", isLoggedIn, function(req, res) {
	Blog.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			console.log(err);
		} else {
			res.redirect("/tintuc");
		}
	});
});


//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



//LISTEN

const port = process.env.PORT || 5000;
app.listen(port, process.env.IP, function(err) {
	console.log("PAGE IS LIVE");
});