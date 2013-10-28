/**
 * @author Matt Cook, ZEBRADOG / matt@zebradog.com
 */

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
window.URL = window.URL || window.webkitURL;

var webcam = {};

webcam.sources = [];


webcam.updateSources = function(callback){
  webcam.sources = [];
  if(typeof(MediaStreamTrack.getSources) != "undefined"){
    MediaStreamTrack.getSources(function(s){
      for(var i = 0; i < s.length; i++){
        if(s[i].kind == 'video')
          webcam.sources.push(s[i].id);
      }
      callback(webcam.sources);
    });
  }else{
    webcam.sources.push(null);
    callback(webcam.sources);
  }
};

/* use a <video> element to display webcam input
id = id attribute of video element
sid = optional source id to specify webcam
*/
webcam.start = function(id,sid){
  var camvideo = document.getElementById(id);

  if (!navigator.getUserMedia)  console.error('navigator.getUserMedia() is not available.');
  else {
    if(sid) navigator.getUserMedia({video: {optional: [{sourceId: sid}]}}, gotStream, noStream);
    else navigator.getUserMedia({video: true}, gotStream, noStream);
  }

  function gotStream(stream) 
  {
    if (window.URL) camvideo.src = window.URL.createObjectURL(stream);   
    else  camvideo.src = stream; // Opera
    camvideo.onerror = function(e) {  stream.stop();  };
    stream.onended = noStream;
  }

  function noStream(e) 
  {
    var msg = 'No camera available.';
    if (e.code == 1) msg = 'User denied access to use camera.'; 
    console.error(msg);
    console.error(e);
  }
}