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
      const newUser = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
        })
    //   newUser.username = req.body.username;
    //   newUser.email = req.body.email;
    //   newUser.password = req.body.password;
  
       const userData = await newUser.save();
  
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
    try {
        const dbUserData = await User.findOne({
            where: {username: req.body.username}
        });
        if (!dbUserData) {
            res.status(400)
            .json({ message: `User id ${req.params.id} is not valid.` });
            return;
        }
        // check pw
        const pwValidated = await dbUserData.checkPassword(req.body.password)
        if (!pwValidated) {
            res.status(400).json({ message: "Incorrect password!" });
            return;
        }
        // create session and send response back
        req.session.save(() => {
            req.session.userId = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;        
        //send response to client
        res.status(200).
        json({ user:userData, message: "You are logged in!" });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// logout user ('/api/user/logout')
router.post('/logout', withAuth, async (req, res) => {
    try {
        if (req.session.loggedIn) {
            const dbUserData = await req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    } catch {
        res.status(400).end();
    }
});

module.exports = router;