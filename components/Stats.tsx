import React from 'react';
import MagicBento from './ui/MagicBento';

export default function StatsSection() {
  return (
    <div className="bg-black relative overflow-hidden w-full py-20">
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-8">
        <MagicBento 
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="255, 255, 255"
        />
      </div>
    </div>
  );
}