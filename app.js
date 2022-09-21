const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public/style.css"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
    const FirstName = req.body.fName;
    const LastName = req.body.lName;
    const email = req.body.email;
    console.log(FirstName + LastName + email);
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: FirstName,
                    LNAME: LastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us10.api.mailchimp.com/3.0/lists/76aa218b02";
    const options = {
        method: "POST",
        auth: "fazeel:8b8ae0676fe71759ad665d5574ae025e-us10"
    }
    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    });
    request.write(jsonData);
    request.end();
});
app.post("/failure.html",function(req,res){
    res.redirect("/");
})
app.listen(3000, function () {
    console.log("Port is running at port 3000");
})
// api key 8b8ae0676fe71759ad665d5574ae025e-us10
// listid 76aa218b02