const Entry = require('../models/entriesModel');


const getEntriesAdmin = async (req, res) => {

    try {

        const search = new RegExp(`${req.query.search}`, 'i');

        if (req.query.search != undefined) {

            const entry = await Entry.find(

                {
                    $or:
                        [
                            { titulo: search },
                            { descripcion: search },
                        ]
                }

            );

            return res.status(200).json({
                ok: true,
                data: entry
            });

        } else {

            const entry = await Entry.find();

            return res.status(200).json({
                ok: true,
                data: entry
            });

        };

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error al obtener la entrada",
        });

    }
};

const getEntryAdmin = async (req, res) => {

    const id = req.params.id;

    try {

        const entry = await Entry.findById(id);

        return res.status(200).json({
            ok: true,
            msg: "Entrada encontrada",
            data: entry,
        });

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "No se ha podido acceder a la entrada",
        });

    }
};


const createEntry = async (req, res) => {
   
    const newEntry = new Entry(req.body);
    console.log(newEntry)
    try {

        if (!res.errors) {

            const entry = await newEntry.save();

            return res.status(201).json({
                ok: true,
                msg: 'Entrada creada.',
                entry
            });

        } else {

            const errors = res.errors;
            return res.status(100, { errors });

        }

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error al crear la entrada",
        });

    }
};

const editEntry = async (req, res) => {

    try {

        const id = req.params.id;
        const body = req.body;

        if (!res.errors) {
            const entry = await Entry.findOneAndUpdate({ _id: id }, { $set: body });

            return res.status(200).json({
                ok: true,
                msg: 'Entrada actualizada.',
                entry
            });

        } else {

            const errors = res.errors;
            return res.status(100, { errors });

        }

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error al editar la entrada",
        });

    };
};


const deleteEntry = async (req, res) => {

    try {

        const id = req.params.id;
        const entry = await Entry.findOneAndDelete({ _id: id });

        return res.status(200).json({

            ok: true,
            msg: 'Entrada eliminada correctamente.',
            entry

        });


    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'Error al borrar la entrada.'
        });
    }

};

const deleteEntriesByUser = async (id) => {

    try {

      const result = await Entry.deleteMany({ user: id });
      return result.deletedCount;

    } catch (error) {
        
      throw new Error('Error al borrar las entradas del usuario.');
    }
  };


  const deleteEntriesByUserId = async (req, res) => {

    try {

      const id = req.params.id;
  
      const deletedEntriesCount = await deleteEntriesByUser(id);
  
      return res.status(200).json({
        ok: true,
        deletedEntriesCount
      });

    } catch (error) {

      return res.status(500).json({
        ok: false,
        msg: 'Error al borrar las entradas del usuario.'
      });

    }
  };



module.exports = {

    getEntryAdmin,
    getEntriesAdmin,
    createEntry,
    editEntry,
    deleteEntry,
    deleteEntriesByUser,
    deleteEntriesByUserId
}