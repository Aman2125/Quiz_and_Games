import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface GameLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const GameLayout = ({ children, title }: GameLayoutProps) => {
  return (
    <div className="container max-w-4xl mx-auto py-8">
      <Link to="/">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>
      <Card className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">{title}</h1>
        {children}
      </Card>
    </div>
  );
};