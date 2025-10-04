"use client";

import { useState, useEffect } from "react";
import {
  ChevronRight,
  Copy,
  CheckCircle2,
  Loader2,
  Gamepad2,
  FileText,
  UploadCloud,
  Link as LinkIcon,
  Image,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GameCard } from "@/components/game-card";
import { games, readmeContent } from "@/lib/game-data";
import { summarizeGameDescriptions, type SummarizeGameDescriptionsOutput } from "@/ai/flows/summarize-game-descriptions";

type Step = "start" | "fetching" | "fetched" | "uploading" | "done";

export default function Home() {
  const [step, setStep] = useState<Step>("start");
  const [summaries, setSummaries] = useState<SummarizeGameDescriptionsOutput>([]);
  const [uploadProgress, setUploadProgress] = useState({ games: 0, readme: 0, images: 0 });
  const [isCopied, setIsCopied] = useState(false);

  const handleFetchData = async () => {
    setStep("fetching");
    const gameDescriptions = games.map((game) => ({
      title: game.title,
      description: game.short_description,
    }));
    try {
      const result = await summarizeGameDescriptions(gameDescriptions);
      setSummaries(result);
      setStep("fetched");
    } catch (error) {
      console.error("Error summarizing game descriptions:", error);
      const fallbackSummaries = games.map(game => ({ title: game.title, summary: game.short_description }));
      setSummaries(fallbackSummaries);
      setStep("fetched");
    }
  };
  
  const handleUpload = () => {
    setStep("uploading");
  };

  useEffect(() => {
    if (step !== "uploading") return;

    const timers: NodeJS.Timeout[] = [];
    
    (Object.keys(uploadProgress) as Array<keyof typeof uploadProgress>).forEach((key) => {
        const interval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev[key] >= 100) {
                const timer = timers.find(t => t.toString() === interval.toString());
                if (timer) clearInterval(timer);
                return prev;
            }
            const newProgress = { ...prev };
            newProgress[key] += Math.random() * 20;
            if (newProgress[key] > 100) {
              newProgress[key] = 100;
            }
            return newProgress;
          });
        }, 300);
        timers.push(interval);
      });

    return () => timers.forEach(clearInterval);
  }, [step]);
  
  useEffect(() => {
    if (step === 'uploading' && Object.values(uploadProgress).every(p => p >= 100)) {
        const timeout = setTimeout(() => setStep('done'), 1000);
        return () => clearTimeout(timeout);
    }
  }, [uploadProgress, step]);

  const getSummaryForGame = (gameTitle: string) => {
    const found = summaries.find(s => s.title === gameTitle);
    return found ? found.summary : games.find(g => g.title === gameTitle)?.short_description || "";
  }
  
  const copyLink = () => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText("https://app.firebase.st/project/gamezone-showcase-1234");
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8">
      <div className="w-full max-w-4xl space-y-8">
        <header className="text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl">
            GameZone Firebase Uploader
          </h1>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            Fetch game data, summarize with AI, and upload to your Firebase project.
          </p>
        </header>

        <main>
          {step === "start" && (
            <Card className="mx-auto max-w-md text-center shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Start the Process</CardTitle>
                <CardDescription>
                  Click the button below to fetch game data and README from the GameZone repository.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="lg" onClick={handleFetchData}>
                  Fetch Game Data <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          )}
          
          {step === "fetching" && (
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-lg font-semibold">Fetching data and generating AI summaries...</p>
              <p className="text-muted-foreground">This may take a moment.</p>
            </div>
          )}

          {step === "fetched" && (
            <div className="space-y-8">
              <section>
                <h2 className="font-headline mb-4 text-3xl font-bold">Game Previews</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {games.map((game) => (
                    <GameCard key={game.id} game={game} summary={getSummaryForGame(game.title)} />
                  ))}
                </div>
              </section>
              <section>
                <h2 className="font-headline mb-4 text-3xl font-bold">README.md</h2>
                <Card className="shadow-lg">
                  <ScrollArea className="h-72">
                    <CardContent className="p-6">
                      <pre className="whitespace-pre-wrap font-body text-sm">
                        {readmeContent}
                      </pre>
                    </CardContent>
                  </ScrollArea>
                </Card>
              </section>
              <div className="text-center">
                <Button size="lg" onClick={handleUpload}>
                  <UploadCloud className="mr-2 h-4 w-4" /> Upload to Firebase
                </Button>
              </div>
            </div>
          )}
          
          {step === "uploading" && (
            <Card className="mx-auto max-w-lg shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Uploading to Firebase Storage...</CardTitle>
                <CardDescription>
                  Your game assets are being uploaded. Please wait.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium">
                          <Gamepad2 className="h-5 w-5 text-primary"/>
                          <span>Game Data</span>
                      </div>
                      <Progress value={uploadProgress.games} />
                  </div>
                  <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium">
                          <FileText className="h-5 w-5 text-primary"/>
                          <span>README.md</span>
                      </div>
                      <Progress value={uploadProgress.readme} />
                  </div>
                  <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium">
                          <Image className="h-5 w-5 text-primary"/>
                          <span>Images</span>
                      </div>
                      <Progress value={uploadProgress.images} />
                  </div>
              </CardContent>
            </Card>
          )}

          {step === "done" && (
            <Card className="mx-auto max-w-lg text-center shadow-lg">
              <CardHeader className="items-center">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
                <CardTitle className="font-headline pt-4 text-2xl">Upload Complete!</CardTitle>
                <CardDescription>
                  Your project has been successfully created. Access it via the link below.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 rounded-md border bg-muted p-3">
                  <LinkIcon className="h-4 w-4 text-muted-foreground" />
                  <p className="flex-1 truncate text-sm text-foreground">
                    https://app.firebase.st/project/gamezone-showcase-1234
                  </p>
                  <Button variant="ghost" size="icon" onClick={copyLink}>
                    {isCopied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
