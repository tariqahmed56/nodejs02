import http from "http";
import fs from "fs/promises";
import url from "url";
import path from "path";
const PORT = process.env.PORT;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const server = http.createServer(async (req, res) => {
  // res.statusCode = 200;
  // console.log(req.url)
  try {
    if (req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" });
      let filePath;
      if (req.url === "/") {
          filePath = path.join(__dirname, "public", "index.html");
          // res.end("<h1>Home Route</h1>");
      } else if (req.url === "/about") {
        filePath = path.join(__dirname, "public", "about.html");
        // res.writeHead(200, { "Content-Type": "text/plain" });
        // res.end("About Route");
      } else {
        throw new Error("Not Found")
      }
      const data = await fs.readFile(filePath);
      res.write(data);
      res.end()
    } else {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write("Not Found");
      res.end()
    }
  } catch (error) {}
});
server.listen(PORT, () => {
  console.log("Server runing on " + PORT);
});
