
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  center?: L.LatLngExpression;
  zoom?: number;
}

// Available base layers
export const baseLayers = {
  "OpenStreetMap": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  "GSI Standard": "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
  "GSI Pale": "https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
  "GSI English": "https://cyberjapandata.gsi.go.jp/xyz/english/{z}/{x}/{y}.png",
  "GSI Satellite": "https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg"
};

// Attribution for base layers
const attributions = {
  "OpenStreetMap": '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  "GSI Standard": '&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html">GSI Japan</a>',
  "GSI Pale": '&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html">GSI Japan</a>',
  "GSI English": '&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html">GSI Japan</a>',
  "GSI Satellite": '&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html">GSI Japan</a>'
};

// This is a separate component to handle map controls
function MapControls() {
  const [baseLayer, setBaseLayer] = useState<keyof typeof baseLayers>("OpenStreetMap");
  
  return (
    <div>
      <MapControlWithMap />
      <TileLayer
        url={baseLayers[baseLayer]}
        attribution={attributions[baseLayer]}
      />
    </div>
  );
}

// Separate component to use the useMap hook
function MapControlWithMap() {
  const map = useMap();
  
  const resetView = () => {
    map.setView([35.7, 139.7], 10);
  };

  return (
    <>
      {/* Layer Control */}
      <div className="absolute top-4 left-4 z-10 glass-panel p-3 rounded-lg">
        <Select 
          value="OpenStreetMap" 
          onValueChange={(value) => {
            // This will be handled by the parent component's state
            // This is just a placeholder for now
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select base layer" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(baseLayers).map((layer) => (
              <SelectItem key={layer} value={layer}>{layer}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Reset View Button */}
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
    </>
  );
}

const Map = ({ className, center = [35.7, 139.7], zoom = 10 }: MapProps) => {
  const { toast } = useToast();

  useEffect(() => {
    // Show toast when map loads
    toast({
      title: "Map loaded successfully",
      description: "The map is now ready to use",
    });
  }, [toast]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <MapContainer 
        center={center}
        zoom={zoom}
        zoomControl={false}
        className="w-full h-full z-0"
      >
        <ZoomControl position="topright" />
        <MapControls />
      </MapContainer>
    </div>
  );
};

export default Map;
