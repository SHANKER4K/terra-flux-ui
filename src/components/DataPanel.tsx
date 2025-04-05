
import { BarChart, PieChart, FileBarChart, Table2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DataPanel() {
  return (
    <Tabs defaultValue="charts" className="w-full">
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="charts" className="flex items-center gap-2">
          <BarChart className="h-4 w-4" />
          <span className="hidden sm:inline">Charts</span>
        </TabsTrigger>
        <TabsTrigger value="reports" className="flex items-center gap-2">
          <FileBarChart className="h-4 w-4" />
          <span className="hidden sm:inline">Reports</span>
        </TabsTrigger>
        <TabsTrigger value="data" className="flex items-center gap-2">
          <Table2 className="h-4 w-4" />
          <span className="hidden sm:inline">Data</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="charts" className="space-y-4 animate-fade-in">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Distribution Analysis</CardTitle>
            <CardDescription>Geographic data visualization</CardDescription>
          </CardHeader>
          <CardContent className="h-40 flex items-center justify-center">
            <div className="flex items-center space-x-4 text-muted-foreground">
              <BarChart className="h-16 w-16" />
              <div className="text-sm">
                <p>Chart visualization would appear here</p>
                <p className="text-xs mt-1">Connected to selected map layers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Coverage Statistics</CardTitle>
            <CardDescription>Layer coverage percentage</CardDescription>
          </CardHeader>
          <CardContent className="h-40 flex items-center justify-center">
            <div className="flex items-center space-x-4 text-muted-foreground">
              <PieChart className="h-16 w-16" />
              <div className="text-sm">
                <p>Pie chart visualization would appear here</p>
                <p className="text-xs mt-1">Based on visible map area</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="reports" className="animate-fade-in">
        <Card>
          <CardHeader>
            <CardTitle>Analysis Reports</CardTitle>
            <CardDescription>Generated insights from map data</CardDescription>
          </CardHeader>
          <CardContent className="h-[340px] flex flex-col items-center justify-center text-muted-foreground">
            <FileBarChart className="h-16 w-16 mb-2" />
            <p>Report content would appear here</p>
            <p className="text-xs mt-1">Select layers to analyze first</p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="data" className="animate-fade-in">
        <Card>
          <CardHeader>
            <CardTitle>Raw Data</CardTitle>
            <CardDescription>Tabular data representation</CardDescription>
          </CardHeader>
          <CardContent className="h-[340px] flex flex-col items-center justify-center text-muted-foreground">
            <Table2 className="h-16 w-16 mb-2" />
            <p>Tabular data would appear here</p>
            <p className="text-xs mt-1">Based on selected map features</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
