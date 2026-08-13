const music = document.querySelector('audio');
const img = document.querySelector('img');
const artist = document.getElementById("artist");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const title = document.getElementById("title");
const play = document.getElementById("play");
let current_tIme = document.getElementById("currenttime");
let total_duration = document.getElementById("total_duration");
let myProgressbar = document.getElementById('myProgressbar');


const songs = [
  { name: "Baazi" , artist:"King"},
  { name: "Maan meri jaan" , artist:"King Hits"},
  { name: "PICASSO" , artist:"King"},
  { name: "Sinner" , artist:"King Hits"},
]

let isPlaying =false;
play.addEventListener("click",()=>{
  if(isPlaying){
    pauseMusic();
  }
  else{
    playMusic();
  }
})


const playMusic = ()=>{
  isPlaying = true;
  music.play();
  play.classList.replace("fa-play-circle" , "fa-pause-circle");
  img.classList.add("anime");
};

const pauseMusic = ()=>{
  isPlaying = false;
  music.pause();
  play.classList.replace("fa-pause-circle" , "fa-play-circle");
  img.classList.remove("anime");
};


const loadSong = (songs) =>{
  title.textContent = songs.name;
  artist.textContent = songs.artist;
  music.src = `songs/${songs.name}.mp3`;
  img.src = `covers/${songs.name}.jpg`;
}
songIndex = 0;

const nextSong = () =>{
  myProgressbar.value = 0;
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();

}
const prevSong = () =>{
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();

}
myProgressbar.addEventListener('change',()=>{
  music.currentTime = myProgressbar.value * music.duration/100;
})

setInterval(music.addEventListener('timeupdate', (event) => {
  const { currentTime, duration } = event.srcElement;

  if (duration) {
      let progress_time = (currentTime / duration) * 100;
      myProgressbar.value = parseInt(progress_time);

      let min_duration = Math.floor(duration / 60);
      let sec_duration = Math.floor(duration % 60);
      sec_duration = sec_duration < 10 ? `0${sec_duration}` : sec_duration;
      total_duration.textContent = `${min_duration}:${sec_duration}`;

      if (currentTime) {
        let min_currentTime = Math.floor(currentTime / 60);
        let sec_currentTime = Math.floor(currentTime % 60);
        sec_currentTime = sec_currentTime < 10 ? `0${sec_currentTime}` : sec_currentTime;
        current_tIme.textContent = `${min_currentTime}:${sec_currentTime}`;
      }

  } else {
      myProgressbar.value = 0;
  }
}), 500);






music.addEventListener("ended",nextSong)
next.addEventListener("click",nextSong);
prev.addEventListener("click",prevSong);
