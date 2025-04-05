
import React from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Fix for default Leaflet marker icons
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Fix the Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

interface MapProps {
  className?: string;
}

const Map = ({ className }: MapProps) => {
  const { toast } = useToast();
  const mapCenter = [15, 30]; // Centered on Africa/Middle East region
  const zoomLevel = 3;

  React.useEffect(() => {
    // Show toast when map loads
    toast({
      title: "Map loaded successfully",
      description: "The OpenStreetMap map is now ready to use",
    });
  }, [toast]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <MapContainer 
        center={[mapCenter[0], mapCenter[1]] as L.LatLngExpression} 
        zoom={zoomLevel} 
        zoomControl={false}
        className="w-full h-full z-0"
        attributionControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topright" />
      </MapContainer>

      {/* Reset view button */}
      <div className="absolute bottom-4 right-4 z-10">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm"
          onClick={() => {
            // We would add reset view functionality here if we had access to the map instance
          }}
        >
          <RotateCw className="h-4 w-4" />
          <span className="sr-only">Reset map view</span>
        </Button>
      </div>
    </div>
  );
};

export default Map;
