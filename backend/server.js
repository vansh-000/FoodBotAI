const app = require('./app');
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Lead API running on port ${PORT}`);
});
