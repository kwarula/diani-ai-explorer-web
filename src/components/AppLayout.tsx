import { useState } from "react";
import { SidebarProvider, Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Grid, User, LogOut, Menu } from "lucide-react";
import AppHeader from "./AppHeader";
import ChatPanel from "./ChatPanel";
import ExplorePanel from "./ExplorePanel";
import ListingsPanel from "./ListingsPanel";
import ProfilePanel from "./ProfilePanel";

type PanelType = "chat" | "explore" | "profile";

const AppLayout = () => {
  const [activePanel, setActivePanel] = useState<PanelType>("chat");
  const [showListings, setShowListings] = useState(false);
  const [listingsData, setListingsData] = useState<any[]>([]);
  
  const handleNavClick = (panel: PanelType) => {
    setActivePanel(panel);
    if (panel !== "chat") {
      setShowListings(false);
    }
  };

  const handleChatQuery = (query: string) => {
    console.log("Processing query:", query);
    // In a real app, we would fetch data from an API based on the query
    // For now, let's simulate a response with mock data
    const mockListings = getMockListingsForQuery(query);
    setListingsData(mockListings);
    setShowListings(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <SidebarProvider>
          <Sidebar className="border-r">
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
                    className="justify-start gap-2"
                    onClick={() => handleNavClick("chat")}
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>Chat Assistant</span>
                  </Button>
                  
                  <Button
                    variant={activePanel === "explore" ? "default" : "ghost"}
                    className="justify-start gap-2"
                    onClick={() => handleNavClick("explore")}
                  >
                    <Grid className="h-5 w-5" />
                    <span>Explore Categories</span>
                  </Button>
                  
                  <Button
                    variant={activePanel === "profile" ? "default" : "ghost"}
                    className="justify-start gap-2"
                    onClick={() => handleNavClick("profile")}
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Button>
                </div>
                
                <div className="pb-4">
                  <Button variant="ghost" className="justify-start gap-2 w-full text-muted-foreground">
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              </SidebarContent>
            </div>
          </Sidebar>
          
          <div className="flex-1 flex overflow-hidden">
            <div className={`flex-1 overflow-y-auto transition-all ${showListings ? 'max-w-[50%] md:max-w-[60%]' : 'max-w-full'}`}>
              {activePanel === "chat" && (
                <ChatPanel onSendQuery={handleChatQuery} />
              )}
              
              {activePanel === "explore" && (
                <ExplorePanel onCategorySelect={handleChatQuery} />
              )}
              
              {activePanel === "profile" && (
                <ProfilePanel />
              )}
            </div>
            
            {showListings && (
              <div className="w-1/2 md:w-[40%] border-l overflow-y-auto bg-background">
                <ListingsPanel listings={listingsData} />
              </div>
            )}
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
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
