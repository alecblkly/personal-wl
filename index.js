require('dotenv').config();

const server = require('./server/server');

const PORT = process.env.PORT || 3030;
server.listen(PORT, () => {
   console.log(`\nServer is currently running on port ${PORT}.\n`);
});
