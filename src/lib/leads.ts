export type LeadType = "enquiry" | "appointment" | "contact";

export interface Lead {
  id: string;
  type: LeadType;
  name: string;
  phone: string;
  email?: string;
  occasion?: string;
  date?: string;
  time?: string;
  service?: string;
  lookingFor?: string;
  message?: string;
  createdAt: string;
  status: "new" | "contacted" | "confirmed";
}

const STORAGE_KEY = "tgs-demo-leads";

function canUseStorage() {
  return typeof window !== "undefined" && !!window.localStorage;
}

export function getLeads(): Lead[] {
  if (!canUseStorage()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Lead[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveLead(
  input: Omit<Lead, "id" | "createdAt" | "status"> & { status?: Lead["status"] }
): Lead {
  const lead: Lead = {
    ...input,
    id: `lead-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    status: input.status ?? "new",
  };

  if (canUseStorage()) {
    const existing = getLeads();
    localStorage.setItem(STORAGE_KEY, JSON.stringify([lead, ...existing]));
  }

  return lead;
}

export function clearLeads() {
  if (canUseStorage()) localStorage.removeItem(STORAGE_KEY);
}

export function formatLeadWhatsAppMessage(lead: Lead): string {
  const lines = [
    `New ${lead.type} from ${lead.name}`,
    `Phone: ${lead.phone}`,
  ];
  if (lead.email) lines.push(`Email: ${lead.email}`);
  if (lead.occasion) lines.push(`Occasion: ${lead.occasion}`);
  if (lead.service) lines.push(`Service: ${lead.service}`);
  if (lead.date) lines.push(`Date: ${lead.date}`);
  if (lead.time) lines.push(`Time: ${lead.time}`);
  if (lead.lookingFor) lines.push(`Looking for: ${lead.lookingFor}`);
  if (lead.message) lines.push(`Message: ${lead.message}`);
  return lines.join("\n");
}
