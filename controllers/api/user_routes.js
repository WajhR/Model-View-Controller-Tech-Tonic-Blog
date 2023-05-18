const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');


// Route to get all users
router.get("/", (req, res) => {
    User.findAll({
      attributes: { exclude: ["password"] },
    })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
// singup user ('/api/user)
router.post("/", async (req, res) => {
    console.log("Signup",req.body)
    try {
      const userData = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
        })
    //   newUser.username = req.body.username;
    //   newUser.email = req.body.email;
    //   newUser.password = req.body.password;
  
      //  const userData = await newUser.save();
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        console.log(req.session)
        res.status(200).json(userData);
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  });

// login user ('/api/user/login')
router.post('/login', async (req, res) => {
    console.log("Login",req.body)
    try {
        const dbUserData = await User.findOne({
            where: {name: req.body.name}
        });
        if (!dbUserData) {
            res.status(400)
            .json({ message: `User id ${req.params.id} is not valid.` });
            return;
        }
        console.log(dbUserData,"+++++++++++++++++++++++++")
        // check pw
        const userData = await dbUserData.checkPassword(req.body.password)
        if (!userData) {
            res.status(400).json({ message: "Incorrect password!" });
            return;
        }
     
        console.log(userData,"Login Password __________")
        // create session and send response back
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.logged_in = true;
          console.log(req.session)
           
        //send response to client
        res.status(200).
        json({ user:userData, message: "You are logged in!" });
        });
    } catch (err) {
        console.error("Login err",err)
        res.status(400).json(err);
    }
});

// logout user ('/api/user/logout')
router.post('/logout', withAuth, async (req, res) => {
   console.log("Logout")
    try {
       if (req.session.logged_in) {
            const dbUserData = await req.session.destroy(() => {
                res.status(204).end();
            });
          }   
        // } else {
        //     res.status(404).end();
        // }
    } catch {
        console.log("Err",err)
        res.status(400).end();
    }
});

module.exports = router;