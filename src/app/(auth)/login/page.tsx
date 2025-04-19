"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { GraduationCap } from "lucide-react";
import { useToast } from "~/hooks/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      //  const success = await login(email, password);
      //  if (success) {
      //    const isAdmin = email === "admin@edu.com";
      //    router.push(isAdmin ? "/admin/dashboard" : "/dashboard");
      //    toast({
      //      title: "Login successful",
      //      description: `Welcome back, ${isAdmin ? "Administrator" : "Student"}!`,
      //    });
      //  } else {
      //    toast({
      //      variant: "destructive",
      //      title: "Login failed",
      //      description: "Invalid email or password. Please try again.",
      //    });
      //  }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred. Please try again.",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="mb-6 flex items-center justify-center">
            <GraduationCap className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-center text-2xl">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Login to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>Demo Credentials:</p>
            <p>Student: student@edu.com / student123</p>
            <p>Admin: admin@edu.com / admin123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
