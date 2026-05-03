'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mic, List, Plus, Search, BarChart3, LogOut } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const navigation = [
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/dashboard/notes', label: 'Notes', icon: List },
  { href: '/dashboard/add', label: 'New Note', icon: Plus },
  { href: '/dashboard/search', label: 'Search', icon: Search },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      router.replace('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <aside className="w-64 border-r border-border bg-muted/30 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <Mic size={24} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">VoiceNotes</h1>
            <p className="text-xs text-muted-foreground">AI Voice Notes</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-border">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
