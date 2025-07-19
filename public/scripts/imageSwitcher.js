document.addEventListener("DOMContentLoaded", () => {
  // Seleccionamos todos los elementos con la clase 'switch-img' para aplicar el comportamiento a cada uno
  document.querySelectorAll('.switch-img').forEach((imgEl) => {

    // Encontramos el contenedor más cercano con un atributo 'id' único
    const container = imgEl.closest('[id]');
    if (!container) return;  // Si no se encuentra un contenedor, salimos de la función

    // Obtenemos las imágenes a mostrar desde el atributo 'data-images' (en formato JSON)
    const images = JSON.parse(container.dataset.images);

    // Obtenemos el intervalo de cambio de imagen (en segundos)
    const interval = parseInt(container.dataset.interval, 10);

    let current = 0;  // Índice de la imagen actual
    let timeLeft = interval;  // Temporizador para el cambio automático de imagen

    // Función para aplicar el efecto de glitch a la imagen
    function animateGlitch(callback) {
      // Añadimos un efecto visual para simular un "glitch"
      imgEl.style.transition = "transform 0.2s ease-in-out, filter 0.2s ease-in-out";
      imgEl.style.filter = "contrast(150%) brightness(120%)";
      imgEl.style.transform = `translateX(${Math.random() * 10 - 5}px) translateY(${Math.random() * 10 - 5}px)`;

      // Esperamos 200 ms para ejecutar el cambio de imagen
      setTimeout(() => {
        callback();  // Cambiar la imagen después del glitch
        imgEl.style.transform = "translateX(0) translateY(0)";  // Resetear la transformación
        imgEl.style.filter = "none";  // Restablecer el filtro
      }, 200);

      // Cambiar el color aleatoriamente para intensificar el glitch
      setTimeout(() => {
        imgEl.style.filter = `hue-rotate(${Math.random() * 30}deg)`;  // Desplazamiento aleatorio de matiz
      }, 100);
    }

    // Función para cambiar la imagen actual
    function updateImage() {
      // Actualizamos el índice de la imagen actual y lo mantenemos dentro de los límites
      current = (current + 1) % images.length;

      // Aplicamos el efecto glitch y cambiamos la imagen
      animateGlitch(() => {
        imgEl.src = images[current];  // Actualizamos la imagen
      });

      // Reiniciamos el temporizador después de cambiar la imagen
      resetTimer();
    }

    // Función para resetear el temporizador
    function resetTimer() {
      timeLeft = interval;
    }

    // Añadimos un evento de clic para cambiar la imagen manualmente al hacer clic en la imagen
    imgEl.addEventListener("click", updateImage);

    // Contador que se ejecuta cada segundo para disminuir el temporizador
    setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        updateImage();  // Si el temporizador llega a cero, cambiamos la imagen automáticamente
      }
    }, 1000);
  });
});
