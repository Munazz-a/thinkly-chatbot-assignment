const express = require('express')
const app = express();
const path = require('path')
app.use(express.json())
const axios = require('axios')


app.use(express.static(path.join(__dirname, '../Client')))

app.post('/chat', async (req, res) => {
    try{
        const response = await axios.post('http://localhost:8000/chat', {
            question: req.body.message
        })
        res.json({ reply: response.data.answer })
    } catch (error) {
        res.status(500).json({ error: "Failed to get chat response" })
    }
})

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../Client/chatBot.jsx'))
// })

app.listen(3000, () => {
    console.log("✅ Node backend running at http://localhost:3000");
})