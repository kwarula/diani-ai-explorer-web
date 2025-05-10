
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Camera, MapPin, Calendar, Clock } from "lucide-react";

const ProfilePanel = () => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState({
    interests: {
      beach: true,
      food: true,
      adventure: false,
      culture: true,
      shopping: false,
      nightlife: false,
      wildlife: true,
      watersports: true,
    },
    dietaryRestrictions: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      nutFree: true,
      dairyFree: false,
      halal: true,
    },
  });
  
  const handleInterestChange = (interest: string) => {
    setPreferences({
      ...preferences,
      interests: {
        ...preferences.interests,
        [interest]: !preferences.interests[interest as keyof typeof preferences.interests],
      },
    });
  };
  
  const handleDietaryChange = (restriction: string) => {
    setPreferences({
      ...preferences,
      dietaryRestrictions: {
        ...preferences.dietaryRestrictions,
        [restriction]: !preferences.dietaryRestrictions[restriction as keyof typeof preferences.dietaryRestrictions],
      },
    });
  };
  
  const handleSavePreferences = () => {
    toast({
      title: "Preferences Saved",
      description: "Your preferences have been updated successfully",
    });
  };
  
  const handleUploadImage = () => {
    toast({
      title: "Upload Image",
      description: "Image upload feature coming soon!",
    });
  };

  const recentSearches = [
    "Luxury beachfront hotels", 
    "Best seafood restaurants",
    "Snorkeling trips",
    "Beach clubs"
  ];

  const savedListings = []; // Empty for now

  const trips = [
    {
      id: 1,
      title: "Beach Day Trip",
      date: "May 15, 2025",
      time: "9:00 AM",
      location: "Diani Main Beach",
      image: "https://images.unsplash.com/photo-1535262412227-85541e910204?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    }
  ];
  
  return (
    <div className="p-6 max-w-4xl mx-auto h-full overflow-y-auto">
      <div className="mb-8 flex flex-col items-center md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col items-center md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
              <AvatarImage src="https://github.com/shadcn.png" className="object-cover" />
              <AvatarFallback className="bg-ocean text-white text-xl">JD</AvatarFallback>
            </Avatar>
            <Button 
              size="icon" 
              variant="secondary"
              className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-md"
              onClick={handleUploadImage}
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-display font-bold">John Doe</h1>
            <p className="text-muted-foreground">john.doe@example.com</p>
            <div className="mt-1 flex flex-wrap justify-center md:justify-start gap-2">
              <Badge variant="outline" className="bg-secondary text-xs">New York</Badge>
              <Badge variant="outline" className="bg-secondary text-xs">Traveler</Badge>
            </div>
          </div>
        </div>
        
        <Button className="mt-4 md:mt-0 shadow-sm">Edit Profile</Button>
      </div>
      
      <Tabs defaultValue="preferences" className="animate-in">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="saved">Saved Items</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preferences">
          <div className="space-y-6">
            <Card className="shadow-sm animate-in">
              <CardHeader>
                <CardTitle className="text-xl">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="john.doe@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+1 234 567 890" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Home Location</Label>
                    <Input id="location" defaultValue="New York, USA" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm animate-in" style={{animationDelay: "0.1s"}}>
              <CardHeader>
                <CardTitle className="text-xl">Travel Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(preferences.interests).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`interest-${key}`} 
                        checked={value} 
                        onCheckedChange={() => handleInterestChange(key)} 
                      />
                      <Label htmlFor={`interest-${key}`} className="capitalize">{key}</Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm animate-in" style={{animationDelay: "0.2s"}}>
              <CardHeader>
                <CardTitle className="text-xl">Dietary Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(preferences.dietaryRestrictions).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`dietary-${key}`}
                        checked={value}
                        onCheckedChange={() => handleDietaryChange(key)}
                      />
                      <Label htmlFor={`dietary-${key}`} className="capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end animate-in" style={{animationDelay: "0.3s"}}>
              <Button onClick={handleSavePreferences} className="shadow-sm">Save Preferences</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="saved">
          <div className="space-y-6">
            <Card className="shadow-sm animate-in">
              <CardHeader>
                <CardTitle className="text-xl">Saved Places</CardTitle>
              </CardHeader>
              <CardContent>
                {savedListings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {savedListings.map((listing: any) => (
                      <div key={listing.id} className="flex items-center gap-3 p-2 border rounded-md">
                        <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                          <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{listing.title}</h4>
                          <p className="text-xs text-muted-foreground">{listing.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">You haven't saved any places yet.</p>
                    <Button variant="outline">Browse Places</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-sm animate-in" style={{animationDelay: "0.1s"}}>
              <CardHeader>
                <CardTitle className="text-xl">Recent Searches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                      <span className="text-sm">{search}</span>
                      <Button variant="ghost" size="sm" className="h-7">Search Again</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <div className="space-y-6">
            <Card className="shadow-sm animate-in">
              <CardHeader>
                <CardTitle className="text-xl">Upcoming Trips</CardTitle>
              </CardHeader>
              <CardContent>
                {trips.length > 0 ? (
                  <div className="space-y-4">
                    {trips.map((trip) => (
                      <div key={trip.id} className="flex flex-col md:flex-row gap-4 border rounded-lg p-4">
                        <div className="w-full md:w-32 h-24 bg-gray-200 rounded-md overflow-hidden">
                          <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{trip.title}</h4>
                          <div className="mt-2 space-y-1 text-sm">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{trip.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{trip.time}</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{trip.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex md:flex-col gap-2 self-end md:self-center">
                          <Button variant="outline" size="sm">View</Button>
                          <Button size="sm">Modify</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No upcoming trips.</p>
                )}
              </CardContent>
            </Card>
            
            <Card className="shadow-sm animate-in" style={{animationDelay: "0.1s"}}>
              <CardHeader>
                <CardTitle className="text-xl">Past Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">No booking history yet.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePanel;
