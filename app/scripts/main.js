
var cam = {
    el: document.getElementById('webcam'),
    addPlayer: function() {
        navigator.getMedia = 
            navigator.getUserMedia || 
            navigator.webkitGetUserMedia || 
            navigator.mozGetUserMedia || 
            navigator.msGetUserMedia;

        navigator.getMedia({
            video: true,
            audio: true
        }, function(localMediaStream) {
            cam.el.src = window.URL.createObjectURL(localMediaStream);
            
            cam.el.onloadedmetadata = function(e) {
                console.log('Something happened. Do some stuff');
            };
        }, function(e) {
            if (e.code === 1) {
              console.log('User declined permissions.');
            }
        });
    },
    pauseMedia: function(el) {
        el.pause();
    },
    playMedia: function(el) {
        el.play();
    },
    applyFilter: function(effect) {
        cam.el.className = effect;
        // cam.el.style.webkitFilter = 'effect(100)';
    }
};

$(document).ready(function() {
    cam.addPlayer();
    $('#pause').on('click', function(e) {
        e.preventDefault();
        cam.pauseMedia(cam.el);
    });
    $('#play').on('click', function(e) {
        e.preventDefault();
        cam.playMedia(cam.el);
    });
    $('#style').on('change', function(e) {
        e.preventDefault();
        cam.applyFilter($(this).val());
    });
});

