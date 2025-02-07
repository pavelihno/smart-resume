import app from "./app.js";
import http from 'http';

const port = process.env.EXPRESS_DOCKER_PORT || 4000;
const server = http.createServer(app);

server.listen(port, () =>
	console.log(`Server running on port ${port}, http://localhost:${port}`)
);
