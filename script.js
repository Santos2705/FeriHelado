// Clave configurada para acceder
const CLAVE_CORRECTA = "Polar2026";

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", function() {
  verificarSesionGuardada();
});

function verificarAcceso() {
  const input = document.getElementById("pass-input").value;
  const errorMsg = document.getElementById("error-message");

  if (input === CLAVE_CORRECTA) {
    localStorage.setItem("accesoFerihelao", "true");
    desbloquearPantalla();
  } else {
    errorMsg.style.display = "block";
  }
}

function verificarSesionGuardada() {
  if (localStorage.getItem("accesoFerihelao") === "true") {
    desbloquearPantalla();
  }
}

function desbloquearPantalla() {
  const lockScreen = document.getElementById("lock-screen");
  const mainContent = document.getElementById("main-content");

  if (lockScreen) lockScreen.style.display = "none";
  if (mainContent) mainContent.style.display = "block";
}

function cerrarSesion() {
  localStorage.removeItem("accesoFerihelao");
  location.href = "index.html"; // Redirige al inicio bloqueado
}