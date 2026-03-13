const ArtworkCard = ({ artwork, onClick }) => (
  <button
    type="button"
    className="art-card"
    onClick={() => onClick && onClick(artwork)}
    aria-label={`View ${artwork.title}`}
  >
    <img src={artwork.imageUrl} alt={artwork.title} loading="lazy" />
    <div className="art-meta">
      <h4>{artwork.title}</h4>
      <p className="tag">{artwork.category}</p>
    </div>
  </button>
);

export default ArtworkCard;
