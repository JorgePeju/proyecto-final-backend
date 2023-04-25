const { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, deleteUser } = require('firebase/auth');
const { authFb } = require('../helpers/firebase')
const { createUserAdmin } = require('./usersControllers')

const signUp = async (req, res) => {

    const { email, password } = req.body
    // const email = 'kevin@kevin.es'
    // const password= 'kevin1234'

    try {

        if (!res.errors) {

            const userCredentials = await createUserWithEmailAndPassword(authFb, email, password)

            const newUserDB = {
                email: email,
                uid: userCredentials.user.uid
            }

            await createUserAdmin(newUserDB)

            return res.status(200).json({
                ok: true,
                newUserDB
            })
            
        } else {
            const errors = res.errors;
            return res.status(100, { errors });

        }

    } catch (error) {

        console.log(error)

    }
};

const signIn = async (req, res) => {

    const { email, password } = req.body
    // const email = 'kevin@kevin.es'
    // const password= 'kevin1234'

    try {

        const userCredentials = await signInWithEmailAndPassword(authFb, email, password);

    } catch (error) {

        console.log(error)

    }
};


const logOut = async (req, res) => {

    try {

        await signOut(authFb)

    } catch (error) {

        console.log(error)
    }
};

module.exports = {

    signIn,
    logOut,
    signUp

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