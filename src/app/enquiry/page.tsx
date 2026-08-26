"use client";

import * as React from "react";
import Link from "next/link";
import { Send, CheckCircle, ArrowRight } from "lucide-react";
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
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { validateEnquiry } from "@/lib/validation";
import {
  formatLeadWhatsAppMessage,
  saveLead,
} from "@/lib/leads";
import { whatsappLeadMessage } from "@/lib/whatsapp";

export default function EnquiryPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [waUrl, setWaUrl] = React.useState("");
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

    const lead = saveLead({
      type: "enquiry",
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      occasion: form.occasion,
      date: form.date || undefined,
      lookingFor: form.lookingFor.trim() || undefined,
      message: form.message.trim() || undefined,
    });

    const url = whatsappLeadMessage(formatLeadWhatsAppMessage(lead));
    setWaUrl(url);
    setErrors({});
    setSubmitted(true);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (submitted) {
    return (
      <>
        <PageHeader title="Enquiry" />
        <div className="max-w-2xl px-6 pb-20 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <div className="border py-16 text-center">
            <CheckCircle className="mx-auto mb-4 h-12 w-12 text-emerald-600" />
            <h2 className="mb-2 font-display text-2xl tracking-wide">
              Enquiry Captured
            </h2>
            <p className="mb-2 text-muted-foreground">
              Your lead is saved for the shop owner and opened in WhatsApp for
              instant follow-up.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="brand">
                <a href={waUrl} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="h-4 w-4" />
                  Open WhatsApp Again
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link href="/demo-dashboard">
                  View Lead Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
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
      <div className="max-w-2xl px-6 pb-20 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
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
              <label htmlFor="phone" className="mb-2 block text-sm font-medium">
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
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
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

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
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
              <label htmlFor="date" className="mb-2 block text-sm font-medium">
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
            <label
              htmlFor="lookingFor"
              className="mb-2 block text-sm font-medium"
            >
              What are you looking for?
            </label>
            <Input
              id="lookingFor"
              value={form.lookingFor}
              onChange={(e) =>
                setForm({ ...form, lookingFor: e.target.value })
              }
              placeholder="e.g., Wedding sherwani, formal suit..."
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium">
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

          <Button
            type="submit"
            size="lg"
            variant="brand"
            className="w-full sm:w-auto"
          >
            <Send className="h-4 w-4" />
            Send Enquiry via WhatsApp
          </Button>

          <p className="text-xs text-muted-foreground/70">
            Leads are saved on this device for the shop-owner demo dashboard and
            forwarded on WhatsApp.
          </p>
        </form>
      </div>
    </>
  );
}
