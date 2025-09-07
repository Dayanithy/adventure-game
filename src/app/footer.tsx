export default function Footer() {
  return (
    <footer className="w-full py-6 text-center text-sm text-muted-foreground border-t bg-background mt-8">
      Adventure Game © {new Date().getFullYear()} &mdash; All rights reserved.
    </footer>
  );
}
