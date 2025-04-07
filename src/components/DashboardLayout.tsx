
import { useState } from "react";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBar } from "./SearchBar";
import { MapPlaceholder } from "./MapPlaceholder";
import { LayerControl } from "./LayerControl";
import { MapControls } from "./MapControls";
import { DataPanel } from "./DataPanel";
import { useIsMobile } from "@/hooks/use-mobile";

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dataPanelOpen, setDataPanelOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Auto-collapse sidebar on mobile
  const effectiveSidebarOpen = isMobile ? false : sidebarOpen;
  
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-background">
      {/* Top Navigation Bar */}
      <header className="h-14 flex items-center justify-between border-b px-4 md:px-6">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <div className="hidden md:flex items-center space-x-2">
            <div className="bg-primary/20 p-1 rounded-md">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24"
                className="h-6 w-6 text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <h1 className="text-lg font-semibold">TerraFlux GIS</h1>
          </div>
        </div>
        
        <div className="flex-1 max-w-md mx-4">
          <SearchBar />
        </div>
        
        <div className="flex items-center space-x-2">
          <ThemeToggle />
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={cn(
            "bg-sidebar border-r transition-all duration-300 overflow-y-auto",
            effectiveSidebarOpen ? "w-64" : "w-0"
          )}
        >
          {effectiveSidebarOpen && (
            <div className="p-4 space-y-6 animate-fade-in min-w-64">
              <LayerControl />
            </div>
          )}
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col h-full relative overflow-hidden">
          {/* Map Area */}
          <div className="relative flex-1 map-container">
            <MapPlaceholder />
            
            {/* Floating sidebar toggle */}
            <div className="absolute left-4 top-4 z-10">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm"
              >
                {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            </div>
            
            {/* Map Controls - Right side */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
              <MapControls />
            </div>
            
            {/* Data Panel Toggle - Bottom */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDataPanelOpen(!dataPanelOpen)}
                className="rounded-full bg-background/70 backdrop-blur-sm"
              >
                {dataPanelOpen ? "Hide Data Panel" : "Show Data Panel"}
                <ChevronUp className={cn(
                  "h-4 w-4 ml-2 transition-transform",
                  dataPanelOpen ? "rotate-180" : ""
                )} />
              </Button>
            </div>
          </div>
          
          {/* Data Panel */}
          <div 
            className={cn(
              "border-t transition-all duration-300 overflow-hidden bg-background",
              dataPanelOpen ? "h-96" : "h-0"
            )}
          >
            {dataPanelOpen && (
              <div className="p-4 animate-fade-in">
                <DataPanel />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function ChevronUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m18 15-6-6-6 6"/>
    </svg>
  );
}
