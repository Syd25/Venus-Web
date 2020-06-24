const express=require('express');
const app=express();
app.use(express.static('public'));
app.use('/css',express.static(__dirname+'/node_modules/bootstrap/dist/css'));
app.use('jquery',express.static(__dirname+'node_modules/jquery/dist'));


const path=require('path')
const socketio=require('socket.io')
const http=require('http')
const server=http.createServer(app)
const io=socketio(server)

let usersockets={};

io.on('connection',(socket)=>{
    console.log("New socket formed from"+socket.id)
    socket.emit('connected')

    socket.on('login',(data)=>{
        usersockets[data.user]=socket.id;
        console.log(usersockets)
    })

    socket.on('send_msg',(data)=>{
        if(data.message.startsWith('@')){
             let recipient=data.message.split(':')[0].substr(1)
             let rcptsocket=usersockets[recipient]
             io.to(rcptsocket).emit('recv_msg',data)
        }
        else{
            socket.broadcast.emit('recv_msg',data)
        }
       
    })
})



app.get("/",(req,res)=>{
      res.sendFile(__dirname+'/intro.html')
});

app.get("/index",(req,res)=>{
      res.sendFile(__dirname+'/index.html')
});

app.get("/mag",(req,res)=>{
    res.sendFile(__dirname+'/mag.html')
});


app.get("/food",(req,res)=>{
    res.sendFile(__dirname+'/food.html')
});


app.get("/stuffed",(req,res)=>{
    res.sendFile(__dirname+'/stuffed.html')
});

app.get("/handicrafts",(req,res)=>{
    res.sendFile(__dirname+'/handicrafts.html')
});


app.get("/sellproduct",(req,res)=>{
    res.sendFile(__dirname+'/sellproduct.html')
});

app.get("/rating",(req,res)=>{
    res.sendFile(__dirname+'/rating.html')
});

app.get("/community",(req,res)=>{
    res.sendFile(__dirname+'/community.html')
});

app.get("/submitted",(req,res)=>{
    res.sendFile(__dirname+'/submitted.html')
});

app.get("/submitted1",(req,res)=>{
    res.sendFile(__dirname+'/submitted1.html')
});

app.get("/videotuts",(req,res)=>{
    res.sendFile(__dirname+'/videotuts.html')
});


const accountSid = 'SM923daf155b4d67d382f1553e1d172b6e';
const authToken = '0c2b930fad7a0641c551674ac6c3b71a';

const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+919582996802',
     to: '+918076082063'
   })
  .then(message => console.log(message.sid));




 app.listen(3000,()=>console.log("Server running on localhost:3000"));