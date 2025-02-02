import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { categories, Category } from "@/data/quiz-data";
import { motion } from "framer-motion";

interface CategorySelectionProps {
  onSelectCategory: (category: Category) => void;
}

export const CategorySelection = ({ onSelectCategory }: CategorySelectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Quiz Time</h1>
        <p className="text-muted-foreground">Select a category to begin</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <Card
            key={category}
            className="p-6 cursor-pointer hover:border-primary transition-colors"
            onClick={() => onSelectCategory(category)}
          >
            <h3 className="text-lg font-semibold mb-2">{category}</h3>
            <p className="text-sm text-muted-foreground">
              Test your knowledge in {category.toLowerCase()}
            </p>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};