const playerCar = document.getElementById('player-car');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('start-game');

let playerPosition = 140;
let obstaclePosition = -100;
let score = 0;
let speed = 5;
let gameRunning = false;

// Move player car with arrow keys
document.addEventListener('keydown', (e) => {
  if (!gameRunning) return; // Prevent movement if game hasn't started
  if (e.key === 'ArrowLeft' && playerPosition > 15) {
    playerPosition -= 20;
    playerCar.style.left = `${playerPosition}px`;
  }
  if (e.key === 'ArrowRight' && playerPosition < 260) {
    playerPosition += 20;
    playerCar.style.left = `${playerPosition}px`;
  }
});

// Game loop
function gameLoop() {
  if (!gameRunning) return; // Stop the game loop if game hasn't started

  obstaclePosition += speed;
  if (obstaclePosition > 300) {
    obstaclePosition = -125;
    obstacle.style.left = `${Math.floor(Math.random() * 265)}px`;
    score++;
    scoreDisplay.textContent = score;
    speed += 0.25; // Increase speed as the game progresses
  }
  
  obstacle.style.top = `${obstaclePosition}px`;

  // Collision detection
  const carRect = playerCar.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();
  
  if (
    carRect.left < obstacleRect.right &&
    carRect.right > obstacleRect.left &&
    carRect.top < obstacleRect.bottom &&
    carRect.bottom > obstacleRect.top
  ) {
    alert(`Game Over! Your score is ${score}`);
    gameRunning = false;
    obstaclePosition = -100;
    speed = 5;
    scoreDisplay.textContent = score;
  }

  requestAnimationFrame(gameLoop);
}

// Start the game when the button is clicked
startButton.addEventListener('click', () => {
  if(gameRunning == false)
    {
    obstacle.style.left = `${Math.floor(Math.random() * 265)}px`;
    score = 0;
    gameRunning = true;
    gameLoop(); // Start the game loop
  }
});