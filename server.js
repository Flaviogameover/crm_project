const Port = 8000;
const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const token = process.env.TOKEN;
const url = process.env.URL;

app.post("/tickets", async (req, res) => {
    const formData = req.body.formData;
    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "X-Cassandra-Token": token,
            "Content-Type": "application/json",
        },
        data: formData,
    };

    try {
        const response = await axios(url, options);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json(err);
    }
});


//create get request
app.get("/tickets", async (req, res) => {
    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "X-Cassandra-Token": token,
        },
    };

    try {
        const response = await axios(`${url}?page-size=20`, options);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json(err);
    }
});

//create get request by id
app.get("/tickets/:id", async (req, res) => {
    const id = req.params.id;
    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "X-Cassandra-Token": token,
        },
    };

    try {
        const response = await axios(`${url}/${id}`, options);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json(err);
    }
});



//create delete request
app.delete("/tickets/:documentId", async (req, res) => {
    const documentId = req.params.documentId;
    const options = {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "X-Cassandra-Token": token,
        },
    }; 
    console.log(documentId);

    try {
        const response = await axios(`${url}/${documentId}`, options);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json(err);
    }
});

//create put request
app.put("/tickets/:documentId", async (req, res) => {
    const documentId = req.params.documentId;
    const formData = req.body.formData;
    const options = {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "X-Cassandra-Token": token,
            "Content-Type": "application/json",
        },
        data: formData,
    };

    try {
        const response = await axios(`${url}/${documentId}`, options);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json(err);
    }

});

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});
