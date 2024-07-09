const User = require("../models/user");

async function handleGetAllUses(req, res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function handlegetUserById(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not Found" });
    return res.json(user);
}
async function handleUpdateUserById(req, res) {
    const id = req.params.id;
    const body = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, body, { new: true });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ status: "Success", user });

    } catch (error) {
        return res.status(400).json({ status: "Invalid User", error: error.message });
    }
}

async function handleDeleteUserById(req, res) {
    const id = req.params.id;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json({ status: "Success", id });
    } catch (error) {
        return res.status(400).json({ error: "Invalid user ID" });
    }
}
async function handleCreateNewUser(req, res) {
    const body = req.body;

    if (!body || !body.first_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ message: "All fields are required" });
    }
    // adding user in database
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });

    console.log("result: ", result);

    return res.status(201).json({ message: "Success", id: result._id });
}

module.exports = {
    handleGetAllUses,
    handlegetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
}