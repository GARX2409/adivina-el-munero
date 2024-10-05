let randomNumber = Math.floor(Math.random() * 10) + 1;
let attempts = 3;

const winSound = document.getElementById("win-sound");
const failSound = document.getElementById("fail-sound");
const checkButton = document.getElementById("check-btn");

checkButton.addEventListener("click", function (event) {
  event.preventDefault(); // Evitar que la página se recargue
  const guess = parseInt(document.getElementById("guess").value); // Convertir a número

  // Verifica que el input no esté vacío y que sea un número válido
  if (isNaN(guess) || guess < 1 || guess > 10) {
    Swal.fire({
      title: "Error",
      text: "Por favor, ingresa un número válido entre 1 y 10.",
      icon: "error",
      confirmButtonText: "OK",
    });
    return;
  }

  attempts--;
  document.getElementById("remaining-attempts").innerText = attempts;

  if (guess === randomNumber) {
    launchConfettiAndBalloons();
    playSound(winSound);

    Swal.fire({
      title: "¡Increíble!",
      text: "¡Has adivinado el número! ¡Eres todo un genio!",
      icon: "success",
      confirmButtonText: "Jugar de nuevo",
      confirmButtonColor: "#28a745",
    }).then(() => {
      resetGame();
    });
  } else if (attempts > 0) {
    playSound(failSound);

    // Mensaje personalizado indicando si el número es mayor o menor
    let hint =
      guess < randomNumber ? "El número es mayor." : "El número es menor.";

    Swal.fire({
      title: "¡Casi!",
      text: `Ese no es el número. ${hint} Tienes ${attempts} intentos restantes.`,
      icon: "error",
      confirmButtonText: "Volver a intentar",
      confirmButtonColor: "#ff5733",
    });
  } else {
    playSound(failSound);

    Swal.fire({
      title: "¡Ups!",
      text: `Te has quedado sin intentos. El número era ${randomNumber}.`,
      icon: "warning",
      confirmButtonText: "Intentar de nuevo",
      confirmButtonColor: "#dc3545",
    }).then(() => {
      resetGame();
    });
  }
});

function launchConfettiAndBalloons() {
  // Lanzar confeti
  confetti({
    particleCount: 150,
    spread: 60,
    origin: { y: 0.6 },
  });

  // Crear globos en pantalla
  const balloon = document.createElement("div");
  balloon.className = "balloon";
  document.body.appendChild(balloon);

  setTimeout(() => {
    balloon.remove(); // Quitar el globo después de unos segundos
  }, 4000);
}

function playSound(audioElement) {
  audioElement.play();
}

function resetGame() {
  randomNumber = Math.floor(Math.random() * 10) + 1;
  attempts = 3;
  document.getElementById("remaining-attempts").innerText = attempts;
  document.getElementById("guess").value = "";
}
