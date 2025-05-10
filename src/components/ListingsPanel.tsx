
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Star, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

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
  onViewDetails?: (listing: Listing) => void;
}

const ListingsPanel = ({ listings, onViewDetails }: ListingsPanelProps) => {
  const [savedListings, setSavedListings] = useState<number[]>([]);
  const [expandedListings, setExpandedListings] = useState<number[]>([]);
  const { toast } = useToast();
  const isMobile = useIsMobile();

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

  const toggleExpand = (id: number) => {
    if (expandedListings.includes(id)) {
      setExpandedListings(expandedListings.filter(listingId => listingId !== id));
    } else {
      setExpandedListings([...expandedListings, id]);
    }
  };

  const handleViewDetails = (listing: Listing) => {
    if (onViewDetails) {
      onViewDetails(listing);
    } else {
      toast({
        title: "Opening details",
        description: `Viewing details for ${listing.title}`,
      });
    }
  };

  const isExpanded = (id: number) => expandedListings.includes(id);

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
          <Card 
            key={listing.id} 
            className="overflow-hidden animate-in hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row">
              {/* Image section */}
              <div className={`relative ${isMobile ? 'w-full aspect-video' : 'md:w-1/3 md:min-h-[10rem]'}`}>
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-full object-cover"
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
              
              {/* Content section */}
              <div className={`flex-1 flex flex-col`}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{listing.title}</h3>
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-xs font-medium text-yellow-800">{listing.rating}</span>
                    </div>
                  </div>
                  
                  {isMobile && !isExpanded(listing.id) ? (
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {listing.description}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground mb-3">
                      {listing.description}
                    </p>
                  )}
                  
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
                
                <CardFooter className="p-4 pt-0 flex justify-between gap-2 flex-wrap">
                  {isMobile && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-1 text-xs"
                      onClick={() => toggleExpand(listing.id)}
                    >
                      {isExpanded(listing.id) ? (
                        <>
                          <ChevronUp className="h-3 w-3" />
                          <span>Show Less</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-3 w-3" />
                          <span>Show More</span>
                        </>
                      )}
                    </Button>
                  )}
                  <div className="flex ml-auto gap-2">
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
                      onClick={() => handleViewDetails(listing)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ListingsPanel;
