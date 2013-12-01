var WebSocketServer = require('ws').Server;

var onlineUsers = [];

module.exports.init = function(server) {
  var webSocketServer = new WebSocketServer({server:server});
  
  webSocketServer.addListener('connection', function(webSocketConnection) {
    
    webSocketConnection.addListener('message', function(message) {
      
      var parsedMessage = JSON.parse(message);
      
      if(parsedMessage.type == 'login')
      {
        if(onlineUsers.indexOf(parsedMessage.data.username) == -1)
        {
          onlineUsers.push(parsedMessage.data.username);
        }
        console.log(parsedMessage.data.username + " logged in.");
        
        updateIpList(webSocketServer);
      }
      
      else
      {
        for(var i = 0; i < webSocketServer.clients.length; i++)
        {
          webSocketServer.clients[i].send(message);
        }
      }
      
    });
    
    updateIpList(webSocketServer);
    
    console.log('client connected with ip: ' + webSocketConnection._socket.remoteAddress);
    
    webSocketConnection.addListener('close', function() {
      updateIpList(webSocketServer);
    });
    
  });
  
};

var updateIpList = function(webSocketServer) {
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