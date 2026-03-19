const express = require("express");

const app = express();
app.use(express.static("public"));
app.use(express.json());

// ✅ STATIC DATA (NO DATABASE)
let scores = [
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
];

// ✅ GET DATA
app.get("/api/scores", (req, res) => {
    res.json(scores);
});

// ✅ UPDATE DATA
app.post("/api/update", (req, res) => {
    const { course, newScore } = req.body;

    scores = scores.map(s =>
        s.course === course ? { ...s, score: newScore } : s
    );

    res.json({ message: "Updated!" });
});

// ✅ PORT FIX (IMPORTANT FOR RENDER)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running...");
});