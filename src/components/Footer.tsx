import { Github, Twitter, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <footer className="w-full border-t bg-background/80 backdrop-blur-sm mt-8">
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Quiz & Games</h3>
            <p className="text-sm text-muted-foreground">
              Challenge yourself with our interactive quizzes and exciting games.
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">
                  Home
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">
                  Progress
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">
                  Games
                </Button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Connect With Us</h3>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t py-6 text-center text-sm text-muted-foreground">
          <p>© 2024 Quiz & Games. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};