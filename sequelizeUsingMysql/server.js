const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const router=require('./routes');
const fileUpload = require('express-fileupload');
const path=require('path');
const app=express();

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());
app.use('/attachment', express.static(path.join(__dirname,"./Attachment/")));

router.route(app);
let port=3007;
app.listen(port,()=>{
    console.log('started server on port ', port);
});