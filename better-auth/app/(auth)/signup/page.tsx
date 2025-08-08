import { AuthFooter } from "@/components/AuthFooter";
import { SignupForm } from "@/components/forms/SignupForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Link href="/" className="flex absolute top-5 left-5">
        <ChevronLeft />
        Home
      </Link>

      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome back</CardTitle>
              <CardDescription>Signup with your Google account</CardDescription>
            </CardHeader>

            <CardContent>
              <SignupForm />
            </CardContent>
          </Card>

          <AuthFooter />
        </div>
      </div>
    </main>
  );
}
