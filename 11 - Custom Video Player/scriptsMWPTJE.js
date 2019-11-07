// get elments on the page
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
// build functions
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
// toggle play button
function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}
// skip forwards or backwards
function skip() {
  // console.log(this.dataset);
  video.currentTime += parseFloat(this.dataset.skip);
}
// handle video volume and playback rate using sliders
function handleRangeUpdate() {
  // console.log(this.value);
  video[this.name] = this.value;
}
// set up progress bar voor video timmer
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
// scrub the video fowards or backwards
function scrub(e) {
  // console.log(e);
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
// hook up the event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);
toggle.addEventListener("click", togglePlay);
skipButtons.forEach(button => button.addEventListener("click", skip));
ranges.forEach(button => button.addEventListener("change", handleRangeUpdate));
ranges.forEach(button =>
  button.addEventListener("mousemove", handleRangeUpdate)
);
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", e => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
