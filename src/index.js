const express = require('express');
const cors = require('cors');
const emailRoutes = require('./routes/emailRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:3000', 
  }));
  
app.use(express.json());

app.use('/api', emailRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
