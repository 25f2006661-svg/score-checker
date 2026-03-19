const express = require("express");

const app = express();
app.use(express.static("public"));
app.use(express.json());

// ✅ STATIC DATA (NO DB)
const scores = [
    {
        email: "25f2006661@ds.study.iitm.ac.in",
        hallticket: "26T1S2DS25F2006661",
        course: "CS1002",
        score: 92
    },
    {
        email: "25f2006661@ds.study.iitm.ac.in",
        hallticket: "26T1S2DS25F2006661",
        course: "MA1001",
        score: 84
    }
];
// ✅ API
app.get("/api/scores", (req, res) => {
    res.json(scores);
});

// ✅ PORT FIX (CRITICAL)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running...");
});