
//Required package
var pdf = require("pdf-creator-node");
var fs = require("fs");




// Read HTML Template
var html = fs.readFileSync("./views/template.html", "utf8");

var options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: '<div style="text-align: center;"><h1>KIST</h1></div>'
    },
    footer: {
        height: "28mm",
        contents: {
            first: 'Cover page',
            2: 'Second page', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page'
        }
    }
};


module.exports = {
    html: html,
    options: options 
}