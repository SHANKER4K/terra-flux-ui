
import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, ZoomControl, useMap } from 'react-leaflet';
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

// This is a separate component to handle map controls
// that need access to the map instance
const MapResetControl = () => {
  const map = useMap();
  
  const resetView = () => {
    map.setView([15, 30], 3);
  };

  return (
    <div className="absolute bottom-4 right-4 z-10">
      <Button 
        variant="outline" 
        size="icon" 
        className="h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm"
        onClick={resetView}
      >
        <RotateCw className="h-4 w-4" />
        <span className="sr-only">Reset map view</span>
      </Button>
    </div>
  );
};

const Map = ({ className }: MapProps) => {
  const { toast } = useToast();
  const mapCenter: L.LatLngExpression = [15, 30]; // Centered on Africa/Middle East region
  const zoomLevel = 3;

  useEffect(() => {
    // Show toast when map loads
    toast({
      title: "Map loaded successfully",
      description: "The Stamen Terrain map is now ready to use",
    });
  }, [toast]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <MapContainer 
        center={mapCenter}
        zoom={zoomLevel}
        zoomControl={false}
        className="w-full h-full z-0"
      >
        <TileLayer
          url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png"
          attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ZoomControl position="topright" />
        <MapResetControl />
      </MapContainer>
    </div>
  );
};

export default Map;
