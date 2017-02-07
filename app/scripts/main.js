let iframe = document.querySelector('iframe');
let player = new Vimeo.Player(iframe);
let video_duration = null;

let clip_number = (n) => {
  return Math.min(Math.max(n, .01), .99);
}

let seek_player = () => {
  let container_height = 1856;
  let element_scroll_distance = window.scrollY;
  let percent_scrolled =
    clip_number(element_scroll_distance / container_height);
  let seek_time = video_duration * percent_scrolled;

  console.log(`player.setCurrentTime(${seek_time})`);

  player.setCurrentTime(seek_time).then(function(seconds) {
    console.log('setCurrentTime() success');
    player.pause();
  }).catch(function(error) {
    console.log(`error: ${error}`);
  });
}

player.getDuration().then(function(duration) {
  video_duration = duration;
  window.addEventListener('scroll', seek_player);
});
