const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.static("public"));
app.use(express.json());

// CONNECT TO MONGODB
mongoose.connect("mongodb://127.0.0.1:27017/scoreDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// CREATE MODEL
const Score = mongoose.model("Score", {
    email: String,
    hallticket: String,
    course: String,
    score: Number
});

// GET DATA
app.get("/api/scores", async (req, res) => {
    const data = await Score.find();
    res.json(data);
});

// UPDATE DATA
app.post("/api/update", async (req, res) => {
    const { course, newScore } = req.body;

    await Score.updateOne(
        { course: course },
        { score: newScore }
    );

    res.json({ message: "Updated in DB!" });
});

// INSERT INITIAL DATA (RUN ONLY ONCE)
app.get("/api/init", async (req, res) => {
    await Score.insertMany([
        {
            email: "25f2006661@ds.study.iitm.ac.in",
            hallticket: "26T1S2DS25F2006661",
            course: "CS1002",
            score: 70
        },
        {
            email: "25f2006661@ds.study.iitm.ac.in",
            hallticket: "26T1S2DS25F2006661",
            course: "MA1001",
            score: 42
        }
    ]);

    res.send("Data inserted");
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
// CLEAR DATABASE
app.get("/api/clear", async (req, res) => {
    await Score.deleteMany({});
    res.send("All data deleted");
});