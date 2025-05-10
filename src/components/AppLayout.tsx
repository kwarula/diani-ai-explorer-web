
import { useState } from "react";
import { SidebarProvider, Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Grid, User, LogOut, Menu, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AppHeader from "./AppHeader";
import ChatPanel from "./ChatPanel";
import ExplorePanel from "./ExplorePanel";
import ListingsPanel from "./ListingsPanel";
import ProfilePanel from "./ProfilePanel";
import ListingDetailPanel from "./ListingDetailPanel";
import { useIsMobile } from "@/hooks/use-mobile";

type PanelType = "chat" | "explore" | "profile";

interface Listing {
  id: number;
  title: string;
  image: string;
  rating: number;
  description: string;
  category: string;
  // These fields will be populated in the listing detail view
  address?: string;
  phone?: string;
  website?: string;
  hours?: string;
  priceRange?: string;
  amenities?: string[];
  images?: string[];
}

const AppLayout = () => {
  const [activePanel, setActivePanel] = useState<PanelType>("chat");
  const [showListings, setShowListings] = useState(false);
  const [listingsData, setListingsData] = useState<Listing[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const handleNavClick = (panel: PanelType) => {
    setActivePanel(panel);
    if (panel !== "chat") {
      setShowListings(false);
    }
    // Close listing detail view when changing panels
    setSelectedListing(null);
  };

  const handleChatQuery = (query: string) => {
    console.log("Processing query:", query);
    // In a real app, we would fetch data from an API based on the query
    // For now, let's simulate a response with mock data
    const mockListings = getMockListingsForQuery(query);
    setListingsData(mockListings);
    setShowListings(true);
    // Close any open listing detail when showing new results
    setSelectedListing(null);
  };

  const handleViewDetails = (listing: Listing) => {
    // Get additional details for the listing
    const enhancedListing = getEnhancedListingDetails(listing);
    setSelectedListing(enhancedListing);
  };

  const handleCloseDetails = () => {
    setSelectedListing(null);
  };

  const handleSignOut = () => {
    toast({
      title: "Signing out",
      description: "You have been signed out successfully",
    });
    // In a real app, we would handle the sign out logic here
    // and redirect the user to the login page
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <SidebarProvider>
          <Sidebar className="border-r shadow-sm">
            <div className="flex flex-col h-full pt-4">
              <SidebarContent className="flex flex-col flex-1 px-2">
                <div className="space-y-2 mb-8">
                  {/* Fix: SidebarTrigger is removed and replaced with a regular Button */}
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="flex-1 flex flex-col space-y-2">
                  <Button
                    variant={activePanel === "chat" ? "default" : "ghost"}
                    className="justify-start gap-2 font-medium"
                    onClick={() => handleNavClick("chat")}
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>Chat Assistant</span>
                  </Button>
                  
                  <Button
                    variant={activePanel === "explore" ? "default" : "ghost"}
                    className="justify-start gap-2 font-medium"
                    onClick={() => handleNavClick("explore")}
                  >
                    <Grid className="h-5 w-5" />
                    <span>Explore Categories</span>
                  </Button>
                  
                  <Button
                    variant={activePanel === "profile" ? "default" : "ghost"}
                    className="justify-start gap-2 font-medium"
                    onClick={() => handleNavClick("profile")}
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Button>
                </div>
                
                <div className="pb-4">
                  <Button 
                    variant="ghost" 
                    className="justify-start gap-2 w-full text-muted-foreground hover:text-destructive"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              </SidebarContent>
            </div>
          </Sidebar>
          
          <div className="flex-1 flex overflow-hidden bg-gray-50/50">
            {/* Determine layout based on what's being shown */}
            <div className={`transition-all ${
              selectedListing ? 'hidden md:block md:w-1/3' : 
              showListings ? (isMobile ? 'hidden' : 'max-w-[50%] md:max-w-[60%]') : 
              'max-w-full'
            } flex-1 overflow-y-auto`}>
              {activePanel === "chat" && (
                <div className="h-full bg-white">
                  <ChatPanel onSendQuery={handleChatQuery} />
                </div>
              )}
              
              {activePanel === "explore" && (
                <div className="h-full bg-white">
                  <ExplorePanel onCategorySelect={handleChatQuery} />
                </div>
              )}
              
              {activePanel === "profile" && (
                <div className="h-full bg-white">
                  <ProfilePanel />
                </div>
              )}
            </div>
            
            {/* Listings panel */}
            {showListings && !selectedListing && (
              <div className={`${isMobile ? 'w-full' : 'w-1/2 md:w-[40%]'} border-l overflow-y-auto bg-white shadow-[-4px_0_12px_-6px_rgba(0,0,0,0.05)]`}>
                <ListingsPanel 
                  listings={listingsData} 
                  onViewDetails={handleViewDetails}
                />
              </div>
            )}
            
            {/* Listing detail panel */}
            {selectedListing && (
              <div className={`${isMobile ? 'w-full' : 'w-2/3'} border-l overflow-y-auto bg-white shadow-[-4px_0_12px_-6px_rgba(0,0,0,0.05)]`}>
                <ListingDetailPanel 
                  listing={selectedListing} 
                  onClose={handleCloseDetails}
                />
              </div>
            )}
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
};

// Enhanced mock data function with more detailed information
const getEnhancedListingDetails = (listing: Listing): Listing => {
  // In a real app, this would be an API call to get additional details
  const enhancedListings: Record<number, Partial<Listing>> = {
    1: {
      address: "Diani Beach Road, Diani, Kenya",
      phone: "+254 712 345678",
      website: "https://www.dianireef.com",
      hours: "Open 24 hours",
      priceRange: "$$$-$$$$",
      amenities: ["Swimming Pool", "Spa", "Restaurant", "Beach Access", "Free WiFi", "Room Service"],
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1562790351-d273a961e0e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ]
    },
    2: {
      address: "Diani Beach Road, South Coast, Kenya",
      phone: "+254 722 123456",
      website: "https://www.alibarbours.com",
      hours: "6:00 PM - 11:00 PM",
      priceRange: "$$$",
      amenities: ["Unique Cave Setting", "Fine Dining", "Romantic Atmosphere", "Seafood Specialties", "Wine Selection"],
      images: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ]
    },
    3: {
      address: "Diani Beach, Kenya",
      phone: "+254 733 987654",
      website: "https://www.dianikitesurf.com",
      hours: "8:00 AM - 6:00 PM",
      priceRange: "$$-$$$",
      amenities: ["Professional Instructors", "Equipment Rental", "Lessons for All Levels", "Safety Equipment"],
      images: [
        "https://images.unsplash.com/photo-1520447894162-acce8a9c81c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1554079501-2c4d8410a78d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1583179571937-99c456ec72be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ]
    },
    4: {
      address: "Diani Beach Road, Kenya",
      phone: "+254 700 123789",
      website: "https://www.colobusconservation.org",
      hours: "9:00 AM - 5:00 PM",
      priceRange: "$",
      amenities: ["Guided Tours", "Educational Programs", "Conservation Efforts", "Gift Shop"],
      images: [
        "https://images.unsplash.com/photo-1463852247062-1bbca38f7805?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1544197807-bb3591731aa1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1526306063970-d5498ad00f1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ]
    },
    5: {
      address: "Diani Beach, Kenya",
      phone: "+254 711 555666",
      website: "https://www.nomadbeachbar.com",
      hours: "10:00 AM - 10:00 PM",
      priceRange: "$$",
      amenities: ["Beachfront Seating", "Seafood", "Cocktails", "Live Music", "Sunset Views"],
      images: [
        "https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1545072979-dfc7c9e443cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ]
    }
  };

  return {
    ...listing,
    ...enhancedListings[listing.id]
  };
};

// Mock data function to simulate getting listings based on a query
const getMockListingsForQuery = (query: string) => {
  const lowerQuery = query.toLowerCase();
  
  // Generic mock data
  const mockListings = [
    {
      id: 1,
      title: "Diani Reef Beach Resort & Spa",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
      rating: 4.8,
      description: "Luxury beachfront resort with multiple pools and restaurants.",
      category: "accommodation"
    },
    {
      id: 2,
      title: "Ali Barbour's Cave Restaurant",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
      rating: 4.7,
      description: "Unique dining experience in a natural coral cave.",
      category: "restaurant"
    },
    {
      id: 3,
      title: "Diani Beach Kite Surfing",
      image: "https://images.unsplash.com/photo-1520447894162-acce8a9c81c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
      rating: 4.9,
      description: "Learn to kite surf or improve your skills with professional instructors.",
      category: "activity"
    },
    {
      id: 4,
      title: "Colobus Conservation",
      image: "https://images.unsplash.com/photo-1463852247062-1bbca38f7805?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
      rating: 4.6,
      description: "Conservation center for the endangered Angolan black-and-white colobus monkey.",
      category: "activity"
    },
    {
      id: 5,
      title: "Nomad Beach Bar & Restaurant",
      image: "https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
      rating: 4.5,
      description: "Casual beachfront dining with great seafood and cocktails.",
      category: "restaurant"
    }
  ];
  
  // Filter based on query (simple contains check for demo)
  if (lowerQuery.includes("restaurant") || lowerQuery.includes("food") || lowerQuery.includes("eat")) {
    return mockListings.filter(item => item.category === "restaurant");
  } else if (lowerQuery.includes("hotel") || lowerQuery.includes("resort") || lowerQuery.includes("stay")) {
    return mockListings.filter(item => item.category === "accommodation");
  } else if (lowerQuery.includes("activity") || lowerQuery.includes("things to do")) {
    return mockListings.filter(item => item.category === "activity");
  }
  
  // Default return all
  return mockListings;
};

export default AppLayout;
