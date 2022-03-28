import  io from 'socket.io-client'
import React from 'react';
export const Roomsocket = io('http://localhost:3001/room',{
        "forceNew" : true,
        "reconnectionAttempts": 10,
        "timeout" : 10000,                  
        "transports" : ["websocket"]
});
export const Publicsocket = io('http://localhost:3001/public',{
    "forceNew" : true,
    "reconnectionAttempts": 10,
    "timeout" : 10000,                  
    "transports" : ["websocket"]
});

export const SocketContext = React.createContext();