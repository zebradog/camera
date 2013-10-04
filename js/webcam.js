/**
 * @author Matt Cook, ZEBRADOG / matt@zebradog.com
 */

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
window.URL = window.URL || window.webkitURL;

/* use a <video> element to display webcam input
id = id attribute of video element
*/
function webcam(id){
  var camvideo = document.getElementById(id);

  if (!navigator.getUserMedia)  console.error('navigator.getUserMedia() is not available.');
  else {
    navigator.getUserMedia({video: true}, gotStream, noStream);
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
  }
}