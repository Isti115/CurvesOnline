exports.home = function(req, res){
  res.render('home');
};

exports.play = function(req, res){
  console.log(req.params.room);
  res.cookie('room', req.params.room);
  res.render('play', {room: req.params.room});
};

exports.about = function(req, res){
  res.render('about');
};