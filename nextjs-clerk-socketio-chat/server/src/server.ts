import { createServer } from "http";

const PORT = 3006;
const server = createServer();

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
