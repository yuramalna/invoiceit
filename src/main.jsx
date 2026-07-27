import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  ChartNoAxesColumn,
  Check,
  ChevronDown,
  Clock,
  Download,
  FileText,
  List,
  Menu,
  Pencil,
  Play,
  Plus,
  Receipt,
  RefreshCw,
  Search,
  Send,
  Settings,
  Square,
  Trash2,
  Users,
  X,
} from 'lucide';
import '../Hours Design System/styles.css';
import './app.css';

window.React = React;
window.lucide = {
  icons: {
    ArrowDownRight,
    ArrowUpRight,
    CalendarDays,
    ChartNoAxesColumn,
    Check,
    ChevronDown,
    Clock,
    Download,
    FileText,
    List,
    Menu,
    Pencil,
    Play,
    Plus,
    Receipt,
    RefreshCw,
    Search,
    Send,
    Settings,
    Square,
    Trash2,
    Users,
    X,
  },
};

async function boot() {
  await import('../Hours Design System/_ds_bundle.js');
  const { default: App } = await import('./App.jsx');

  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

boot();
