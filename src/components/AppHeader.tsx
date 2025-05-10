
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Bell, HelpCircle } from "lucide-react";

const AppHeader = () => {
  const { toast } = useToast();
  
  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have no new notifications",
    });
  };

  const handleHelpClick = () => {
    toast({
      title: "Help Center",
      description: "Our support team is available 24/7",
    });
  };

  return (
    <header className="w-full h-16 border-b flex items-center justify-between px-4 bg-background z-10 shadow-soft">
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ocean to-ocean-light flex items-center justify-center text-white font-bold">
            D
          </div>
          <span className="text-xl font-display font-bold text-ocean">
            Discover Diani
          </span>
        </Link>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground hover:text-foreground"
          onClick={handleNotificationClick}
        >
          <Bell className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="text-muted-foreground hover:text-foreground"
          onClick={handleHelpClick}
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
        
        <Avatar className="h-9 w-9 border-2 border-ocean-light hover-scale">
          <AvatarImage src="https://github.com/shadcn.png" className="object-cover" />
          <AvatarFallback className="bg-ocean text-white">JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default AppHeader;
