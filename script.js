// Seleccionar elementos información disco
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

// Botones de reproducción de música
let playpause_btn = document.querySelector('.playpause-track'); 
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

// Deslizadores y elementos relacionados
let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');

// Otros elementos
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

// Lista de música
const music_list = [
  {
    img: 'images/discos-espana.jpg',
    name: 'Dark Cyberpunk Gaming',
    artist: 'Alex Productions',
    duration: '',
    music: 'music/Alex-Productions - Dark Cyberpunk Gaming midtempo _ Evil.mp3'
  },
  {
    img: 'images/mejores-albumes-historia-pink-floyd-dark-side-moon-1623775315.jpg',
    name: 'Electronic Dance Corporate',
    artist: 'Alex Productions',
    duration: '',
    music: 'music/Alex-Productions - Electronic Dance Corporate _ Fractures.mp3'
  },
  {
    img: 'images/mejores-discos-pop-bruno-mars-1626191751.jpg',
    name: 'Epic Sport Racing Car',
    artist: 'Alex Productions',
    duration: '',
    music: 'music/Alex-Productions - Epic Sport Racing Car _ DRIVE.mp3'
  }
];

// Cargar la pista inicial
loadTrack(track_index);

// Función para cargar una pista específica
function loadTrack(track_index) {
  // Limpiar el temporizador de actualización
  clearInterval(updateTimer); 
  // Restablecer el tiempo de reproducción
  reset(); 

  // Establecer la ruta del archivo de música
  curr_track.src = music_list[track_index].music; 
  // Cargar la pista
  curr_track.load(); 

   // Establecer imágen, nombre y artista de la canción
  track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  track_name.textContent = music_list[track_index].name; 
  track_artist.textContent = music_list[track_index].artist; 

  updateTimer = setInterval(setUpdate, 1000);

  // Escuchar el evento de finalización de la pista
  curr_track.addEventListener('ended', nextTrack);
}

// Función para restablecer el tiempo de reproducción y la búsqueda
function reset() {
  // Establecer el tiempo actual a 00:00
  curr_time.textContent = "00:00";
  // Establecer la duración total a 00:00
  total_duration.textContent = "00:00"; 
  seek_slider.value = 0;
}

// Función para repetir la pista actual
function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index); // Cargar la pista actual
  playTrack(); // Reproducir la pista
}

// Función para reproducir o pausar la pista actual
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

// Función para reproducir la pista actual
function playTrack() {
  curr_track.play(); 
  isPlaying = true;
  track_art.classList.add('rotate');
   // Cambiar el icono a pausa
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

// Función para pausar la pista actual
function pauseTrack() {
  curr_track.pause(); 
  isPlaying = false;
  // Eliminar la clase de rotación de la imagen de la pista
  track_art.classList.remove('rotate'); 
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

// Función para avanzar a la siguiente pista
function nextTrack() {
  if (track_index < music_list.length - 1 && isRandom === false) {
    // Incrementar el índice de la pista
    track_index += 1; 
  } else {
    // Volver al inicio de la lista de música
    track_index = 0;
  }
  // Cargar la nueva pista
  loadTrack(track_index);
  // Pausar la reproducción tal y como pide el enunciado 
  pauseTrack(); 
}

// Función para retroceder a la pista anterior
function prevTrack() {
  if (track_index > 0) {
    // Decrementar el índice de la pista
    track_index -= 1; 
  } else {
    // Ir a la última pista de la lista de música
    track_index = music_list.length - 1; 
  }
  loadTrack(track_index); 
  pauseTrack();
}

// Función para saltar a una posición específica en la pista
function seekTo() {
    // Calcular la posición de búsqueda en segundos
  let seekto = curr_track.duration * (seek_slider.value / 100);
  // Establecer el tiempo actual de reproducción a la posición de búsqueda 
  curr_track.currentTime = seekto; 
}

// Función para ajustar el volumen de la pista
function setVolume() {
  // Establecer el volumen según el valor del deslizador de volumen
  curr_track.volume = volume_slider.value / 100; 
}

// Actualizar el tiempo de reproducción y el deslizador de búsqueda
function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    // Calcular la posición de búsqueda en porcentaje
    seekPosition = curr_track.currentTime * (100 / curr_track.duration); 
    // Actualizar el valor del deslizador de búsqueda
    seek_slider.value = seekPosition; 

    // Obtener los segundos y minutos actuales
    let currentMinutes = Math.floor(curr_track.currentTime / 60); 
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    // Formatear los valores de tiempo en un formato de dos dígitos (por ejemplo, 00:00)
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    // Actualizar el tiempo actual de reproducción
    curr_time.textContent = currentMinutes + ":" + currentSeconds; 
    // Actualizar la duración total de la pista
    total_duration.textContent = durationMinutes + ":" + durationSeconds; 
  }
}
