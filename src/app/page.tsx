
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <main className="flex items-center justify-center bg-gray-100">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Welcome, Adventurer!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Prepare for an epic journey through mysterious lands, hidden treasures, and daring quests.</p>
            <p className="text-muted-foreground">Are you ready to begin your adventure? Click a menu link above to start exploring!</p>
          </CardContent>
        </Card>
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Choose Your Path</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Will you explore the enchanted forest, scale the icy mountains, or dive into the sunken caves?</p>
            <p className="text-muted-foreground">Each path holds secrets and surprises. The choice is yours!</p>
          </CardContent>
        </Card>
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Collect Treasures</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Find magical items, rare gems, and powerful artifacts as you progress through your quest.</p>
            <p className="text-muted-foreground">Keep your eyes open—treasure can be hidden anywhere!</p>
          </CardContent>
        </Card>
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Meet New Friends</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Encounter helpful allies and mysterious characters who will join you on your adventure.</p>
            <p className="text-muted-foreground">Teamwork and friendship are key to overcoming challenges!</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
