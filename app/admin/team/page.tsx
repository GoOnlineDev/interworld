'use client';

import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useUser } from '@clerk/nextjs';
import { formatDistanceToNow } from 'date-fns';
import {
  Shield,
  Crown,
  Edit2,
  UserCheck,
  UserX,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

// Get the app URL for email links
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// Helper to send emails
async function sendEmail(type: string, to: string | string[], data: Record<string, unknown>) {
  try {
    await fetch('/api/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, to, data }),
    });
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

export default function TeamPage() {
  const { user } = useUser();

  const users = useQuery(api.users.list);
  const pendingUsers = useQuery(api.users.listPending);
  const currentUser = useQuery(
    api.users.getCurrentUser,
    user?.id ? { clerkId: user.id } : 'skip'
  );

  const approveUser = useMutation(api.users.approveUser);
  const updateRole = useMutation(api.users.updateRole);
  const rejectUser = useMutation(api.users.rejectUser);
  const toggleActive = useMutation(api.users.toggleActive);
  const createNotification = useMutation(api.notifications.createForUser);

  const isAdmin = currentUser?.role === 'admin';

  // Redirect if not admin
  if (currentUser && !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Card className="border-2 border-red-100 bg-red-50 max-w-md">
          <CardContent className="py-8 text-center">
            <Shield className="h-12 w-12 mx-auto text-red-400 mb-4" />
            <h3 className="text-lg font-medium text-red-900 mb-2">Access Denied</h3>
            <p className="text-red-700">
              Only admins can manage team members. Contact an admin for access.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleApproveUser = async (
    userId: Id<'users'>,
    userEmail: string,
    userName: string,
    userClerkId: string,
    role: 'admin' | 'editor'
  ) => {
    try {
      await approveUser({ userId, role });
      
      // Create in-app notification for the user
      await createNotification({
        type: 'user_approved',
        title: 'Account Approved!',
        message: `Welcome! You've been approved as ${role}. You can now access the dashboard.`,
        link: '/admin',
        recipientClerkId: userClerkId,
      });

      // Send email to the approved user
      sendEmail('user_approved', userEmail, {
        userName,
        role,
        adminDashboardUrl: `${APP_URL}/admin`,
      });

      toast.success(`User approved as ${role}`);
    } catch (error) {
      toast.error('Failed to approve user');
    }
  };

  const handleRoleChange = async (userId: Id<'users'>, role: 'admin' | 'editor') => {
    try {
      await updateRole({ userId, role });
      toast.success(`Role updated to ${role}`);
    } catch (error) {
      toast.error('Failed to update role');
    }
  };

  const handleRejectUser = async (
    userId: Id<'users'>,
    userEmail: string,
    userName: string
  ) => {
    try {
      // Send rejection email before deleting the user
      await sendEmail('user_rejected', userEmail, { userName });
      
      await rejectUser({ userId });
      toast.success('User rejected and removed');
    } catch (error) {
      toast.error('Failed to reject user');
    }
  };

  const handleToggleActive = async (userId: Id<'users'>) => {
    try {
      await toggleActive({ userId });
      toast.success('User status updated');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  if (!users) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const admins = users.filter((u) => u.role === 'admin');
  const editors = users.filter((u) => u.role === 'editor');
  const pending = pendingUsers || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Team Management</h1>
        <p className="text-gray-600">Manage user roles and approve new members</p>
      </div>

      {/* Role Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2 border-green-100 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Crown className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-green-900">Admin</h4>
                <p className="text-sm text-green-700">
                  Full access: publish content, manage team, partners
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-blue-100 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Edit2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900">Editor</h4>
                <p className="text-sm text-blue-700">
                  Can create and edit content (drafts only)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-yellow-100 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-semibold text-yellow-900">Pending</h4>
                <p className="text-sm text-yellow-700">
                  Awaiting admin approval to access dashboard
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Users */}
      {pending.length > 0 && (
        <Card className="border-2 border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <Clock className="h-5 w-5" />
              Pending Approval ({pending.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pending.map((u) => (
                <div
                  key={u._id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border-2 border-yellow-200 bg-white gap-4"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={u.avatar} />
                      <AvatarFallback className="bg-yellow-100 text-yellow-700">
                        {u.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-gray-900">{u.name}</h4>
                      <p className="text-sm text-gray-500">{u.email}</p>
                      <p className="text-xs text-gray-400">
                        Signed up {formatDistanceToNow(u.createdAt, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleApproveUser(u._id, u.email, u.name, u.clerkId, 'editor')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve as Editor
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleApproveUser(u._id, u.email, u.name, u.clerkId, 'admin')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Crown className="h-4 w-4 mr-1" />
                      Make Admin
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Reject User</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to reject {u.name}? Their account will be removed and they will be notified via email.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleRejectUser(u._id, u.email, u.name)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Reject
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Admins */}
      <Card className="border-2 border-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-green-600" />
            Admins ({admins.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {admins.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No admins found</p>
          ) : (
            <div className="space-y-3">
              {admins.map((u) => (
                <div
                  key={u._id}
                  className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border-2 gap-4 ${
                    u.isActive ? 'border-gray-100 bg-white' : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={u.avatar} />
                      <AvatarFallback className="bg-green-100 text-green-700">
                        {u.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900">{u.name}</h4>
                        {u.clerkId === user?.id && (
                          <Badge variant="secondary" className="text-xs">You</Badge>
                        )}
                        {!u.isActive && (
                          <Badge variant="secondary" className="text-xs bg-red-100 text-red-700">
                            Inactive
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{u.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {u.clerkId !== user?.id && (
                      <>
                        <Select
                          value={u.role}
                          onValueChange={(value) =>
                            handleRoleChange(u._id, value as 'admin' | 'editor')
                          }
                        >
                          <SelectTrigger className="w-28">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleActive(u._id)}
                          title={u.isActive ? 'Deactivate user' : 'Activate user'}
                        >
                          {u.isActive ? (
                            <UserX className="h-4 w-4 text-red-500" />
                          ) : (
                            <UserCheck className="h-4 w-4 text-green-500" />
                          )}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Editors */}
      <Card className="border-2 border-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit2 className="h-5 w-5 text-blue-600" />
            Editors ({editors.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {editors.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No editors yet</p>
          ) : (
            <div className="space-y-3">
              {editors.map((u) => (
                <div
                  key={u._id}
                  className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border-2 gap-4 ${
                    u.isActive ? 'border-gray-100 bg-white' : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={u.avatar} />
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {u.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900">{u.name}</h4>
                        {!u.isActive && (
                          <Badge variant="secondary" className="text-xs bg-red-100 text-red-700">
                            Inactive
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{u.email}</p>
                      <p className="text-xs text-gray-400">
                        Joined {formatDistanceToNow(u.createdAt, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={u.role}
                      onValueChange={(value) =>
                        handleRoleChange(u._id, value as 'admin' | 'editor')
                      }
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleActive(u._id)}
                      title={u.isActive ? 'Deactivate user' : 'Activate user'}
                    >
                      {u.isActive ? (
                        <UserX className="h-4 w-4 text-red-500" />
                      ) : (
                        <UserCheck className="h-4 w-4 text-green-500" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="border-2 border-gray-100 bg-gray-50">
        <CardContent className="p-4">
          <h4 className="font-medium text-gray-900 mb-2">How it works</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• <strong>First user</strong> who signs up becomes Admin automatically (bootstrap)</li>
            <li>• <strong>All other users</strong> start as "Pending" and need admin approval</li>
            <li>• <strong>Admins</strong> can approve pending users and assign them roles</li>
            <li>• <strong>Approved users</strong> receive an email notification with their role</li>
            <li>• <strong>Inactive users</strong> cannot access the admin dashboard</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
