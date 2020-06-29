console.log("codigo");
//io(midominio:puerto);
const socket=io();//esto funciona de forma local

let message=document.getElementById("message");
let userName=document.getElementById("userName");

let btn=document.getElementById("send");
let output=document.getElementById("output");
let actions=document.getElementById("actions");

btn.addEventListener('click',function(){
    socket.emit('chat:message',{
        userName:userName.value,
        message:message.value
    });
    /*
    console.log('Clickeado');
    console.log(message);
    console.log({
        userName:userName.value,
        message:message.value
    })
    */

});
message.addEventListener('keypress',function(){
    socket.emit('chat:typing',userName.value);
})

socket.on('chat:message',function(data){
    console.log("datos", data);
    output.innerHTML += `<p> <strong>${data.userName}</strong>:${data.message}</p>`
});

socket.on('chat:escribiendo',function(data){
    actions.innerHTML=`<p><em>${data} is typing</em></p>`
})