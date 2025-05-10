
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";

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
  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Results</h2>
        <p className="text-sm text-muted-foreground">
          Found {listings.length} places for you
        </p>
      </div>
      
      <div className="space-y-4">
        {listings.map((listing) => (
          <Card key={listing.id} className="overflow-hidden">
            <div className="aspect-video relative overflow-hidden">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{listing.title}</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 text-sm">{listing.rating}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">
                {listing.description}
              </p>
              
              <div className="flex items-center">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded capitalize">
                  {listing.category}
                </span>
              </div>
            </CardContent>
            
            <CardFooter className="p-4 pt-0 flex justify-end gap-2">
              <Button variant="ghost" size="sm">Save</Button>
              <Button size="sm">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ListingsPanel;
