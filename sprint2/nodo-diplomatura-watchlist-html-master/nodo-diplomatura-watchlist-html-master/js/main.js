// @ts-nocheck
document.getElementById('currentYear').textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', () => {
  const openWatchlist = document.getElementById('openWatchlist');
  const watchlistModal = document.getElementById('watchlistModal');
  const closeModal = document.getElementById('closeModal');

  // Mostrar modal
  openWatchlist.addEventListener('click', () => {
    watchlistModal.classList.remove('hidden');
  });

  // Cerrar modal al hacer clic en la "X"
  closeModal.addEventListener('click', () => {
    watchlistModal.classList.add('hidden');
  });

  // Cerrar modal al hacer clic fuera del contenido
  watchlistModal.addEventListener('click', (e) => {
    if (e.target === watchlistModal) {
      watchlistModal.classList.add('hidden');
    }
  });
});
