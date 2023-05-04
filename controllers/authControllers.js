const { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } = require('firebase/auth');
const { authFb } = require('../helpers/firebase')
const { createUserAdmin, getUserBody } = require('./usersControllers')
const { admin } = require('../helpers/firebase');

const signUp = async (req, res) => {

    try {

        const { email, password, username } = req.body

        if (!res.errors) {
            
            const userCredentials = await createUserWithEmailAndPassword(authFb, email, password)
            const token = userCredentials._tokenResponse.idToken
            
            const newUserDB = {
                email: email,
                username: username,
                role: 'user',
                uid: userCredentials.user.uid
            }

          const user =  await createUserAdmin(newUserDB)
        
            return res.status(200).json({
                ok:true,
                user,
                token
            })
            
        } else {
            
            const errors = res.errors;
            return res.status(200, { errors });

        }

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error al crear el usuario",
            error: error.code
        });
    }
};

const signIn = async (req, res) => {
    
    const { email, password } = req.body
  
    try {
        
        const userCredentials = await signInWithEmailAndPassword(authFb, email, password);
        const token = userCredentials._tokenResponse.idToken
       
        const user = await getUserBody(email)
        return res.status(200).json({
            ok:true,
            user,
            token
        })
        
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error al inciar sesion",
            error: error.code
        });
    }
};

const logOut = async (req, res) => {

    try {

        await signOut(authFb)

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error al crear el usuario",
            error: error.code
        });
    }
};


const verifyAndRenewToken = async (req, res) => {

    const idToken = req.body.token;
    if (!idToken) {

      const uid = req.body.uid;

      if (!uid) {
        return res.status(400).json({ 
            isValid: false, 
            error: "No se ha encontrado ni token ni usuario" 
        });
      }
  
      try {

        const user = await admin.auth().getUser(uid);
        const renewedToken = await admin.auth().createCustomToken(uid);
  
        res.status(200).json({ 
            isValid: true, 
            token: renewedToken 
        });
      } catch (error) {

        res.status(401).json({ 
            isValid: false, 
            error: "Usuario no válido" 
        });

      }
  
    } else {

      try {

        await admin.auth().verifyIdToken(idToken);

        res.status(200).json({ 
            isValid: true 
        });

      } catch (error) {

        console.log(error);
        res.status(401).json({
             isValid: false, 
             error: "El token no es válido" 
        });
      }
    }
};;
  


module.exports = {

    signIn,
    logOut,
    signUp,
    verifyAndRenewToken
};

//* COOKIE PARA REGISTRO:

// const token = userCredentials._tokenResponse.idToken


//* COOKIE PARA LOGIN:

// res.cookie("token", userCredentials._tokenResponse.idToken, {

//     httpOnly: true,
//     secure: true,
//     sameSite: 'strict',
//     expires: new Date('2023-12-20'),

//   });


//* COOKIE PARA LOGOUT:

// res.clearCookie("token")