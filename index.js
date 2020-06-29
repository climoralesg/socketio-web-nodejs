const express= require('express');
const app=express();
const path=require('path');
const SockeoIO=require('socket.io');

// se define el puerto
app.set('port',4040);

//console.log(path.join(__dirname,'public')); // Indica donde esta nuestro proyecto (nuestro viva la madre Rusia)

app.use(express.static(path.join(__dirname,'public')))


//escucha por el puerto y despues ejecuta la funcion ()
//iniciar el servidor
const server = app.listen(app.get('port'),()=>{
    console.log('servidor en puerto', app.get('port'));
});

//SockeoIO.listen(server);
//prepara la escucja como socket
const io=SockeoIO(server);

//websocket
//este se conecta con io();
io.on('connection',(socket)=>{
    //console.log("new connection", socket);
    console.log("Nueva conexion", socket.id);
    socket.on('chat:message',(data)=>{ //el emit del otro
        io.sockets.emit('chat:message', data);
        
        //console.log(data);
    });

    socket.on('chat:escribiendo',(data)=>{
        socket.broadcast.emit('chat:escribiendo',data) // emite a todos excepto a mi interfaz 
        console.log(data);
    })
});

