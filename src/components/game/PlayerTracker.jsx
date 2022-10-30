export const PlayerTracker = ({ cl, img, player }) => {
  return (
    <div className={cl}>
      <h3>{player.name}</h3>
      <p>{player.score}</p>
      <img src={img} alt="player logo" />
    </div>
  );
};
