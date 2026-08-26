"use client";

import * as React from "react";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/layout/page-header";
import { validateEnquiry } from "@/lib/validation";
export default function EnquiryPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [form, setForm] = React.useState({
    name: "",
    phone: "",
    email: "",
    occasion: "",
    date: "",
    lookingFor: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateEnquiry({
      name: form.name,
      phone: form.phone,
      occasion: form.occasion,
      message: form.message,
    });

    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <PageHeader title="Enquiry" />
        <div className="max-w-2xl px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 pb-20">
          <div className="text-center py-16 border rounded-lg">
            <CheckCircle className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
            <h2 className="font-display text-2xl tracking-wide mb-2">
              Thank You
            </h2>
            <p className="text-muted-foreground mb-2">
              Your demo enquiry has been submitted successfully.
            </p>
            <p className="text-xs text-muted-foreground/60">
              This is a demonstration. No data has been sent to any server.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Enquiry"
        description="Tell us what you are looking for. We will get back to you shortly."
      />
      <div className="max-w-2xl px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 pb-20">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name *
              </label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Phone *
              </label>
              <Input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 98765 43210"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email (optional)
            </label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="your@email.com"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Occasion *
              </label>
              <Select
                value={form.occasion}
                onValueChange={(value) => setForm({ ...form, occasion: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select occasion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="party">Party</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.occasion && (
                <p className="mt-1 text-xs text-red-600">{errors.occasion}</p>
              )}
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-2">
                Preferred Date (optional)
              </label>
              <Input
                id="date"
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="lookingFor" className="block text-sm font-medium mb-2">
              What are you looking for?
            </label>
            <Input
              id="lookingFor"
              value={form.lookingFor}
              onChange={(e) => setForm({ ...form, lookingFor: e.target.value })}
              placeholder="e.g., Wedding sherwani, formal suit..."
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <Textarea
              id="message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us more about what you need..."
              rows={4}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-600">{errors.message}</p>
            )}
          </div>

          <Button type="submit" size="lg" variant="brand" className="w-full sm:w-auto">
            <Send className="h-4 w-4" />
            Send Enquiry
          </Button>

          <p className="text-xs text-muted-foreground/60">
            Demo form. No data is sent to any server.
          </p>
        </form>
      </div>
    </>
  );
}
