import React from "react";
import { LogOut } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import User from "@/types/User";
interface AvatarProps {
  src: string;
  size?: number;
  user: User | null;
  logout: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ src, size = 40, user, logout }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <rect width={size} height={size} rx="20" fill="url(#pattern0)" />
          <defs>
            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlinkHref="#image0" transform="scale(0.00115473)" />
            </pattern>
            <image id="image0" width="866" height="866" xlinkHref={src} />
          </defs>
        </svg>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="grid gap-4">
          <div className="flex items-center space-x-2">
            <div>
              <p className="font-semibold">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
          <div className="space-y-2">
            <Button className="w-full flex items-center justify-center" onClick={() => logout()}>
              <LogOut className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Avatar;
