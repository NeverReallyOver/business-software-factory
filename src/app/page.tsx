import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "Authentication",
    description: "Supabase Auth with roles and Row Level Security.",
  },
  {
    title: "Reusable UI",
    description: "shadcn/ui primitives and shared components.",
  },
  {
    title: "Feature-first",
    description: "Code organized by feature for isolated changes.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-10 px-6 py-16">
      <header className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">
          Master Starter
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Business Software Factory
        </h1>
        <p className="max-w-xl text-muted-foreground">
          A reusable base for building professional software for small and
          medium businesses. Built with Next.js, TypeScript, Tailwind CSS,
          shadcn/ui, and Supabase.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <CardTitle className="text-base">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Getting started</CardTitle>
          <CardContent className="px-0 pt-2 text-sm text-muted-foreground">
            Read <code className="font-mono">docs/ENGINEERING_RULES.md</code> for engineering
            rules and <code className="font-mono">docs/</code> for architecture,
            database, security, and deployment notes.
          </CardContent>
        </CardHeader>
      </Card>

      <div className="flex flex-wrap gap-3">
        <a
          className={buttonVariants()}
          href="https://supabase.com/docs"
          target="_blank"
          rel="noreferrer"
        >
          Supabase docs
        </a>
        <a
          className={buttonVariants({ variant: "outline" })}
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noreferrer"
        >
          Next.js docs
        </a>
      </div>
    </main>
  );
}
