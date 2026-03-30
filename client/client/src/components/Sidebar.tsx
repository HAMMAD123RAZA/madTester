import { ChevronDown, Menu, Settings, X } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  clients: Array<{ id: string; name: string }>;
  campaigns: Array<{ id: string; name: string; client: string }>;
  selectedCampaign?: string;
  onCampaignSelect: (campaignId: string) => void;
  onSettingsClick: () => void;
}

export function Sidebar({ clients, campaigns, selectedCampaign, onCampaignSelect, onSettingsClick }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedClients, setExpandedClients] = useState<Set<string>>(new Set(clients.map(c => c.id)));

  const toggleClient = (clientId: string) => {
    const newExpanded = new Set(expandedClients);
    if (newExpanded.has(clientId)) {
      newExpanded.delete(clientId);
    } else {
      newExpanded.add(clientId);
    }
    setExpandedClients(newExpanded);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <h1 className="text-lg font-bold text-sidebar-foreground">Dashboard</h1>
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden p-1 hover:bg-sidebar-accent rounded-lg transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {/* Clients Section */}
        <div className="space-y-2">
          <p className="px-2 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">Clients</p>
          {clients.map(client => {
            const clientCampaigns = campaigns.filter(c => c.client === client.name);
            const isExpanded = expandedClients.has(client.id);

            return (
              <div key={client.id} className="space-y-1">
                <button
                  onClick={() => toggleClient(client.id)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                >
                  <span>{client.name}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                {isExpanded && (
                  <div className="ml-2 space-y-1 border-l border-sidebar-border pl-2">
                    {clientCampaigns.map(campaign => (
                      <button
                        key={campaign.id}
                        onClick={() => {
                          onCampaignSelect(campaign.id);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          selectedCampaign === campaign.id
                            ? 'bg-sidebar-primary text-sidebar-primary-foreground font-medium'
                            : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                        }`}
                      >
                        {campaign.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4">
        <Button
          onClick={onSettingsClick}
          variant="outline"
          className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-6 right-6 z-40 p-3 bg-accent text-accent-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-40 top-0 left-0 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
