require("dotenv").config();
const express = require("express");
const router = require("./routes/index.route");
const connection = require("./db/connection");
const PORT = 8080 || process.env.PORT
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads")); // Serve static files from the uploads directory




// API routes
app.use("/api/v1", router);



// DB connection
connection().then(con => {
    if (con) {
        app.listen(PORT, () => {
            console.log("[*] Server running on http://localhost:" + PORT);
        })
    } else {
        console.log("[*] Database connection failed")
    }
}).catch((er) => {
    console.log("[*] Something went wrong: ", er)
})
