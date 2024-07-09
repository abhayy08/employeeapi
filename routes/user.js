const express = require("express");
const { handleGetAllUses, handlegetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateNewUser } = require("../controllers/user");

const router = express.Router();

// ROUTES

router.route("/")
    .get(handleGetAllUses) // To get all users as a json response
    .post(handleCreateNewUser); // To add/create a user

// To GET, PATCH, DELETE user by :id
router.route("/:id")
    .get(handlegetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById);

module.exports = router;