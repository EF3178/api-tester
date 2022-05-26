const express = require("express");
const versionOfProject = require("./package.json").version;

// express initialization
const app = express();
app.use(express.json({limit: '20mb'}));
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.status(400).json({
            error: err.message,
        });
    }
});
app.get("/", (req, res) => {
	res.send("Thanks for visiting. this is the version " + versionOfProject);
});

const port = process.env.PORT || "5000";
app.listen(port ,() => {
    console.log("listening on port 5000");
});


app.post("/return_text", (req, res, next) => {
	try {
		res.json({"your_request" : JSON.stringify({"headers" : req.headers, "body" : req.body})})
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});
app.post("/return_JSON", (req, res, next) => {
	try {
        console.log(JSON.stringify(req.body))
		res.json({"headers" : req.headers, "body" : req.body})
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});