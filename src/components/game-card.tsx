import Image from 'next/image';
import type { Game } from '@/lib/game-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GameCardProps {
  game: Game;
  summary: string;
}

export function GameCard({ game, summary }: GameCardProps) {
  const placeholder = PlaceHolderImages.find((p) => p.id === game.imageId);

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline">{game.title}</CardTitle>
        <div className="flex flex-wrap gap-2 pt-2">
          <Badge variant="secondary">{game.genre}</Badge>
          <Badge variant="outline">{game.platform}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {placeholder && (
          <div className="relative aspect-video w-full">
            <Image
              src={placeholder.imageUrl}
              alt={placeholder.description}
              data-ai-hint={placeholder.imageHint}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-md object-cover"
            />
          </div>
        )}
        <CardDescription>{summary}</CardDescription>
      </CardContent>
    </Card>
  );
}
