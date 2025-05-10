
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Heart, Star, Phone, Globe, Clock, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface Listing {
  id: number;
  title: string;
  image: string;
  images?: string[];
  rating: number;
  description: string;
  category: string;
  address?: string;
  phone?: string;
  website?: string;
  hours?: string;
  priceRange?: string;
  amenities?: string[];
}

interface ListingDetailPanelProps {
  listing: Listing;
  onClose: () => void;
}

const ListingDetailPanel = ({ listing, onClose }: ListingDetailPanelProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Removed from saved" : "Saved!",
      description: isSaved 
        ? "This listing has been removed from your saved items" 
        : "This listing has been saved to your profile",
    });
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? (listing.images?.length ?? 1) - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === (listing.images?.length ?? 1) - 1 ? 0 : prev + 1
    );
  };

  const currentImage = listing.images?.[currentImageIndex] || listing.image;

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 p-4 border-b flex items-center justify-between">
        <h2 className="text-xl font-display font-semibold">{listing.title}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Image Gallery */}
      <div className="relative">
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={currentImage} 
            alt={listing.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {(listing.images?.length ?? 0) > 1 && (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
              onClick={handlePrevImage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
              onClick={handleNextImage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}
        
        {/* Image pagination dots */}
        {(listing.images?.length ?? 0) > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {listing.images?.map((_, index) => (
              <button 
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Title and Rating */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-display font-bold">{listing.title}</h1>
            <div className="flex items-center mt-1">
              <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-sm text-muted-foreground">{listing.address || "Diani Beach"}</span>
            </div>
          </div>
          
          <div className="flex items-center bg-yellow-50 px-3 py-1.5 rounded-full">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="ml-1 font-medium text-yellow-800">{listing.rating}</span>
          </div>
        </div>
        
        {/* Category and Price */}
        <div className="flex justify-between items-center">
          <Badge 
            variant="outline"
            className="capitalize bg-secondary px-3 py-1 text-sm font-medium"
          >
            {listing.category}
          </Badge>
          
          {listing.priceRange && (
            <span className="font-medium text-ocean-dark">
              Price Range: {listing.priceRange}
            </span>
          )}
        </div>
        
        {/* Description */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-muted-foreground">{listing.description}</p>
        </div>
        
        {/* Contact Info */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
          
          {listing.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 text-ocean mr-2" />
              <a href={`tel:${listing.phone}`} className="text-ocean hover:underline">
                {listing.phone}
              </a>
            </div>
          )}
          
          {listing.website && (
            <div className="flex items-center">
              <Globe className="h-4 w-4 text-ocean mr-2" />
              <a 
                href={listing.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-ocean hover:underline"
              >
                Visit Website
              </a>
            </div>
          )}
          
          {listing.hours && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-ocean mr-2" />
              <span>{listing.hours}</span>
            </div>
          )}
        </div>
        
        {/* Amenities */}
        {listing.amenities && listing.amenities.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Amenities</h2>
            <div className="grid grid-cols-2 gap-2">
              {listing.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-ocean"></div>
                  <span className="text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="pt-4 flex gap-3 justify-end">
          <Button 
            variant="outline" 
            className="gap-1.5"
            onClick={handleSave}
          >
            <Heart className={`h-4 w-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
            {isSaved ? 'Saved' : 'Save'}
          </Button>
          
          <Button 
            className="bg-ocean hover:bg-ocean-dark gap-1.5"
          >
            <MapPin className="h-4 w-4" />
            Get Directions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPanel;
