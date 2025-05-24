import React from \'react\';
import useGameStore from \'../store/useGameStore\'; // Assuming the store is in ../store

const WorldMap: React.FC = () => {
  const goToScene = useGameStore((state) => state.goToScene);

  // TODO: Replace with actual background image/styling
  const backgroundStyle = {
    width: \'100%\',
    height: \'100vh\',
    backgroundColor: \'#87CEEB\', // Sky blue placeholder
    position: \'relative\',
    overflow: \'hidden\',
    // TODO: Add background image here, e.g., backgroundImage: \'url(/assets/images/world_map_bg.png)\'
    backgroundSize: \'cover\',
    backgroundPosition: \'center\',
  };

  // Basic style for touchable zones
  const zoneStyle: React.CSSProperties = {
    position: \'absolute\',
    width: \'100px\', // Placeholder size
    height: \'100px\', // Placeholder size
    backgroundColor: \'rgba(255, 255, 255, 0.5)\', // Semi-transparent white placeholder
    borderRadius: \'10px\',
    display: \'flex\',
    justifyContent: \'center\',
    alignItems: \'center\',
    cursor: \'pointer\',
    transition: \'transform 0.2s ease-in-out\',
    // TODO: Add placeholder image here, e.g., backgroundImage: \'url(/assets/images/icon.png)\'
    backgroundSize: \'cover\',
    backgroundPosition: \'center\',
  };

  // Hover/Tap effect
  const hoverEffect = (e: React.MouseEvent<HTMLDivElement>, scale: number) => {
    (e.target as HTMLDivElement).style.transform = \`scale(\${scale})\`;
  };

  return (
    <div style={backgroundStyle}>
      {/* TODO: Position zones correctly on the map */}
      <div
        style={{ ...zoneStyle, top: \'20%\', left: \'10%\' }}
        onMouseEnter={(e) => hoverEffect(e, 1.1)}
        onMouseLeave={(e) => hoverEffect(e, 1)}
        onClick={() => goToScene(\'house\')}
      >
        {/* TODO: Replace with House icon */}
        House Zone
      </div>

      <div
        style={{ ...zoneStyle, top: \'50%\', left: \'45%\' }}
        onMouseEnter={(e) => hoverEffect(e, 1.1)}
        onMouseLeave={(e) => hoverEffect(e, 1)}
        onClick={() => goToScene(\'pond\')}
      >
        {/* TODO: Replace with Pond icon */}
        Pond Zone
      </div>

      <div
        style={{ ...zoneStyle, top: \'30%\', left: \'80%\' }}
        onMouseEnter={(e) => hoverEffect(e, 1.1)}
        onMouseLeave={(e) => hoverEffect(e, 1)}
        onClick={() => goToScene(\'farm\')}
      >
        {/* TODO: Replace with Farm icon */}
        Farm Zone
      </div>
    </div>
  );
};

export default WorldMap;
