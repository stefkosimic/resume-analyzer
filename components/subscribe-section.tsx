"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addNewContact } from "@/utils/brevo";

export default function SubscribeSection() {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!email) return;
    // TODO: Integrate with your email marketing tool (e.g., Mailchimp, ConvertKit, Supabase, etc.)

    await addNewContact({ email });
    setEmail("");
    alert("Thanks for subscribing! We'll notify you when a new tool is out.");
  };

  return (
    <section className="bg-gradient-to-b from-background to-muted text-center py-12 px-6">
      <h2 className="text-3xl font-bold mb-4">
        Stay Updated with New AI Tools
      </h2>
      <p className="text-lg mb-6">
        {`We're building more AI-powered tools to help you succeed. Subscribe to
        get notified!`}
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-lg mx-auto">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-lg"
        />
        <Button onClick={handleSubscribe}>Subscribe</Button>
      </div>
      <p className="mt-4 text-sm">No spam. Unsubscribe anytime.</p>
    </section>
  );
}
