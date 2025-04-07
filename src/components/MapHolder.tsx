
import React from 'react';
import Map from './Map';
import { cn } from '@/lib/utils';

interface MapHolderProps {
  layout: 'single' | 'side-by-side' | 'grid';
  className?: string;
}

/**
 * MapHolder component that supports different layouts for displaying maps:
 * - single: Shows one map taking the full container
 * - side-by-side: Shows two maps side by side
 * - grid: Shows four maps in a 2x2 grid
 */
export function MapHolder({ layout = 'single', className }: MapHolderProps) {
  return (
    <div 
      className={cn(
        "w-full h-full grid gap-2 p-2",
        layout === 'single' && "grid-cols-1",
        layout === 'side-by-side' && "grid-cols-2",
        layout === 'grid' && "grid-cols-2 grid-rows-2",
        className
      )}
    >
      {/* Single layout */}
      {layout === 'single' && (
        <div className="rounded-md overflow-hidden border">
          <Map 
            center={[35.7, 139.7]} 
            zoom={10} 
          />
        </div>
      )}
      
      {/* Side-by-side layout */}
      {layout === 'side-by-side' && (
        <>
          <div className="rounded-md overflow-hidden border">
            <Map 
              center={[35.7, 139.7]} 
              zoom={9}
            />
          </div>
          <div className="rounded-md overflow-hidden border">
            <Map 
              center={[34.7, 135.5]} // Osaka
              zoom={9}
            />
          </div>
        </>
      )}
      
      {/* Grid layout */}
      {layout === 'grid' && (
        <>
          <div className="rounded-md overflow-hidden border">
            <Map 
              center={[35.7, 139.7]} // Tokyo
              zoom={8} 
            />
          </div>
          <div className="rounded-md overflow-hidden border">
            <Map 
              center={[34.7, 135.5]} // Osaka
              zoom={8} 
            />
          </div>
          <div className="rounded-md overflow-hidden border">
            <Map 
              center={[43.1, 141.3]} // Sapporo
              zoom={8} 
            />
          </div>
          <div className="rounded-md overflow-hidden border">
            <Map 
              center={[33.6, 130.4]} // Fukuoka
              zoom={8} 
            />
          </div>
        </>
      )}
    </div>
  );
}

export default MapHolder;
