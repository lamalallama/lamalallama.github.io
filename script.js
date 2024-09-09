document.addEventListener("DOMContentLoaded", function () {
  const audioPlayer = document.getElementById("audioPlayer");
  const songs = [
    {
      src: "resources/audio/Any Way You Want It.mp3",
      name: "Any Way You Want It",
    },
    { src: "resources/audio/Pretty Woman.mp3", name: "Pretty Woman" },
    {
      src: "resources/audio/Come and Get Your Love.mp3",
      name: "Come and Get Your Love",
    },
    { src: "resources/audio/Livin On A Prayer.mp3", name: "Livin On A Prayer" },
    {
      src: "resources/audio/Loosing My Religion.mp3",
      name: "Loosing My Religion",
    },
    { src: "resources/audio/Love Me Two Times.mp3", name: "Love Me Two Times" },
  ];
  let currentSongIndex = 0;

  const image3 = document.querySelector(".menuDisc");
  const hoverMessage = document.getElementById("hoverMessage");

  // Function to display current song name on hover
  image3.addEventListener("mouseenter", function () {
    const currentSongName = songs[currentSongIndex].name;
    hoverMessage.textContent = "Currently playing: " + currentSongName;
    hoverMessage.classList.add("show");
  });

  // Function to fade out the message when the user stops hovering
  image3.addEventListener("mouseleave", function () {
    hoverMessage.classList.remove("show");
  });

  // Function to cycle to the next song on click
  image3.addEventListener("click", function () {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    const nextSongSrc = songs[currentSongIndex].src;
    const nextSongName = songs[currentSongIndex].name;
    audioPlayer.src = nextSongSrc;
    audioPlayer.play();
    hoverMessage.textContent = "Currently playing: " + nextSongName;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Function to generate random position for image
  function getRandomPosition() {
    // Get window width and height
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calculate random x and y positions
    const posX = Math.floor(Math.random() * (windowWidth - 100)); // 100 is the width of the image
    const posY = Math.floor(Math.random() * (windowHeight - 100)); // 100 is the height of the image

    return { x: posX, y: posY };
  }

  // Function to set random position for image
  function setRandomPosition(image) {
    const randomPosition = getRandomPosition();
    image.style.left = randomPosition.x + "px";
    image.style.top = randomPosition.y + "px";
  }

  // Get both imageCat elements
  const imageCats = document.querySelectorAll(".imageCat");

  // Set random position for one of the imageCat elements
  setRandomPosition(imageCats[Math.floor(Math.random() * imageCats.length)]);

  // Update position every 5 seconds for the randomly positioned imageCat element
  setInterval(function () {
    setRandomPosition(imageCats[Math.floor(Math.random() * imageCats.length)]);
  }, 5000);
});
