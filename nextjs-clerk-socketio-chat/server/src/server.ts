import { createServer, type IncomingMessage, type ServerResponse } from "http";
import { pino } from "pino";
import { pinoHttp } from "pino-http";

// Initialize pino logger
const logger = pino({ level: "info" });

// Initialize HTTP logger middleware
const httpLogger = pinoHttp({ logger });

const PORT = 3006;
const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  httpLogger(req, res)

  res.end()
});

server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
