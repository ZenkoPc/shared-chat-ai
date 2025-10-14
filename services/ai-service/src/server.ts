import express from 'express';

const app = express();

const PORT = process.env.PORT || 3004;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send({
        message: "Ai Service is running"
    })
})

app.listen(PORT, () => {
    console.log(`AI service is running on port ${PORT}`);
})