type MusicCardProps = {
  trackName?: string;
  previewUrl?: string;
};

function MusicCard({ trackName = '', previewUrl = '' }:MusicCardProps) {
  return (
    <>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
      </audio>
    </>
  );
}

export default MusicCard;
