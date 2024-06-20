import { Card } from "@/components/ui/card";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full min-h-screen flex justify-center items-center">
      <Card className="w-96">{children}</Card>
    </div>
  );
}
