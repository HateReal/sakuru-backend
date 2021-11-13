import http, {
  Server,
} from "http";
import {
  app,
} from "./api/app";

let server: Server;
const port = parseInt(process.env.PORT, 10) || 4000;

const bootstrap = async () => {
  server = http.createServer(app);
  server.listen(port, () => {
    console.info(`The application started at ${port}`);
  });
};

const shutdown = async () => {
  server.close(() => {
    console.info(`The application closed.`);
  });
};

process.on("SIGUSR2", (signal) => {
  shutdown();
  process.kill(process.pid, signal);
});

bootstrap()
  .catch((err) => {
    console.error(err);
    shutdown();
  });
