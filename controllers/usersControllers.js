const User = require('../models/userModel');
const { admin } = require('../helpers/firebase');

const getUsersAdmin = async (req, res) => {

    try {

        const user  = await User.find();

        return res.status(200).json({

            ok: true,
            data: user

        });

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error al obtener los usuarios",
        });

    }
};

const getUserAdmin = async (req, res) => {

    const id = req.params.id;

    try {

        const user = await User.findById(id);

        return res.status(200).json({
            ok: true,
            msg: "Usuario encontrado",
            data: user,
        });

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "No se ha podido obtener el usuario",
        });

    }
};

const createUserAdmin = async (newUserDB) => {

    const newUser = new User(newUserDB);

    try {

        const user = await newUser.save();

        return res.status(200).json({
            ok:true,
            user
        })
        
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error al crear el usuario",
        });

    }
};

const editUserAdmin = async (req, res) => {

    try {

        const id = req.params.id;
        const body = req.body;

        const user = await User.findOneAndUpdate({ _id: id }, { $set: body });
        
        await admin.auth().updateUser(user.uid, {
            email: body.email
        });
        
        return res.status(200).json({
            ok:true,
            body,
            
        }) 

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error al editar el usuario",
        });

    };
};

const deleteUserAdmin = async (req, res) => {

    try {

        const id = req.params.id;
        const user = await User.findOneAndDelete({ _id: id });

        await admin.auth().deleteUser(user.uid)

        return res.status(200).json({
            ok:true,
            user
        })
       
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'Error al borrar el usuario.'
        });
    }

};



module.exports = {

   getUsersAdmin,
   getUserAdmin,
   createUserAdmin,
   deleteUserAdmin,
   editUserAdmin
   
}