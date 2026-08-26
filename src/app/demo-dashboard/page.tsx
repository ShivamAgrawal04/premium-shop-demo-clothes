"use client";

import {
  Users,
  MessageCircle,
  Phone,
  MapPin,
  FileText,
  Calendar,
  TrendingUp,
  Eye,
} from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { demoAnalytics } from "@/data/analytics";

const metricIcons = {
  visitors: Users,
  whatsappClicks: MessageCircle,
  phoneCalls: Phone,
  directions: MapPin,
  enquiries: FileText,
  appointments: Calendar,
};

export default function DemoDashboardPage() {
  const { metrics, recentEnquiries, topProducts, popularCollections, dailyVisitors } =
    demoAnalytics;

  return (
    <div className="pt-24 pb-16 lg:pt-28 min-h-screen bg-secondary/30">
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-display text-3xl tracking-wide">
              Analytics Dashboard
            </h1>
            <Badge variant="secondary">Demo</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Demo Data — Not Connected to Live Analytics • {demoAnalytics.period}
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {(Object.entries(metrics) as [keyof typeof metrics, typeof metrics.visitors][]).map(
            ([key, metric], index) => {
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
                      <div className="flex items-center justify-between mb-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-emerald-600 font-medium">
                          {metric.change}
                        </span>
                      </div>
                      <p className="text-2xl font-bold">{metric.value.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground mt-1">{metric.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            }
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Daily Visitors Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Daily Visitors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2 h-48">
                {dailyVisitors.map((day) => {
                  const maxVisitors = Math.max(...dailyVisitors.map((d) => d.visitors));
                  const height = (day.visitors / maxVisitors) * 100;
                  return (
                    <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-brand/80 rounded-t transition-all hover:bg-brand"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-xs text-muted-foreground">{day.day}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Popular Collections */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Popular Collections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {popularCollections.map((col) => (
                <div key={col.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{col.name}</span>
                    <span className="text-xs text-muted-foreground">{col.views} views</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand rounded-full"
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Enquiries */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Recent Enquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEnquiries.map((enq, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{enq.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {enq.phone} • {enq.occasion}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            enq.status === "new"
                              ? "new"
                              : enq.status === "confirmed"
                                ? "brand"
                                : "secondary"
                          }
                          className="text-[10px]"
                        >
                          {enq.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{enq.date}</p>
                      </div>
                    </div>
                    {i < recentEnquiries.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Top Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((prod, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
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
        </div>

        {/* Conversion Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-base font-medium">Conversion Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <p className="text-xs text-muted-foreground mb-1">WhatsApp Rate</p>
                <p className="text-xl font-bold">3.5%</p>
                <p className="text-xs text-emerald-600">86 / 2,481</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Call Rate</p>
                <p className="text-xl font-bold">1.7%</p>
                <p className="text-xs text-emerald-600">42 / 2,481</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Enquiry Rate</p>
                <p className="text-xl font-bold">1.5%</p>
                <p className="text-xs text-emerald-600">38 / 2,481</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Appointment Rate</p>
                <p className="text-xl font-bold">0.6%</p>
                <p className="text-xs text-emerald-600">14 / 2,481</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground/60 pb-8">
          Demo Data — Not Connected to Live Analytics. All metrics are simulated for demonstration purposes.
        </p>
      </div>
    </div>
  );
}
