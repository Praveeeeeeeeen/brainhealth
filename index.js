console.log("Starting server...");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const CognitiveTest = require("./models/CognitiveTest");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const mongoURI = "mongodb://localhost:27017/brainHealth"; // Replace with MongoDB Atlas URL if needed
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.post("/brain-health/cognitive-test", async (req, res) => {
  try {
    const { userId, testType, testScore, timeTaken } = req.body;
    const cognitiveTest = new CognitiveTest({ userId, testType, testScore, timeTaken });
    const savedTest = await cognitiveTest.save();

    const result = {
      result: "Cognitive analysis data submitted successfully!",
      analysis: "Practice relaxation techniques like deep breathing or meditation to reduce anxiety."
    };

    console.log(`Result: ${result.result}`);
    console.log(`Analysis: ${result.analysis}`);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to save cognitive test data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
