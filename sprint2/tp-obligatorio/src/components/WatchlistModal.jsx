
const WatchlistModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const movies = [
        { id: 1, title: "Inception", image: "URL de la imagen" },
        { id: 2, title: "Interstellar", image: "URL de la imagen" },
        { id: 3, title: "The Dark Knight", image: "URL de la imagen" },
        ];
        
  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Ver mi lista</button>
      {isModalOpen && <WatchlistModal watchlist={watchlist} onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}

export default WatchlistModal
