
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Utensils, Bed, Palmtree, 
  ShoppingBag, Compass, Car,
  Camera, Wine, Users, Umbrella
} from "lucide-react";

interface ExplorePanelProps {
  onCategorySelect: (category: string) => void;
}

const ExplorePanel = ({ onCategorySelect }: ExplorePanelProps) => {
  const categories = [
    {
      id: 1,
      title: "Restaurants & Cafes",
      description: "Find the best places to eat and drink",
      icon: <Utensils className="h-12 w-12 text-ocean" />,
      query: "Show me the best restaurants and cafes in Diani"
    },
    {
      id: 2,
      title: "Accommodations",
      description: "Hotels, resorts and vacation rentals",
      icon: <Bed className="h-12 w-12 text-ocean" />,
      query: "What are the top rated hotels in Diani?"
    },
    {
      id: 3,
      title: "Activities & Experiences",
      description: "Things to do during your stay",
      icon: <Palmtree className="h-12 w-12 text-ocean" />,
      query: "What activities can I do in Diani Beach?"
    },
    {
      id: 4,
      title: "Shopping",
      description: "Markets, boutiques and souvenirs",
      icon: <ShoppingBag className="h-12 w-12 text-ocean" />,
      query: "Where can I shop for local crafts and souvenirs?"
    },
    {
      id: 5,
      title: "Day Trips",
      description: "Explore beyond Diani Beach",
      icon: <Compass className="h-12 w-12 text-ocean" />,
      query: "What are good day trips from Diani Beach?"
    },
    {
      id: 6,
      title: "Transportation",
      description: "Getting around Diani and transfers",
      icon: <Car className="h-12 w-12 text-ocean" />,
      query: "How can I get around Diani Beach?"
    },
    {
      id: 7,
      title: "Photography Spots",
      description: "Best locations for memorable photos",
      icon: <Camera className="h-12 w-12 text-ocean" />,
      query: "Where are the best photography spots in Diani?"
    },
    {
      id: 8,
      title: "Nightlife",
      description: "Bars, clubs and evening entertainment",
      icon: <Wine className="h-12 w-12 text-ocean" />,
      query: "What's the nightlife like in Diani Beach?"
    },
    {
      id: 9,
      title: "Group Activities",
      description: "Things to do with friends and family",
      icon: <Users className="h-12 w-12 text-ocean" />,
      query: "What activities can I do with a group in Diani?"
    },
    {
      id: 10,
      title: "Beach Spots",
      description: "Best beach areas and facilities",
      icon: <Umbrella className="h-12 w-12 text-ocean" />,
      query: "What are the best beach spots in Diani?"
    },
  ];
  
  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold mb-2 text-gray-800">Explore Diani</h1>
        <p className="text-muted-foreground">
          Choose a category to discover places and experiences in Diani Beach
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card 
            key={category.id} 
            className="overflow-hidden hover:shadow-md transition-shadow animate-in group hover:border-ocean"
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="mb-4 transform group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h2 className="text-lg font-display font-semibold mb-2">{category.title}</h2>
              <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
              <Button 
                variant="outline" 
                className="w-full group-hover:bg-ocean group-hover:text-white transition-colors"
                onClick={() => onCategorySelect(category.query)}
              >
                Explore
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExplorePanel;
