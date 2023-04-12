const authorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken")
const { uploadFile } = require("../aws");
const { isValidObjectId } = require("mongoose");

//-----Function for email validation-----

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
    return re.test(email);
}

//-----Function for email Password-----

function checkPassword(str) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,14}$/;
    return re.test(str);
}

function isValidname(firstname) { return (typeof firstname !== "string" || /^[a-zA-Z]+$/.test(firstname)) ? true : false }
function upperCase(string) { return string.replace(string[0], string[0].toUpperCase()) }


//-----Create Author API-----

const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        let files = req.files;
        if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, msg: "Please enter personal details" }) }

        let { fname, lname, title, email, password } = data;

        if (!fname) { return res.status(400).send({ status: false, msg: "Please enter fname" }) }
        if (!lname) { return res.status(400).send({ status: false, msg: "Please enter lname" }) }
        if (!title) { return res.status(400).send({ status: false, msg: "Please enter title" }) }
        if (!email) { return res.status(400).send({ status: false, msg: "Please enter email" }) }
        if (!password) { return res.status(400).send({ status: false, msg: "Please enter password" }) }

        if (!isValidname(fname)) { return res.status(400).send({ status: false, msg: "Please enter a valid fname" }) }
        data.fname = upperCase(fname)

        if (!isValidname(lname)) { return res.status(400).send({ status: false, msg: "Please enter a valid lname" }) }

        let enums = authorModel.schema.obj.title.enum;
        if (!enums.includes(title)) { return res.status(400).send({ status: false, msg: "Please enter a valid title" }) }

        let checkEmail = validateEmail(email)           //it returns true/false
        if (!checkEmail) { return res.status(400).send({ status: false, msg: "Please enter a valid Email" }) }
        let authorData = await authorModel.find({ email: email })
        if (authorData.length != 0) { return res.send({ status: false, msg: "Account already created, Please login" }) }

        if (!validateEmail(email)) { return res.status(400).send({ status: false, msg: "Please enter a valid Password" }) }

        if (files) {
            data.profile = await uploadFile(files[0])
        }

        let result = await authorModel.create(data);
        res.status(201).send({ status: true, data: result })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
};


//-----Author Login API------

const authorLogin = async function (req, res) {

    try {
        let data = req.body
        let email = data.email
        let pass = data.password

        if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, msg: "Please enter email and Password to Login" }) }

        if (!email) { return res.status(400).send({ status: false, msg: "Please enter your email" }) }
        if (!pass) { return res.status(400).send({ status: false, msg: "Please enter password" }) }

        let checkEmail = validateEmail(email)
        if (!checkEmail) { return res.status(400).send({ status: false, msg: "Please enter a valid Email" }) }
        let checkPass = checkPassword(pass)
        if (!checkPass) { return res.status(400).send({ status: false, msg: "Please enter a valid Password" }) }


        let authorByEmail = await authorModel.findOne({ email: email })
        if (!authorByEmail) { return res.status(404).send({ status: false, msg: "Author not found" }) }

        if (authorByEmail.password != pass) { return res.status(400).send({ status: false, msg: "Please enter a correct Password" }) }

        let token = jwt.sign({ authorId: authorByEmail._id, email: authorByEmail.email }, "blogging site")
        res.status(200).send({ status: true, data: { token: token, user: authorByEmail } })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}


const updateAuthor = async (req, res) => {

    try {
        let files = req.files
        let data = req.body

        let { authorId, fname, lname, email, password } = data;

        if (!isValidObjectId(authorId)) { return res.status(400).send({ status: false, msg: "Invalid authorId" }) }
        let author = await authorModel.findById(authorId)
        if(!author){return res.status(404).send({ status: false, msg: "Author not found...!" })}

        if (req.decode.authorId != authorId) { return res.status(403).send({ status: false, msg: "Not Autherized...!" }) }


        if (fname || fname == "") {
            if (!isValidname(fname)) { return res.status(400).send({ status: false, msg: "Please enter a valid fname" }) }
        }

        if (lname || lname == "") {
            if (!isValidname(lname)) { return res.status(400).send({ status: false, msg: "Please enter a valid lname" }) }
        }

        if (email || email == "") {
            if (!validateEmail(email)) { return res.status(400).send({ status: false, msg: "Please enter a valid Email" }) }
            let authorData = await authorModel.findOne({ email: email })
            if (authorData) { return res.send({ status: false, msg: "Account already created" }) }
        }

        if (password || password == "") {
            if (!validateEmail(email)) { return res.status(400).send({ status: false, msg: "Please enter a valid Password" }) }
        }

        if (files.length === 0 || !files) {data.profile=author.profile}
        else{data.profile = await uploadFile(files[0]) }

        let updatedData = await authorModel.findOneAndUpdate({ _id: authorId }, data, { new: true })

        res.send({ status: true, data: updatedData })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { createAuthor, updateAuthor, authorLogin }