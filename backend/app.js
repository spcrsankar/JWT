const express = require('express')
const app = express()
const cors=require("cors");
const route = require("./routes/routes")

app.use(express.json())
app.use(cors());
app.use('/',route)
app.listen(3000, () => console.log('Server started on port 3000'))

