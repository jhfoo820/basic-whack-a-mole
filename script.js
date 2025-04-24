let score = 0;
let timeRemaining = 10;
let currentMole = null;
let gameActive = false;
let countdownTimer = null;
let moleInterval = null;
const holeImage = 'assets/hole.png';
const moleImage = 'assets/mole.png';

function createGrid() {
  const grid = document.getElementById('gameGrid');
  grid.innerHTML = '';  // Clear previous grid content

  for (let i = 0; i < 16; i++) {
    const moleHoleContainer = document.createElement('div');
    moleHoleContainer.classList.add('mole-hole-container');
    
    const moleHole = document.createElement('div');
    moleHole.classList.add('mole-hole');

    const mole = document.createElement('div');
    mole.classList.add('mole');  // Ensure mole is created, but not added yet.

    moleHoleContainer.appendChild(moleHole);
    moleHoleContainer.appendChild(mole);
    grid.appendChild(moleHoleContainer);
  }
}


function randomHole() {
  const holes = document.querySelectorAll('.mole-hole');
  return holes[Math.floor(Math.random() * holes.length)];
}

function showMole() {
  if (!gameActive || currentMole) return; // prevent multiple moles
  
  const holes = document.querySelectorAll('.mole-hole');
  const randomHole = holes[Math.floor(Math.random() * holes.length)];
  
  const mole = document.createElement('div');
  mole.classList.add('mole');
  mole.style.backgroundImage = `url('${moleImage}')`;  // Set the mole image dynamically
  
  randomHole.appendChild(mole);  // Attach the mole to a random hole
  currentMole = mole;

  mole.classList.add('show');  // Make mole visible

  const removeTimeout = setTimeout(() => {
    if (mole.classList.contains('show')) {
      mole.classList.remove('show');
      setTimeout(() => {
        if (mole.parentElement) mole.parentElement.removeChild(mole);
        if (currentMole === mole) currentMole = null;
      }, 200);
    }
  }, 1000);

  mole.addEventListener('click', (e) => {
    if (!gameActive || e.target !== mole || !mole.classList.contains('show')) return;

    clearTimeout(removeTimeout);
    score++;
    document.getElementById('scoreDisplay').textContent = score;

    mole.classList.remove('show');
    setTimeout(() => {
      if (mole.parentElement) mole.parentElement.removeChild(mole);
      if (currentMole === mole) currentMole = null;
    }, 200);
  });
}


function updateTimer() {
  document.getElementById('timerDisplay').textContent = timeRemaining;
  if (timeRemaining <= 0) {
    endGame();
  } else {
    timeRemaining--;
  }
}

function startGame() {
  // Clean up any leftover mole
  if (currentMole) {
    currentMole.style.display = 'none';
    currentMole = null;
  }

  // Reset core game state
  score = 0;
  timeRemaining = 10;
  gameActive = true;

  // Update UI
  document.getElementById('scoreDisplay').textContent = score;
  document.getElementById('timerDisplay').textContent = timeRemaining;
  document.getElementById('finalScorePopup').classList.add('hidden');
  document.getElementById('startButton').style.display = 'none';

  // Create grid again (rebuild holes and moles)
  createGrid();

  // Start timers
  clearInterval(countdownTimer);
  clearInterval(moleInterval);
  countdownTimer = setInterval(updateTimer, 1000);
  moleInterval = setInterval(showMole, 1200);
}

function endGame() {
  gameActive = false;
  clearInterval(countdownTimer);
  clearInterval(moleInterval);

  // Hide current mole if still visible
  if (currentMole) {
    currentMole.style.display = 'none';
    currentMole = null;
  }

  // Show final score
  document.getElementById('finalScoreDisplay').textContent = score;
  document.getElementById('finalScorePopup').classList.remove('hidden');
  document.getElementById('startButton').style.display = 'block';
}
