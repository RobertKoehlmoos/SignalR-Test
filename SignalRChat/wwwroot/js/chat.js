"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", (user, message) => {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.on("Announce", message => {
    const msg = "Announcement: " + message;
    const li = document.createElement("li");
    li.textContent = msg
    document.getElementById("messagesList").appendChild(li)
})

connection.start().then( () => {
    document.getElementById("sendButton").disabled = false;
}).catch( err => {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", event => {
    const user = document.getElementById("userInput").value;
    const message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch( err => {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("announceButton").addEventListener("click", event => {
    const message = document.getElementById("announcementInput").value;
    connection.invoke("Announce", message).catch( err => {
        return console.error(err.toString());
    });
    event.preventDefault();
});