import { app } from "./app.js"
import { env } from "./env/index.js";

const host = env.HOST; 
const port = env.PORT; 

app
  .listen({
    host,
    port,
  })
  .then(() => {
    const url = `http://localhost:${port}`;
    console.log(`HTTP server running at: ${url}`);
  });