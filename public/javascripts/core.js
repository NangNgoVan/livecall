//socket
//const socket = io.connect('http://localhost:3000');

//socket
//socket.emit('socket-live-stream', 'data');

// wating a phone call.
//socket.on('wating-a-call', function(data){
  //
  //console.log('a call from ' + data.from + 'with' + data.token);
  // display call dialog.
  //openCallingDialog();
//});

var CallManager = require('callmanager');
// var c = new CallManager('http://localhost', '3000');
CallManager.connect('http://localhost', '3000');

CallManager.openRemoteStream(true);

//make call
// socket.emit(myemail, friend' email, token);

//peer-to-peer
//var Peer = require('simple-peer');

//media
// navigator.mediaDevices.getUserMedia({audio: true, video: false})
// .then(function(stream) {

//   var p = new Peer({initiator: location.href , trickle: false, stream: stream});

//   p.on('error', function(e){console.log('error', e)});

//   p.on('signal', function(data){
// 	console.log('signal', JSON.stringify(data));
// 	  $('#local-key').val(JSON.stringify(data));
//   });

//   $("#connect-button").click(function(){
// 	  p.signal(JSON.parse($('#friend-key').val()));
//   })

//   //connect
//   p.on('connect', function(){
//     alert('Đã kết nối tới máy bạn thành công!');
//     p.send('OK!!!!!!!!!!!!!!!!!!!');
//   });

//   //rev data
//   p.on('data', function(data){
// 	  console.log('dl'+data);
//   });

//   p.on('stream', function(fstream){
//     console.log('đang streaming');
//     // var audioCtx = new AudioContext();
//     // var source = audioCtx.createMediaStreamSource(fstream);
//     // source.connect(audioCtx.destination);
//     var audio = document.getElementById('fvoid');
//     audio.src = window.URL.createObjectURL(fstream);
//   });




//   // const video = document.getElementById('#my');
//   // if ("srcObject" in video) {
//   //   video.srcObject = stream;
//   // } else {
//   //   // Avoid using this in new browsers, as it is going away.
//   //   video.src = window.URL.createObjectURL(stream);
//   // }

//   // video.onloadedmetadata = function(e) {
//   //   video.play();
//   // };
//  })
// .catch(function(e){
// 	console.log('Có lỗi xảy ra!');
// });

function openCallingDialog() {
  $('.calling-window').css('display', 'block');
};

function closeCallingDialog() {
  $('.calling-window').css('display', 'none');
  return true;
}
