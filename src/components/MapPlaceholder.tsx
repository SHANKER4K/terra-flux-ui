
import { Globe } from "lucide-react";

export function MapPlaceholder() {
  return (
    <div className="w-full h-full bg-map-land/70 flex flex-col items-center justify-center text-muted-foreground">
      <div className="animate-fade-in flex flex-col items-center">
        <Globe className="h-16 w-16 mb-4 text-primary/70" />
        <p className="text-lg">Interactive Map Area</p>
        <p className="text-sm max-w-md text-center mt-2">
          In a real application, this would integrate with Mapbox, Leaflet, or another map library.
        </p>
      </div>
    </div>
  );
}
