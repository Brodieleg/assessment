import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, CheckCircle2, Target } from 'lucide-react';

interface CategoryScore {
  category: string;
  questions: string[];
  scores: number[];
  averageScore: number;
}

interface AssessmentSummaryProps {
  name: string;
  companyName: string;
  answers: number[];
  questions: {
    category: string;
    questions: string[];
  }[];
}

export function AssessmentSummary({ name, companyName, answers, questions }: AssessmentSummaryProps) {
  const calculateCategoryScores = (): CategoryScore[] => {
    return questions.map((category, categoryIndex) => {
      const startIndex = categoryIndex * 5;
      const categoryScores = answers.slice(startIndex, startIndex + 5);
      const averageScore = categoryScores.reduce((a, b) => a + b, 0) / categoryScores.length;

      return {
        category: category.category,
        questions: category.questions,
        scores: categoryScores,
        averageScore,
      };
    });
  };

  const categoryScores = calculateCategoryScores();
  const overallAverage = answers.reduce((a, b) => a + b, 0) / answers.length;

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-blue-600';
    if (score >= 4) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (score: number) => {
    if (score >= 8) return 'bg-green-600';
    if (score >= 6) return 'bg-blue-600';
    if (score >= 4) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6" />
            Assessment Summary for {companyName}
          </CardTitle>
          <p className="text-muted-foreground">Completed by {name}</p>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Overall Score
              </h3>
              <span className={`text-2xl font-bold ${getScoreColor(overallAverage)}`}>
                {overallAverage.toFixed(1)}/10
              </span>
            </div>
            <Progress 
              value={overallAverage * 10} 
              className={`h-2 ${getProgressColor(overallAverage)}`} 
            />
          </div>
        </CardContent>
      </Card>

      {categoryScores.map((category, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                {category.category}
              </CardTitle>
              <span className={`text-xl font-bold ${getScoreColor(category.averageScore)}`}>
                {category.averageScore.toFixed(1)}/10
              </span>
            </div>
            <Progress 
              value={category.averageScore * 10} 
              className={`h-2 ${getProgressColor(category.averageScore)}`} 
            />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {category.questions.map((question, qIndex) => (
                <div key={qIndex} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="flex-1 text-sm">{question}</span>
                    <span className={`ml-4 font-medium ${getScoreColor(category.scores[qIndex])}`}>
                      {category.scores[qIndex]}/10
                    </span>
                  </div>
                  <Progress 
                    value={category.scores[qIndex] * 10} 
                    className={`h-1.5 ${getProgressColor(category.scores[qIndex])}`} 
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}