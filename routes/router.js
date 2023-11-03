const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");


router.post("/register", async (req, res) => {
    const { name, email, age, mobile, work, add, desc } = req.body;

    if (!name || !email || !age || !mobile || !work || !add || !desc) {
        return res.status(422).json("plz fill the data");
    }

    try {
        const preUser = await users.findOne({ email: email });

        if (preUser) {
            return res.status(422).json("this is user is already present");
        } else {
            const addUser = new users({
                name, email, age, mobile, work, add, desc
            });
            await addUser.save();
            return res.status(201).json(addUser);
        }
    } catch (error) {
        return res.status(422).json(error);
    }
});

// get userData

router.get("/getData", async (req, res) => {
    try {
        const userData = await users.find();
        return res.status(201).json(userData);
    } catch (error) {
        return res.status(422).json(error);
    }
});

// get individual user

router.get("/getUser/:id", async (req, res) => {

    try {
        const { id } = req.params;

        const userIndividual = await users.findById({ _id: id });
        return res.status(201).json(userIndividual);
    } catch (error) {
        return res.status(422).json(error);
    }

});

// update user data
router.patch('/updateUser/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const updatedUser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });
        res.status(201).json(updatedUser);
    } catch (error) {
        res.status(422).json(error);
    }
});

// delete user
router.delete("/deleteUser/:id", async(req, res) => {
    try {
        const {id} = req.params;

        const deleteUser = await users.findByIdAndDelete({_id:id});
        res.status(201).json(deleteUser);
    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;