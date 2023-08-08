const express = require('express');
const jsonServer = require('json-server');

const app = express();
const jsonRouter = jsonServer.router('db.json'); 
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 3001;

app.use(middlewares);
app.use('/api', jsonRouter);

app.listen(PORT, () => {
  console.log(`API server is running on http://localhost:${PORT}`);
});
