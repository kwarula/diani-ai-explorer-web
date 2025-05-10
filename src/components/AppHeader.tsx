
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className="w-full h-16 border-b flex items-center justify-between px-4 bg-background z-10">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold text-ocean">
          Discover Diani
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm">
          Help
        </Button>
        
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default AppHeader;
