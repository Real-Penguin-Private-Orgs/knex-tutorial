const app = require("./app");

let port = process.env.PORT || 4000;

app.listen(port, (err) => {
    if(err) throw err;

    console.log(`Listening to port ${port}`)
})