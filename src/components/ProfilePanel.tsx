
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

const ProfilePanel = () => {
  const [preferences, setPreferences] = useState({
    interests: {
      beach: true,
      food: true,
      adventure: false,
      culture: true,
      shopping: false,
      nightlife: false,
    },
    dietaryRestrictions: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      nutFree: true,
      dairyFree: false,
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
  
  return (
    <div className="p-6 max-w-4xl mx-auto h-full overflow-y-auto">
      <div className="mb-8 flex flex-col items-center md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col items-center md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p className="text-muted-foreground">john.doe@example.com</p>
          </div>
        </div>
        
        <Button className="mt-4 md:mt-0">Edit Profile</Button>
      </div>
      
      <Tabs defaultValue="preferences">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="saved">Saved Items</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preferences">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
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
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
            
            <Card>
              <CardHeader>
                <CardTitle>Dietary Preferences</CardTitle>
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
            
            <div className="flex justify-end">
              <Button>Save Preferences</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="saved">
          <Card>
            <CardHeader>
              <CardTitle>Saved Items</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">You haven't saved any places yet.</p>
              <div className="mt-4">
                <Button variant="outline">Browse Places</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Booking History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No booking history yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePanel;
