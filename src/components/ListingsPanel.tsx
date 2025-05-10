
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Star } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Listing {
  id: number;
  title: string;
  image: string;
  rating: number;
  description: string;
  category: string;
}

interface ListingsPanelProps {
  listings: Listing[];
}

const ListingsPanel = ({ listings }: ListingsPanelProps) => {
  const [savedListings, setSavedListings] = useState<number[]>([]);
  const { toast } = useToast();

  const handleSave = (id: number) => {
    if (savedListings.includes(id)) {
      setSavedListings(savedListings.filter(listingId => listingId !== id));
      toast({
        title: "Removed from saved",
        description: "This listing has been removed from your saved items",
      });
    } else {
      setSavedListings([...savedListings, id]);
      toast({
        title: "Saved!",
        description: "This listing has been saved to your profile",
      });
    }
  };

  const handleViewDetails = (title: string) => {
    toast({
      title: "Opening details",
      description: `Viewing details for ${title}`,
    });
  };

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="mb-4">
        <h2 className="text-xl font-display font-semibold">Results</h2>
        <p className="text-sm text-muted-foreground">
          Found {listings.length} places for you
        </p>
      </div>
      
      <div className="space-y-4">
        {listings.map((listing) => (
          <Card key={listing.id} className="overflow-hidden animate-in hover:shadow-md transition-shadow">
            <div className="aspect-video relative overflow-hidden">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white rounded-full"
                onClick={() => handleSave(listing.id)}
              >
                <Heart 
                  className={`h-4 w-4 ${savedListings.includes(listing.id) ? 'text-red-500 fill-red-500' : ''}`}
                />
              </Button>
            </div>
            
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{listing.title}</h3>
                <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 text-xs font-medium text-yellow-800">{listing.rating}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                {listing.description}
              </p>
              
              <div className="flex items-center justify-between">
                <Badge 
                  variant="outline"
                  className="capitalize bg-secondary text-xs font-medium"
                >
                  {listing.category}
                </Badge>
                <div className="flex items-center text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>Diani Beach</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="p-4 pt-0 flex justify-end gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleSave(listing.id)}
              >
                {savedListings.includes(listing.id) ? 'Saved' : 'Save'}
              </Button>
              <Button 
                size="sm" 
                className="bg-ocean hover:bg-ocean-dark"
                onClick={() => handleViewDetails(listing.title)}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ListingsPanel;
