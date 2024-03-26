const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>my node</title></head>");
    res.write(
      '<body><h1>my node</h1><form action="/message" method="POST"><input type="text" name="message"><button>submit</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsentBody = Buffer.concat(body).toString();
      const message = parsentBody.split('=')[1]
      console.log(parsentBody);
      fs.writeFileSync("meassage.txt", message);
    });
    
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>my node me ace</title></head>");
  res.write("<body><h1>this is my practice</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
