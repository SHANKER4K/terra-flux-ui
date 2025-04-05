
import { Ruler, Pencil, Plus, Minus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function MapControls() {
  return (
    <TooltipProvider>
      <div className="flex flex-col p-1 glass-panel rounded-lg animate-scale-in">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Plus className="h-5 w-5" />
              <span className="sr-only">Zoom in</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Zoom in</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Minus className="h-5 w-5" />
              <span className="sr-only">Zoom out</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Zoom out</p>
          </TooltipContent>
        </Tooltip>
        
        <Separator className="my-2" />
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Draw</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Draw on map</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Ruler className="h-4 w-4" />
              <span className="sr-only">Measure</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Measure distance</p>
          </TooltipContent>
        </Tooltip>
        
        <Separator className="my-2" />
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Download className="h-4 w-4" />
              <span className="sr-only">Export</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Export map</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
