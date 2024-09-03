"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2Icon } from "lucide-react";

type Props = {
  className?: string;
  text?: string;
};

export function SubmitButton({ className = "", text = "Submit" }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className={className}>
      {pending ? <Loader2Icon className="h-4 w-4 animate-spin" /> : text}
    </Button>
  );
}
