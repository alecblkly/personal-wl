require('dotenv').config();

const server = require('./server/server');

const PORT = process.env.PORT || 3030;
server.listen(PORT, () => {
   console.log(`\nYo, the server is running on ${PORT}. Radical dude!\n`);
});
