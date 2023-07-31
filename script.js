let now_playing = document.querySelector('.now-playing');
let track_art= document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_silder = document.querySelector('.seek_silder');
let volume_silder = document.querySelector('.volume_silder');
let curr_time = document.querySelector('.current-time');
let total_duration =document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
isPlaying = false;
isRandom = false;
let updateTimer;
const music_list = [
   
    {
        imge : 'images /paldo.jpg',
        name : 'pal do pal ki ',
        artist : 'Ayan Danrajkill',
        music : 'music/paldo.mp3'
    }, {
      
        name : 'Tara Hony laga hon ',
        artist : 'Ayan Danrajkill',
        music : 'music/tara-hona.mp3'
    }, {
      
        name : 'Khamoshan awaz hy ',
        artist : 'Ayan Danrajkill',
        music : 'music/khaoo.mp3'
    },
    {
        img : 'images/kina-sona.jpg',
        name : 'Kina Sona Kina Sona ',
        artist : 'Jubin india',
        music : 'music/kina-sona.mp3'
    },
    {
        img : 'images/jen-jen.jpg',
        name : 'Jena Jena ',
        artist : 'Atif Aslam',
        music : 'music/jen-jen.mp3'
    }
];
loadTrack( track_index);

function loadTrack( track_index){
clearInterval(updateTimer);
reset ();

curr_track.src = music_list[ track_index].music;
curr_track.load();

track_art.style.backgroundImge = "url(" + music_list[ track_index].img + ")";
track_name.textContent = music_list[ track_index].name;
track_artist.textContent = music_list[ track_index].artist;
now_playing.textContent = "PLAYING X OF Y" + ( track_index + 1) + " of " + music_list.length;

updateTimer = setInterval(setupdate, 1000);
 
curr_track.addEventListener('ended', nextTrack);
random_bg_color();
}

function random_bg_color(){
    let hex = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    let angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ', ' + Color1 + ',' + Color2 + ")";
    document.body.style.background = gradient;

}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_silder.value = 0;

}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function  playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function  pauseRandom(){
    isRandom = false;
    randomIcon.classList.add('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class= "fa fa-pause-circle fa-4x"></i>';

}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class= "fa fa-play-circle fa-4x"></i>';
}
function prevTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_artist += 1;

    }else if (track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}

function nextTrack(){
    if(track_index > 0){
        track_index -= 1;

    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_silder.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_silder.value / 100;
}
function setupdate(){
seekPosition = 0;
if(!isNaN(curr_track.duration)){
    seekPosition = curr_track.currentTime *(100 / curr_track.duration);
    seek_silder.value = seekPosition;
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration  - durationMinutes * 60);
if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
if(durationSeconds< 10) {durationSeconds = "0" + durationSeconds; }
if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
if( durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

curr_time.textContent = currentMinutes + ":" + currentSeconds;
total_duration.textContent = durationMinutes + ":" + durationMinutes;
}

}