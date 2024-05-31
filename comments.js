// Create web server

// Load HTTP module
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

// Create HTTP server and listen on port 8000 for requests
http.createServer(function (req, res) {
  // Set the response HTTP header with HTTP status and Content type
  res.writeHead(200, { "Content-Type": "text/html" });

  // Send the response body "Hello World"
  res.write("<html><head><title>Comments</title></head><body>");

  // Read the file from the file system
  fs.readFile("comments.txt", "utf8", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.write("<h1>Comments</h1>");
      res.write("<ul>");
      const comments = data.split("\n");
      comments.forEach((comment) => {
        res.write("<li>" + comment + "</li>");
      });
      res.write("</ul>");
    }
    res.write(
      `<form action="/add-comment" method="POST">
        <textarea name="comment" rows="4" cols="50"></textarea>
        <br>
        <input type="submit" value="Add Comment">
      </form>`
    );
    res.write("</body></html>");
    res.end();
  });
}).listen(8000);

console.log("Server running at http://