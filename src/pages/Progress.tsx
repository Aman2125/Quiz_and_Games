import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getProgress } from "@/utils/storage";

const ProgressPage = () => {
  const { history, highScores } = getProgress();
  const username = localStorage.getItem("username") || "User";

  const calculateOverallProgress = () => {
    if (history.length === 0) return 0;
    const totalScore = history.reduce((acc, result) => 
      acc + (result.score / result.totalQuestions) * 100, 0);
    return Math.round(totalScore / history.length);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container pt-24 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-3xl">Welcome back, {username}!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Overall Progress</h3>
                  <Progress value={calculateOverallProgress()} className="h-4" />
                  <p className="text-sm text-muted-foreground mt-1">
                    {calculateOverallProgress()}% Average Score
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">High Scores</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(highScores).map(([category, score]) => (
                      <Card key={category} className="p-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{category}</h4>
                          <span className="text-primary">{Math.round(score)}%</span>
                        </div>
                        <Progress value={score} className="mt-2" />
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {history.slice(-5).reverse().map((result, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{result.category}</p>
                            <p className="text-sm text-muted-foreground">
                              Score: {result.score}/{result.totalQuestions}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(result.date).toLocaleDateString()}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProgressPage;