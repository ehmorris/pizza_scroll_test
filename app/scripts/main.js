let video, video_duration, document_height, window_height;

let get_browser_dimensions = function() {
  document_height = $(document).height();
  window_height = window.innerHeight;
}();

let get_video_element = function() {
  video = $('.video .video-element')[0];
}();

video.addEventListener('loadeddata', function() {
  video_duration = video.duration;
});

let play_or_pause_video = _.debounce(function(percent_scrolled, video) {
  if (percent_scrolled < .9) {
    console.log('play');
    video.play();
  } else {
    console.log('pause');
    video.pause();
  }
}, 100);

video.addEventListener('canplay', function() {
  let scrollable_height = document_height - window_height;
  let scroll_event_count = 0;

  window.addEventListener('scroll', function() {
    scroll_event_count = scroll_event_count + 1;

    if (!!(scroll_event_count % 2)) {
      let percent_scrolled = window.scrollY / scrollable_height;
      let percent_video_duration = video_duration * percent_scrolled;
      video.currentTime = percent_video_duration;

      console.log('scroll');

      play_or_pause_video(percent_scrolled, video);
    }
  });
});

let activate_reading_mode = function() {
  $('body').addClass('reading').removeClass('watching');
};

let deactivate_reading_mode = function() {
  $('body').addClass('watching').removeClass('reading');
};

$('.article').on('mouseover', activate_reading_mode);
$('.article').on('mouseout', deactivate_reading_mode);

$('body').on('touchstart', activate_reading_mode);
$('body').on('touchend', deactivate_reading_mode);
