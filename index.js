const express = require("express")
const axios = require("axios")
const morgan = require("morgan")

const app = express()

app.use(express.json())
app.use(morgan("combined"))
app.use((req, res, next) => {
    res.header("Content-Type", "application/json")
    res.header("Access-Control-Allow-Headers", "Authorization")
    res.header("Access-Control-Allow-Origin", "*")
    next()
})

app.get("/newsapi", (req, res) => {
    axios.get("https://newsapi.org/v2/top-headlines", {
        headers: {
            Authorization: req.headers.authorization
        },
        params: {
            country: "us",
            category: req.query.category
        }
    })
        .then(axiosResponse => res.send(axiosResponse.data))
        .catch(axioserr => {
            if (axioserr.response) {
                res.status(axioserr.response.status).send(axioserr.response.data)
            } else {
                res.status(400).send(axioserr.message)
            }
        })
})

app.listen(1337, () => console.log("Listening on port 1337"))