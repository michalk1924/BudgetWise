import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import usersService from '../../../services/user';
import { User } from '../../../types/types';

function Users() {
    const queryClient = useQueryClient();

    const [newUser, setNewUser] = useState<{ username: string; email: string }>({
        username: '',
        email: '',
    });

    const [editingUser, setEditingUser] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<{ username: string; email: string }>({
        username: '',
        email: '',
    });

    // Fetch all users
    const { data: users, isLoading, isError, error } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: usersService.getAllUsers,
    });

    // Mutation to add a new user
    const addUserMutation = useMutation({
        mutationFn: (user: { username: string; email: string }) =>
            usersService.createUser(user),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error: Error) => {
            console.error('Error adding user:', error.message);
        },
    });

    // Mutation to update a user
    const updateUserMutation = useMutation({
        mutationFn: ({ id, body }: { id: string; body: Partial<User> }) =>
            usersService.updateUser(id, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            setEditingUser(null);
        },
        onError: (error: Error) => {
            console.error('Error updating user:', error.message);
        },
    });

    const handleAddUser = () => {
        if (!newUser.username || !newUser.email) {
            alert('Please fill out both the username and email fields.');
            return;
        }
        addUserMutation.mutate(newUser);
        setNewUser({ username: '', email: '' });
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user._id || null);
        setEditForm({ username: user.username || '', email: user.email || '' });
    };

    const handleUpdateUser = () => {
        if (!editForm.username || !editForm.email) {
            alert('Please fill out both the username and email fields.');
            return;
        }
        if (editingUser) {
            updateUserMutation.mutate({ id: editingUser, body: editForm });
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {(error as Error).message}</div>;

    return (
        <div>
            <h1>Users List</h1>
            <ul>
                {users?.map((user) => (
                    <li key={user._id}>
                        {user.username} ({user.email})
                        <button onClick={() => handleEditUser(user)}>Edit</button>
                    </li>
                ))}
            </ul>
            <h2>Add a New User</h2>
            <input
                type="text"
                placeholder="Username"
                value={newUser.username}
                onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                }
            />
            <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                }
            />
            <button
                onClick={handleAddUser}
                disabled={addUserMutation.isPending}
            >
                {addUserMutation.isPending ? 'Adding...' : 'Add User'}
            </button>

            {editingUser && (
                <div>
                    <h2>Edit User</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={editForm.username}
                        onChange={(e) =>
                            setEditForm({ ...editForm, username: e.target.value })
                        }
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={editForm.email}
                        onChange={(e) =>
                            setEditForm({ ...editForm, email: e.target.value })
                        }
                    />
                    <button
                        onClick={handleUpdateUser}
                        disabled={updateUserMutation.isPending}
                    >
                        {updateUserMutation.isPending
                            ? 'Updating...'
                            : 'Update User'}
                    </button>
                    <button onClick={() => setEditingUser(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default Users;
