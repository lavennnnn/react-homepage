import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface TechCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient: string;
  tags: string[];
}

export interface FeatureProps {
  title: string;
  description: string;
  icon: LucideIcon;
}