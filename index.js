require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors());

// Parse JSON-encoded request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000

const dailylogroute = require("./router/dailylog");

app.get("/", (req, res) => {
    res.send("Hello from shubham's server");
});

// middleware or to set router
app.use("/api/dailylog", dailylogroute);

app.listen(3000, () => {
    console.log(`Server listening on port ${PORT}`);
});