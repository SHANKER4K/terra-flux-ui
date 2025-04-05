
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { RotateCw, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface MapProps {
  className?: string;
}

const Map = ({ className }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [showTokenInput, setShowTokenInput] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || mapboxToken.length < 5) return;

    try {
      // Initialize map
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        projection: 'globe',
        zoom: 1.5,
        center: [30, 15],
        pitch: 45,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add scale control
      map.current.addControl(
        new mapboxgl.ScaleControl(),
        'bottom-left'
      );

      // Disable scroll zoom for smoother experience
      map.current.scrollZoom.disable();

      // Add atmosphere and fog effects
      map.current.on('style.load', () => {
        map.current?.setFog({
          color: 'rgb(255, 255, 255)',
          'high-color': 'rgb(200, 200, 225)',
          'horizon-blend': 0.2,
        });

        toast({
          title: "Map loaded successfully",
          description: "The map is now ready to use",
        });
      });

      // Rotation animation settings
      const secondsPerRevolution = 240;
      const maxSpinZoom = 5;
      const slowSpinZoom = 3;
      let userInteracting = false;
      let spinEnabled = true;

      // Spin globe function
      function spinGlobe() {
        if (!map.current) return;
        
        const zoom = map.current.getZoom();
        if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
          let distancePerSecond = 360 / secondsPerRevolution;
          if (zoom > slowSpinZoom) {
            const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
            distancePerSecond *= zoomDif;
          }
          const center = map.current.getCenter();
          center.lng -= distancePerSecond;
          map.current.easeTo({ center, duration: 1000, easing: (n) => n });
        }
      }

      // Event listeners for interaction
      map.current.on('mousedown', () => {
        userInteracting = true;
      });
      
      map.current.on('dragstart', () => {
        userInteracting = true;
      });
      
      map.current.on('mouseup', () => {
        userInteracting = false;
        spinGlobe();
      });
      
      map.current.on('touchend', () => {
        userInteracting = false;
        spinGlobe();
      });

      map.current.on('moveend', () => {
        spinGlobe();
      });

      // Start the globe spinning
      spinGlobe();
    } catch (error) {
      console.error("Error initializing map:", error);
      toast({
        title: "Map initialization failed",
        description: "Please check your Mapbox token and try again",
        variant: "destructive",
      });
    }

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, toast]);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.length > 20) {
      setShowTokenInput(false);
      toast({
        title: "Token saved",
        description: "Initializing map with your Mapbox token",
      });
    } else {
      toast({
        title: "Invalid token",
        description: "Please provide a valid Mapbox token",
        variant: "destructive",
      });
    }
  };

  const resetToken = () => {
    setMapboxToken("");
    setShowTokenInput(true);
    if (map.current) {
      map.current.remove();
      map.current = null;
    }
  };

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      {showTokenInput ? (
        <div className="bg-card border rounded-lg p-6 shadow-lg w-full max-w-md z-10">
          <h3 className="text-xl font-semibold mb-4">Mapbox Token Required</h3>
          <p className="text-sm text-muted-foreground mb-4">
            To display the map, please enter your Mapbox public token. 
            You can get one from the <a href="https://account.mapbox.com/access-tokens/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Mapbox Dashboard</a>.
          </p>
          <form onSubmit={handleTokenSubmit} className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="token" className="text-sm">Mapbox Public Token</label>
              <input
                id="token"
                type="text" 
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                placeholder="pk.eyJ1IjoieW91..."
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <Button type="submit" className="w-full">
              Initialize Map
            </Button>
          </form>
        </div>
      ) : (
        <>
          <div ref={mapContainer} className="absolute inset-0" />
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute bottom-4 right-4 h-8 w-8 rounded-full z-10 bg-background/70 backdrop-blur-sm"
            onClick={resetToken}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Reset map token</span>
          </Button>
        </>
      )}
    </div>
  );
};

export default Map;
