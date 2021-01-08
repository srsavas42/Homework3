import Note from "../models/noteModel"


/*This is a generic function I have to reply to unauthorized requests */
exports.wrongRoute = async (req, res) => {
    return res.status(405).json({general : "method not allowed" })
}

/*This is the function that is supposed to return all the notes*/
exports.getNotes = async (req, res) => {
    try {
        const allNotes = await Note.find()
        return res.status(200).json(allNotes)
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

/*returns one note given the noteId  else return error message in the catch block */
exports.getNote = async (req, res) => {
    try {
        const oneNote = await Note.findById(req.params.id)

        if (!oneNote) {
            return res.status(404).json({general: "Note not found"})
        }else {
            return res.status(200).json(oneNote)
        }

    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

/*This is the function that adds an article*/
exports.addNote = async (req, res) => {
    try {
        const newNote = await Note.create(valuesInput(req.body));
        return res.status(201).json({
            status: "success",
            article: newNote
        })

    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

/* Finds the given note and updates it. returns the updated note */
exports.updateNote = async (req, res) => {
    try{
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if (!updatedNote) {
            return res.status(404).json({general: "Note not found"})
        }else {
            return res.status(200).json(updatedNote)
        }
    }catch(err){
        return res.status(403).json({error: err.message})
    }
}

/* Finds the given noteId and deletes it */
exports.deleteNote = async (req, res) => {
    try{
        const deletedNote  = await Note.findByIdAndDelete(req.params.id)

        if (!deletedNote) {
            return res.status(404).json({general: "Note not found"})
        }else {
            return res.status(200).json({general: "Note deleted successfully"})
        }
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

const valuesInput = data => {
    return {
        title: data.title,
        body: data.body,
    }
}

