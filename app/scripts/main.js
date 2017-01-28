var player, total_height, window_height, total_duration;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });

  scroll_seek(player);
}

function onPlayerReady(event) {
  console.log('ready');
  event.target.playVideo();
  total_duration = player.getDuration()
}

function onPlayerStateChange(event) {
  console.log(event.data);
}

function getDimensions() {
  total_height = $(document).height();
  window_height = window.innerHeight;
}

function scroll_seek(player) {
  window.addEventListener('scroll', function(event) {
    getDimensions();
    var percent_scrolled = window.scrollY / (total_height - window_height);

    var seek_in_seconds = total_duration * percent_scrolled;

    player.seekTo(seek_in_seconds, true);
  });
};
