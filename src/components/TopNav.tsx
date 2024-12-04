import { Bell, Menu } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { UserNav } from "./UserNav";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Notification {
  id: number;
  title: string;
  description: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    title: "New message",
    description: "You have a new message from John",
  },
  {
    id: 2,
    title: "Task completed",
    description: "Project X has been completed",
  },
  {
    id: 3,
    title: "Meeting reminder",
    description: "Team meeting in 30 minutes",
  },
];

function TopNav() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-background">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold ml-4 text-foreground">
          Dashboard
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="border-foreground">
              <Bell className="h-4 w-4 text-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id}>
                <div className="flex flex-col">
                  <span className="font-medium">{notification.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {notification.description}
                  </span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <UserNav />
      </div>
    </header>
  );
}

export default TopNav;
