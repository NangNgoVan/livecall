
var text = "";
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
module.exports = function(length) {
  for(var i = 0; i < length; i++) {
  	text += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return text;
}