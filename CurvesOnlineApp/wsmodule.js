var WebSocketServer = require('ws').Server;

var rooms = {};

module.exports.init = function(server) {
  var webSocketServer = new WebSocketServer({server:server});
  
  webSocketServer.addListener('connection', function(webSocketConnection) {
    
    webSocketConnection.addListener('message', function(message) {
      
      var parsedMessage = JSON.parse(message);
      
      if(parsedMessage.type == 'join')
      {
        webSocketConnection.username = parsedMessage.data.username;
        webSocketConnection.room = parsedMessage.data.room;
        
        console.log(parsedMessage.data.username + ' joined room ' + parsedMessage.data.room);
        
        if(!(parsedMessage.data.room in rooms))
        {
          rooms[parsedMessage.data.room] = [];
          console.log('new room : ' + parsedMessage.data.room)
        }
        rooms[parsedMessage.data.room].push(webSocketConnection);
      }
      
      roomLog();
      
      // for(var i = 0; i < webSocketServer.clients.length; i++)
      // {
      //   webSocketServer.clients[i].send(message);
      // }
      
    });
    
    // updateUserList(webSocketServer);
    
    console.log('client connected with ip: ' + webSocketConnection._socket.remoteAddress);
    
    webSocketConnection.addListener('close', function() {
      console.log(webSocketConnection.username + ' left');
      
      if(webSocketConnection.username) {
        var index = rooms[webSocketConnection.room].indexOf(webSocketConnection);
        
        rooms[webSocketConnection.room].splice(index, 1);
        
        if(rooms[webSocketConnection.room].length == 0) {
          delete rooms[webSocketConnection.room];
        }
      }
    });
    
  });
  
};

var updateUserList = function(webSocketServer) {
  var ips = [];
    
    for(var i = 0; i < webSocketServer.clients.length; i++)
    {
        ips.push(webSocketServer.clients[i]._socket.remoteAddress);
    }
    
    for(var i = 0; i < onlineUsers.length; i++)
    {
        ips.push(onlineUsers[i]);
    }
    
    for(var i = 0; i < webSocketServer.clients.length; i++)
    {
        webSocketServer.clients[i].send(JSON.stringify({type:'iplist', data: ips}));
    }
};

var roomLog = function() {
  console.log('rooms:');
  
  for(var room in rooms)
  {
    console.log('--' + room);
    for(var i = 0; i < rooms[room].length; i++)
    {
      console.log('----' + rooms[room][i].username);
    }
  }
};