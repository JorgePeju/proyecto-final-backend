const { admin } = require('../helpers/firebase');

const checkToken = async (req, res, next) => {

    const idToken = req.cookies.token;

    if (!idToken) {

        return res.redirect("/");

    }

    try {

        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;

        next();

    } catch (error) {

        console.log(error);

        res.redirect('/')

    }
};

const renewToken = async (req, res) => {

    const idToken = req.body.token;
  
    try {

      const renewedToken = await admin.auth().verifyIdToken(idToken, true);
      res.json({ token: renewedToken });

    } catch (error) {

      console.log(error);

      res.redirect('./', { error: "Token inválido" });

    }
  };

module.exports = { 
    checkToken,
    renewToken
 };