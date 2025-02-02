import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { updateDailyStreak } from "@/utils/storage";

interface GameLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const GameLayout = ({ children, title }: GameLayoutProps) => {
  const handleReturn = () => {
    updateDailyStreak();
    window.dispatchEvent(new Event('gameCompleted'));
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 md:px-0">
      <Link to="/" onClick={handleReturn}>
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>
      <Card className="p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">{title}</h1>
        {children}
      </Card>
    </div>
  );
};