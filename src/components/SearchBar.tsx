
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function SearchBar() {
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    console.log("Searching for:", query);
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search locations..."
          className="pl-9 bg-background/50 backdrop-blur-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Button 
        type="submit" 
        size="sm"
        className="bg-primary/90 backdrop-blur-sm"
      >
        Search
      </Button>
    </form>
  );
}
