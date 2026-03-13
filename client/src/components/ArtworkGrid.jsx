import { useState } from 'react';
import ArtworkCard from './ArtworkCard';
import ImageViewer from './ImageViewer';

const ArtworkGrid = ({ artworks }) => {
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  return (
    <>
      <div className="art-grid">
        {artworks.map((art) => (
          <ArtworkCard key={art._id} artwork={art} onClick={(item) => setSelectedArtwork(item)} />
        ))}
      </div>
      {selectedArtwork && (
        <ImageViewer artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
      )}
    </>
  );
};

export default ArtworkGrid;
