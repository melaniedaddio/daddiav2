import {
  AlarmClock, BarChart3, BellRing, BookOpen, Box, BrainCircuit, Building2, CalendarCheck,
  CalendarDays, ClipboardList, Clock, Compass, Euro, FileText, FolderOpen, GraduationCap, Hammer, Inbox, KeyRound, Layers,
  LayoutDashboard, Lightbulb, Lock, Mail, MailCheck, MessageCircle, MessagesSquare, Mic, Moon,
  Notebook, PhoneCall, Radar, Repeat, Rocket, ScrollText, Send, Server, ShieldCheck,
  Sparkles, Star, Target, Timer, TrendingUp, UserCheck, Users, Wand2, Wrench,
  type LucideIcon, type LucideProps,
} from "lucide-react"

import type { IconName } from "@/types/offer"

const ICONS: Record<IconName, LucideIcon> = {
  AlarmClock, BarChart3, BellRing, BookOpen, Box, BrainCircuit, Building2, CalendarCheck,
  CalendarDays, ClipboardList, Clock, Compass, Euro, FileText, FolderOpen, GraduationCap, Hammer, Inbox, KeyRound, Layers,
  LayoutDashboard, Lightbulb, Lock, Mail, MailCheck, MessageCircle, MessagesSquare, Mic, Moon,
  Notebook, PhoneCall, Radar, Repeat, Rocket, ScrollText, Send, Server, ShieldCheck,
  Sparkles, Star, Target, Timer, TrendingUp, UserCheck, Users, Wand2, Wrench,
}

/** Icône Lucide par son nom (les données des offres référencent les icônes par nom). */
export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = ICONS[name]
  return <Cmp aria-hidden {...props} />
}
