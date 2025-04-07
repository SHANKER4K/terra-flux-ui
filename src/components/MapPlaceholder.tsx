
import React, { useState } from 'react';
import MapHolder from './MapHolder';
import MapControlPanel from './MapControlPanel';

export function MapPlaceholder() {
  const [layout, setLayout] = useState<'single' | 'side-by-side' | 'grid'>('single');
  
  return (
    <div className="flex h-full">
      <div className="flex-1">
        <MapHolder layout={layout} />
      </div>
      <div className="w-72 p-2">
        <MapControlPanel 
          layout={layout} 
          onLayoutChange={(newLayout) => setLayout(newLayout)} 
        />
      </div>
    </div>
  );
}

export default MapPlaceholder;
