"use client";

import * as React from "react";
import Link from "next/link";
import { Calendar, CheckCircle, ArrowRight } from "lucide-react";
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
import { validateAppointment } from "@/lib/validation";
import { formatLeadWhatsAppMessage, saveLead } from "@/lib/leads";
import { whatsappLeadMessage } from "@/lib/whatsapp";

export default function BookAppointmentPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [waUrl, setWaUrl] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [form, setForm] = React.useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateAppointment({
      name: form.name,
      phone: form.phone,
      date: form.date,
      time: form.time,
      service: form.service,
    });

    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    const lead = saveLead({
      type: "appointment",
      name: form.name.trim(),
      phone: form.phone.trim(),
      date: form.date,
      time: form.time,
      service: form.service,
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
        <PageHeader title="Book an Appointment" />
        <div className="max-w-2xl px-6 pb-20 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <div className="border py-16 text-center">
            <CheckCircle className="mx-auto mb-4 h-12 w-12 text-emerald-600" />
            <h2 className="mb-2 font-display text-2xl tracking-wide">
              Appointment Requested
            </h2>
            <p className="mb-2 text-muted-foreground">
              Your request is saved for the shop owner and opened in WhatsApp
              for confirmation.
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
        title="Book an Appointment"
        description="Schedule a personal consultation at our store in Bhind."
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

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="date" className="mb-2 block text-sm font-medium">
                Preferred Date *
              </label>
              <Input
                id="date"
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
              {errors.date && (
                <p className="mt-1 text-xs text-red-600">{errors.date}</p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Preferred Time *
              </label>
              <Select
                value={form.time}
                onValueChange={(value) => setForm({ ...form, time: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="12:00">12:00 PM</SelectItem>
                  <SelectItem value="14:00">2:00 PM</SelectItem>
                  <SelectItem value="15:00">3:00 PM</SelectItem>
                  <SelectItem value="16:00">4:00 PM</SelectItem>
                  <SelectItem value="17:00">5:00 PM</SelectItem>
                  <SelectItem value="18:00">6:00 PM</SelectItem>
                  <SelectItem value="19:00">7:00 PM</SelectItem>
                </SelectContent>
              </Select>
              {errors.time && (
                <p className="mt-1 text-xs text-red-600">{errors.time}</p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Service / Occasion *
            </label>
            <Select
              value={form.service}
              onValueChange={(value) => setForm({ ...form, service: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wedding">Wedding Consultation</SelectItem>
                <SelectItem value="suit">Suit Consultation</SelectItem>
                <SelectItem value="general">General Shopping</SelectItem>
                <SelectItem value="styling">Styling Consultation</SelectItem>
              </SelectContent>
            </Select>
            {errors.service && (
              <p className="mt-1 text-xs text-red-600">{errors.service}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium">
              Message (optional)
            </label>
            <Textarea
              id="message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Any specific requirements..."
              rows={3}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            variant="brand"
            className="w-full sm:w-auto"
          >
            <Calendar className="h-4 w-4" />
            Book via WhatsApp
          </Button>

          <p className="text-xs text-muted-foreground/70">
            Appointment leads are stored for the shop-owner dashboard and sent
            on WhatsApp for confirmation.
          </p>
        </form>
      </div>
    </>
  );
}
