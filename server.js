import http from 'http';
import app from  './app/app.js';

app.get('/', (req, res) => {
  res.send('Hello from Harsh!');
});

const PORT = process.env.PORT || 2300;
const server = http.createServer(app);
server.listen(PORT, console.log(`Server is up & running on port ${PORT}`));