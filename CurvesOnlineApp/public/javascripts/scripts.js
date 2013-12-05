var init = function() {
  document.getElementById('account').addEventListener('click', open_close, false);
  document.getElementById('loginButton').addEventListener('click', login, false);
};

window.addEventListener('load', init, false);

var open_close = function() {
  var headerContainer = document.getElementById('headerContainer');
  headerContainer.style.top = headerContainer.style.top == '0px' ? '-50px' : '0px';
};

var login = function() {
  socketSendString({type: 'login', data: {username: document.getElementById('username').value}});
}

var socketSendString = function(object) {
  webSocket.send(JSON.stringify(object));
}