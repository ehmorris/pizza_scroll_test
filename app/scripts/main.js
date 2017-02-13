const player_settings = {
  modestbranding: 1,
  rel: 0,
  showinfo: 0,
  loop: 0,
  playsinline: 0,
  controls: 0,
  autoplay: 0,
};

let video_list = [
  {
    id: 'rZojgVucBTA',
    duration: 108,
    $container: null,
    container_height: null,
    container_top_offset: null
  },
  {
    id: 'YFO1Wrkk6Bs',
    duration: 1663,
    $container: null,
    container_height: null,
    container_top_offset: null
  },
  {
    id: 'zg9FIwCmx5w',
    duration: 143,
    $container: null,
    container_height: null,
    container_top_offset: null
  }
];

let player = null;
let player_is_initialized, player_being_initialized = false;
let video = null;
let new_video_loaded = false;
let scrolling_stopped = null;

let clip_number = (n) => {
  return Math.min(Math.max(n, .01), .99);
}

let activate_focus_mode = () => {
  $('body').addClass('video_in_focus');
}

let deactivate_focus_mode = () => {
  $('body').removeClass('video_in_focus');
}

let new_youtube_player = (element_id, video_id, callback, on_state_change) => {
  return new YT.Player(element_id, {
    videoId: video_id,
    playerVars: player_settings,
    events: {
      'onReady': callback,
      'onStateChange': on_state_change
    }
  });
}

let set_video_values = () => {
  console.group('video_values');
  if (!video.container_height) {
    console.log(`video.container_height = ${video.$container.height()}`);
    video.container_height = video.$container.height();
  }

  if (!video.container_top_offset) {
    console.log(`video.container_top_offset = ${video.$container.offset().top}`);
    video.container_top_offset = video.$container.offset().top;
  }

  console.groupEnd();
}

let seek_player = () => {
  let element_scroll_distance =
    window.scrollY - video.container_top_offset;
  let percent_scrolled =
    clip_number(element_scroll_distance / video.container_height);

  player.seekTo(video.duration * percent_scrolled, true);

  activate_focus_mode();
  if (scrolling_stopped) window.clearTimeout(scrolling_stopped);
  scrolling_stopped = window.setTimeout(deactivate_focus_mode, 300);
}

let hide_video = () => {
  $('.video').addClass('video--hide');
}

let unhide_video = () => {
  window.setTimeout(() => {
    $('.video').removeClass('video--hide');
  });
}

let activate_article_video = ($article) => {
  let article_index = $('.article').index($article);
  video = video_list[article_index];

  console.log(`activate article ${article_index}, video ${video.id}`);

  if (!video.$container) {
    video.$container = $article;
  }

  if (!player_is_initialized && !player_being_initialized) {
    player_being_initialized = true;
    console.log(`player being initialized with ${video.id}`);
    player = new_youtube_player('video_element', video.id, () => {
      console.log('player done initializing');
      player_is_initialized = true;
      player_being_initialized = false;
      set_video_values();
      window.addEventListener('scroll', seek_player);
    }, ({data: state}) => {
      let ended = 0, unstarted = -1;

      if (state === ended || state === unstarted) hide_video();
      else unhide_video();
    });
  } else if (player_is_initialized && !player_being_initialized) {
    console.log(`player.loadVideoById(${video.id})`);
    player.loadVideoById(video.id);
    set_video_values();
  }
}

window.onYouTubeIframeAPIReady = () => {
  $('.article').each(function() {
    let $article = $(this);

    new Waypoint.Inview({
      element: $(this)[0],
      enter: () => {
        activate_article_video($article);
      }
    });
  });
};
