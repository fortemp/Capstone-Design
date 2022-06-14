import  io from 'socket.io-client'
import React from 'react';
export const Roomsocket = io('http://14.38.252.76:3001/room',{
        "forceNew" : true,
        "reconnectionAttempts": 10,
        "timeout" : 10000,               
        "withCredentials": true,
        "transports" : ["websocket"]
});
export const Publicsocket = io('http://14.38.252.76:3001/public',{
    "forceNew" : true,
    "reconnectionAttempts": 10,
    "timeout" : 10000,                  
    "transports" : ["websocket"],
    "withCredentials": true,
});

export const SocketContext = React.createContext();