/**
 * ARCHIVED — not mounted as a Next.js route.
 *
 * Previous route: `/demo-dashboard` (was `src/app/demo-dashboard/page.tsx`)
 *
 * To restore later:
 * 1. Copy this file back to `src/app/demo-dashboard/page.tsx`
 * 2. Uncomment links in `header.tsx`, `enquiry/page.tsx`, `book-appointment/page.tsx`
 * 3. Uncomment sitemap / robots entries if needed
 *
 * Kept for a future backend-powered shop-owner leads dashboard.
 */

"use client";

import * as React from "react";
import Link from "next/link";
import {
  Users,
  Phone,
  MapPin,
  FileText,
  Calendar,
  TrendingUp,
  Eye,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { demoAnalytics } from "@/data/analytics";
import { clearLeads, getLeads, type Lead } from "@/lib/leads";

const metricIcons = {
  visitors: Users,
  whatsappClicks: Users,
  phoneCalls: Phone,
  directions: MapPin,
  enquiries: FileText,
  appointments: Calendar,
};

export default function DemoDashboardPage() {
  const { metrics, topProducts, popularCollections, dailyVisitors } =
    demoAnalytics;
  const [liveLeads, setLiveLeads] = React.useState<Lead[]>([]);

  React.useEffect(() => {
    setLiveLeads(getLeads());
  }, []);

  const refresh = () => setLiveLeads(getLeads());

  return (
    <div className="min-h-screen bg-secondary/30 pb-16 pt-8">
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <div className="mb-8">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl tracking-wide">
              Shop Owner Dashboard
            </h1>
            <Badge variant="secondary">Demo</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Live enquiry & appointment leads + sample analytics for shop-owner
            demos · {demoAnalytics.period}
          </p>
        </div>

        <Card className="mb-8 border-brand/30 bg-brand-surface/60">
          <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
            <CardTitle className="text-base font-medium">
              Live Leads ({liveLeads.length})
            </CardTitle>
            <div className="flex gap-2">
              <Button asChild size="sm" variant="outline">
                <Link href="/enquiry">Add Enquiry</Link>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  clearLeads();
                  refresh();
                }}
                disabled={liveLeads.length === 0}
              >
                <Trash2 className="h-4 w-4" />
                Clear
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {liveLeads.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No live leads yet. Submit an enquiry or appointment to see it
                appear here instantly.
              </p>
            ) : (
              <div className="space-y-4">
                {liveLeads.slice(0, 8).map((lead, i) => (
                  <div key={lead.id}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium">{lead.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {lead.phone}
                          {lead.occasion ? ` · ${lead.occasion}` : ""}
                          {lead.service ? ` · ${lead.service}` : ""}
                        </p>
                        {(lead.lookingFor || lead.message) && (
                          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground/80">
                            {lead.lookingFor || lead.message}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <Badge variant="new" className="text-[10px]">
                          {lead.type}
                        </Badge>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {new Date(lead.createdAt).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                    {i < Math.min(liveLeads.length, 8) - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {(
            Object.entries(metrics) as [
              keyof typeof metrics,
              (typeof metrics)["visitors"],
            ][]
          ).map(([key, metric], index) => {
            const Icon = metricIcons[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-emerald-600">
                        {metric.change}
                      </span>
                    </div>
                    <p className="text-2xl font-bold">
                      {metric.value.toLocaleString()}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {metric.label}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-medium">
                <TrendingUp className="h-4 w-4" />
                Daily Visitors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-48 items-end gap-2">
                {dailyVisitors.map((day) => {
                  const maxVisitors = Math.max(
                    ...dailyVisitors.map((d) => d.visitors)
                  );
                  const height = (day.visitors / maxVisitors) * 100;
                  return (
                    <div
                      key={day.day}
                      className="flex flex-1 flex-col items-center gap-2"
                    >
                      <div
                        className="w-full rounded-t bg-brand/80 transition-all hover:bg-brand"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {day.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Popular Collections
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {popularCollections.map((col) => (
                <div key={col.name}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm">{col.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {col.views} views
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-brand"
                      style={{
                        width: `${(col.views / popularCollections[0].views) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-medium">
              <Eye className="h-4 w-4" />
              Top Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((prod, i) => (
                <div key={prod.name}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm">{prod.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{prod.views} views</span>
                    <span>{prod.enquiries} enquiries</span>
                  </div>
                  {i < topProducts.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <p className="pb-8 text-center text-xs text-muted-foreground/60">
          KPI charts use sample demo data. Live leads come from enquiry and
          appointment forms on this device.
        </p>
      </div>
    </div>
  );
}
