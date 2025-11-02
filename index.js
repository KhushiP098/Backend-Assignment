require('dotenv').config();
const connectDB = require('./config/database.js');

const routes=require('./routes/index.js')
const  express=require('express');
const app=express();

const PORT=process.env.PORT || 3000;
app.use(express.json());

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch(err => {
    console.error('Database connection error:', err)
})


app.get('/',(req,res)=>{
    return res.send(`<h1>API is up</h1>`);
})

app.use('/api/v1',routes);



