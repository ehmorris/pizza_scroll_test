var video = $('video')[0];
var video_duration;
var document_height = $(document).height();
var window_height = window.innerHeight;

video.addEventListener('loadeddata', function() {
  video_duration = video.duration;
});

video.addEventListener('canplay', function() {
  window.addEventListener('scroll', function(event) {
    var percent_scrolled = window.scrollY / (document_height - window_height);

    var seek_in_seconds = video_duration * percent_scrolled;

    video.currentTime = seek_in_seconds;

    video.play();
  });
});

$('p').on('mouseover', function() {
  $('body').addClass('reading').removeClass('not_reading');
});

$('p').on('mouseout', function() {
  $('body').addClass('not_reading').removeClass('reading');
});
