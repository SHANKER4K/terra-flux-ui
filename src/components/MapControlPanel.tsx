
import React from 'react';
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { 
  Layouts, 
  LayoutGrid, 
  LayoutSidebar, 
  MapPin, 
  Compass, 
  Ruler, 
  Download, 
  Pencil 
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { baseLayers } from './Map';

interface MapControlPanelProps {
  layout: 'single' | 'side-by-side' | 'grid';
  onLayoutChange: (layout: 'single' | 'side-by-side' | 'grid') => void;
}

export function MapControlPanel({ layout, onLayoutChange }: MapControlPanelProps) {
  return (
    <div className="flex flex-col gap-4 p-4 glass-panel rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Map Layout</h3>
      </div>
      
      <ToggleGroup type="single" value={layout} onValueChange={(value) => value && onLayoutChange(value as any)}>
        <ToggleGroupItem value="single" aria-label="Single map">
          <Layouts className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="side-by-side" aria-label="Side by side maps">
          <LayoutSidebar className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="grid" aria-label="Grid layout">
          <LayoutGrid className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      
      <div className="space-y-2 mt-2">
        <h3 className="text-sm font-medium">Tools</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <MapPin className="mr-1 h-3.5 w-3.5" />
            <span>Pin</span>
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Ruler className="mr-1 h-3.5 w-3.5" />
            <span>Measure</span>
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Pencil className="mr-1 h-3.5 w-3.5" />
            <span>Draw</span>
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Download className="mr-1 h-3.5 w-3.5" />
            <span>Export</span>
          </Button>
        </div>
      </div>
      
      <div className="mt-2">
        <h3 className="text-sm font-medium mb-2">Available Map Types</h3>
        <ul className="text-xs space-y-1">
          {Object.keys(baseLayers).map(layer => (
            <li key={layer} className="flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              {layer}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MapControlPanel;
