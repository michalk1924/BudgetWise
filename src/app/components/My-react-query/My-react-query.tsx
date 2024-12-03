import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import usersService from '../../../services/user';

function Users() {
    const queryClient = useQueryClient();
    const [newUser, setNewUser] = useState({ name: '', email: '' });

    // Fetch all users
    const { data: users, isLoading, isError, error } = useQuery({
        queryKey: ['users'],
        queryFn: usersService.getAllUsers
    });

    // Mutation to add a new user
    const mutation = useMutation({
        mutationFn: usersService.createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error) => {
            console.error("Error adding user:", error.message);
        }
    });

    const handleAddUser = () => {
        if (!newUser.name || !newUser.email) {
            alert("Please fill out both the name and email fields.");
            return;
        }
        mutation.mutate(newUser); // מוסיף משתמש חדש
        setNewUser({ name: '', email: '' }); // מנקה את הטופס
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Users List</h1>
            <ul>
                {users?.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.email})
                    </li>
                ))}
            </ul>
            <h2>Add a New User</h2>
            <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />

            <button
                onClick={handleAddUser}
                disabled={mutation.isPending}
            >
                {mutation.isPending ? 'Adding...' : 'Add User'}
            </button>

        </div>
    );
}

export default Users;
