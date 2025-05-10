
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Utensils, Bed, Palmtree, 
  ShoppingBag, Compass, Car 
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
  ];
  
  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Explore Diani</h1>
        <p className="text-muted-foreground">
          Choose a category to discover places and experiences in Diani Beach
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="mb-4">
                {category.icon}
              </div>
              <h2 className="text-lg font-semibold mb-2">{category.title}</h2>
              <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
              <Button 
                variant="outline" 
                className="w-full"
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
