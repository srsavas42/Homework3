import express from "express"
import {wrongRoute, getNotes, getNote,addNote, updateNote, deleteNote} from "../controllers/noteController"

const router  = express.Router()

router.route("/notes")
    .get(getNotes)
    .post(addNote)
    .patch(wrongRoute)
    .delete(wrongRoute)

router.route("/note/:id")
    .get(getNote)
    .post(wrongRoute)
    .patch(updateNote)
    .delete(deleteNote)

module.exports = router

