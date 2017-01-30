var youtube_player, scrollable_height, video_duration;

let scroll_seek = (youtube_player) => {
  window.addEventListener('scroll', function() {
    var percent_scrolled = window.scrollY / scrollable_height;

    var seek_in_seconds = video_duration * percent_scrolled;

    youtube_player.seekTo(seek_in_seconds, true);
  });
};

window.onYouTubeIframeAPIReady = () => {
  youtube_player = new YT.Player('youtube_player', {
    events: {
      'onReady': on_ready,
      'onStateChange': on_state_change
    }
  });
}

let on_ready = () => {
  video_duration = youtube_player.getDuration();

  let get_browser_dimensions = function() {
    let document_height = $(document).height();
    let viewport_height = window.innerHeight;
    scrollable_height = document_height - viewport_height;
  }();

  scroll_seek(youtube_player);
}

let on_state_change = (state) => {
  if (state.data === -1) {
    $('.video-cover').removeClass('video-cover--black');
  }
}

let activate_video_focus_mode = () => {
  $('body').addClass('video_in_focus');
};

let deactivate_video_focus_mode = () => {
  $('body').removeClass('video_in_focus article_in_focus');
}

$('body').on('touchstart', activate_video_focus_mode);
$('body').on('touchend', deactivate_video_focus_mode);
