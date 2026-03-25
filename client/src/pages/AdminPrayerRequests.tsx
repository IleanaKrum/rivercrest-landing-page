import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, AlertCircle, Trash2, Filter, Search, ChevronDown } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/_core/hooks/useAuth';

type PrayerStatus = 'new' | 'acknowledged' | 'praying' | 'answered';
type PrayerCategory = 'church_planting' | 'leadership_development' | 'refugee_support' | 'community_outreach' | 'missions' | 'healing' | 'family' | 'other';

interface PrayerRequest {
  id: number;
  name: string;
  email: string;
  prayerCategory: PrayerCategory;
  prayerRequest: string;
  isPublic: number;
  status: PrayerStatus;
  createdAt: Date;
  updatedAt: Date;
}

export default function AdminPrayerRequests() {
  const { user } = useAuth();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [statusFilter, setStatusFilter] = useState<PrayerStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<PrayerCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [bulkAction, setBulkAction] = useState<PrayerStatus | 'delete' | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="container py-20">
        <Card className="p-8 bg-red-50 border border-red-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-bold text-red-900">Access Denied</h2>
              <p className="text-red-800 mt-1">You must be an admin to view this page.</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Fetch prayer requests
  const { data: prayerRequests = [], isLoading, refetch } = trpc.prayerRequests.getAll.useQuery();
  const updateStatusMutation = trpc.prayerRequests.updateStatus.useMutation();
  const bulkUpdateMutation = trpc.prayerRequests.bulkUpdateStatus.useMutation();
  const deleteMutation = trpc.prayerRequests.deletePrayerRequest.useMutation();
  const bulkDeleteMutation = trpc.prayerRequests.bulkDelete.useMutation();

  // Filter prayer requests
  const filteredRequests = useMemo(() => {
    return prayerRequests.filter((req: PrayerRequest) => {
      const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || req.prayerCategory === categoryFilter;
      const matchesSearch =
        searchTerm === '' ||
        req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [prayerRequests, statusFilter, categoryFilter, searchTerm]);

  // Handle bulk action
  const handleBulkAction = async () => {
    if (selectedIds.length === 0) return;

    try {
      if (bulkAction === 'delete') {
        await bulkDeleteMutation.mutateAsync({ ids: selectedIds });
      } else if (bulkAction) {
        await bulkUpdateMutation.mutateAsync({ ids: selectedIds, status: bulkAction });
      }
      setSelectedIds([]);
      setBulkAction(null);
      setShowConfirm(false);
      refetch();
    } catch (error) {
      console.error('Bulk action failed:', error);
    }
  };

  // Handle individual status update
  const handleStatusUpdate = async (id: number, status: PrayerStatus) => {
    try {
      await updateStatusMutation.mutateAsync({ id, status });
      refetch();
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this prayer request?')) {
      try {
        await deleteMutation.mutateAsync({ id });
        refetch();
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const statusColors: Record<PrayerStatus, string> = {
    new: 'bg-blue-100 text-blue-800',
    acknowledged: 'bg-yellow-100 text-yellow-800',
    praying: 'bg-purple-100 text-purple-800',
    answered: 'bg-green-100 text-green-800',
  };

  const categoryLabels: Record<PrayerCategory, string> = {
    church_planting: 'Church Planting',
    leadership_development: 'Leadership Development',
    refugee_support: 'Refugee Support',
    community_outreach: 'Community Outreach',
    missions: 'Missions',
    healing: 'Healing',
    family: 'Family',
    other: 'Other',
  };

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Prayer Requests Management</h1>
        <p className="text-foreground/70">View, filter, and manage all prayer requests from the community.</p>
      </div>

      {/* Filters */}
      <Card className="p-6 mb-6 bg-white border border-border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-foreground/50" />
              <input
                type="text"
                placeholder="Name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="praying">Praying</option>
              <option value="answered">Answered</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Categories</option>
              <option value="church_planting">Church Planting</option>
              <option value="leadership_development">Leadership Development</option>
              <option value="refugee_support">Refugee Support</option>
              <option value="community_outreach">Community Outreach</option>
              <option value="missions">Missions</option>
              <option value="healing">Healing</option>
              <option value="family">Family</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="flex items-end">
            <div className="text-sm text-foreground/70">
              {filteredRequests.length} of {prayerRequests.length} requests
            </div>
          </div>
        </div>
      </Card>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <Card className="p-4 mb-6 bg-blue-50 border border-blue-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">
              {selectedIds.length} request(s) selected
            </span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setBulkAction('praying');
                  setShowConfirm(true);
                }}
              >
                Mark as Praying
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setBulkAction('answered');
                  setShowConfirm(true);
                }}
              >
                Mark as Answered
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-600 hover:text-red-700"
                onClick={() => {
                  setBulkAction('delete');
                  setShowConfirm(true);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedIds([])}
              >
                Clear
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Confirmation Dialog */}
      {showConfirm && (
        <Card className="p-6 mb-6 bg-yellow-50 border border-yellow-200">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-yellow-900">Confirm Action</h3>
              <p className="text-yellow-800 mt-2">
                {bulkAction === 'delete'
                  ? `Delete ${selectedIds.length} prayer request(s)? This cannot be undone.`
                  : `Mark ${selectedIds.length} prayer request(s) as "${bulkAction}"?`}
              </p>
              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  onClick={handleBulkAction}
                  disabled={bulkUpdateMutation.isPending || bulkDeleteMutation.isPending}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  Confirm
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Prayer Requests Table */}
      {isLoading ? (
        <Card className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-foreground/70 mt-4">Loading prayer requests...</p>
        </Card>
      ) : filteredRequests.length === 0 ? (
        <Card className="p-8 text-center bg-white border border-border">
          <p className="text-foreground/70">No prayer requests found matching your filters.</p>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredRequests.length && filteredRequests.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIds(filteredRequests.map((r: PrayerRequest) => r.id));
                      } else {
                        setSelectedIds([]);
                      }
                    }}
                    className="w-4 h-4 rounded border-border cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Public</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request: PrayerRequest) => (
                <tr key={request.id} className="border-b border-border hover:bg-background/50 transition-colors">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(request.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedIds([...selectedIds, request.id]);
                        } else {
                          setSelectedIds(selectedIds.filter((id) => id !== request.id));
                        }
                      }}
                      className="w-4 h-4 rounded border-border cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{request.name}</td>
                  <td className="px-4 py-3 text-sm text-foreground/70">{request.email}</td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {categoryLabels[request.prayerCategory]}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={request.status}
                      onChange={(e) => handleStatusUpdate(request.id, e.target.value as PrayerStatus)}
                      className={`px-2 py-1 rounded text-xs font-medium ${statusColors[request.status]} border-0 cursor-pointer`}
                    >
                      <option value="new">New</option>
                      <option value="acknowledged">Acknowledged</option>
                      <option value="praying">Praying</option>
                      <option value="answered">Answered</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    {request.isPublic === 1 ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-foreground/30" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground/70">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(request.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
