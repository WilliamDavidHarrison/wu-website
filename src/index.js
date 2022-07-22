const express = require("express");
const app = express();

const axios = require("axios");
const fs = require("fs");

require("dotenv").config();

app.get("/", async (req, res) => {
    let values = fs.readFileSync("src/index.html", { encoding: "utf8" });

    const favicon = "https://api.williamsutilities.tk/favicon";
    const guilds = await axios.get(`https://api.williamsutilities.tk/guilds`).then(d => d.data);
    const logo = "https://api.williamsutilities.tk/logo";
    const users = await axios.get(`https://api.williamsutilities.tk/users`).then(d => d.data);

    values = values.replace("{favicon}", favicon);
    values = values.replace("{guilds}", guilds);
    values = values.replace("{logo}", logo);
    values = values.replace("{users}", users);

    res.send(values);
})

app.get("/invite", async (req, res) => {
    res.redirect("https://invite.williamsutilities.tk");
})

app.get("*", async (req, res) => {
    res.redirect("/");
})

app.listen(process.env.port, () => console.log(`Listening on Port: ${process.env.port}`));