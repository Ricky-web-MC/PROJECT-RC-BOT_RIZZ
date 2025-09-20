const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { json } = require("body-parser");
const { constants } = require("buffer");

const app = express();
const PORT = process.env.PORT || 3000;
const usf = "./user.json";

app.use(express.json());
app.use(cors());


// ================================== LOGIN ===================================== //

app.post("/login", (req, res) => {
    const {username, password} = req.body;

    let users = [];
    if(fs.existsSync(usf)) {
        users = JSON.parse(fs.readFileSync(usf));
    }

    const user = users.find(u => u.username === username && u.password === password);

    if(user){
        res.json({success: true, message: "Login telah berhasil, silahkan bersenang-senang :>"});
    } else {
        res.json({success: false, message: "Username atau password tidak diketahui, silahkan daftar! atau hubungi admin"});
    }
});



// =============================== REGISTER ===================================== //

app.post("/register", (req, res) => {
    const {username, phone, password} = req.body;

    let users = [];
    if (fs.existsSync(usf)) {
        users = JSON.parse(fs.readFileSync(usf));
    }

    if (users.find(u => u.username === username)) {
        return res.json({ success: false, message: "Username Sudah Dipakai orang lain!, gunakan yang berbeda ^ ^"});
    }

    if (users.find(u => u.password === password)) {
        return res.json({ success: false, message: "password Sudah Dipakai orang lain!, gunakan yang berbeda ^ ^"});
    }

    users.push({username, phone, password});
    fs.writeFileSync(usf, JSON.stringify(users, null, 2));

    res.json({ success: true, message: "register Berhasil, silahkan login untuk melanjutkan (⁠≧⁠▽⁠≦⁠)"});
});

app.listen(PORT, () => console.log(`server running on http;//localhost:${PORT}`));