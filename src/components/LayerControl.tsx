
import { Layers, Map, Mountain, Route, Droplets, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface Layer {
  id: string;
  name: string;
  icon: React.ElementType;
  active: boolean;
  color: string;
}

export function LayerControl() {
  const [layers, setLayers] = useState<Layer[]>([
    { id: "base", name: "Base Map", icon: Map, active: true, color: "text-gray-600" },
    { id: "terrain", name: "Terrain", icon: Mountain, active: false, color: "text-emerald-600" },
    { id: "roads", name: "Roads", icon: Route, active: true, color: "text-amber-600" },
    { id: "water", name: "Water Bodies", icon: Droplets, active: true, color: "text-blue-600" },
    { id: "population", name: "Population", icon: Users, active: false, color: "text-violet-600" },
  ]);

  function toggleLayer(id: string) {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, active: !layer.active } : layer
    ));
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Layers className="h-5 w-5" />
          <CardTitle>Layers</CardTitle>
        </div>
        <CardDescription>Toggle map data layers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {layers.map(layer => (
          <div key={layer.id} className="flex items-center space-x-3">
            <Checkbox 
              id={`layer-${layer.id}`}
              checked={layer.active}
              onCheckedChange={() => toggleLayer(layer.id)}
            />
            <div className="flex items-center space-x-2">
              <layer.icon className={`h-4 w-4 ${layer.color}`} />
              <label 
                htmlFor={`layer-${layer.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {layer.name}
              </label>
            </div>
          </div>
        ))}
        <Separator className="my-2" />
        <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
          <Layers className="h-3.5 w-3.5 mr-2" />
          Manage All Layers
        </Button>
      </CardContent>
    </Card>
  );
}
