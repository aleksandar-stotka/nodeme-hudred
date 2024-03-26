const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  //in this case if request come pls exicute this function
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>My first page</title></head>");
    res.write(
      '<body><h1><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></h1></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on('data', (chunk) => { //whith this chunk we work
     
      body.push(chunk); ///the data event will be fire whenever new chunk is ready to be read, second argument its function should be exicuted for every data event
      
    }); 
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFileSync("message.txt", message);
    });

    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first page</title></head>");
  res.write("<body><h1>My first node</h1></body>");
  res.write("</html>");
  res.end();
});
//look for this finction with this name and exicute it for every incoming request

server.listen(3000);
