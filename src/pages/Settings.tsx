import { useState } from 'react';
import { Settings as SettingsIcon, User, Lock, Save, Upload, LogOut } from 'lucide-react';

const Settings = () => {
    // Mock user state
    const [user, setUser] = useState({
        name: 'User',
        email: 'user@example.com',
        avatar: 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff',
        bio: 'Frontend Developer & Productivity Enthusiast'
    });

    const [password, setPassword] = useState({ current: '', new: '', confirm: '' });

    const handleSave = () => {
        // Logic to save profile would go here
        alert('Profile updated!');
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <header className="flex items-center justify-between pb-6 border-b border-[var(--border-subtle)]">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Settings</h1>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Manage your account and preferences.</p>
                </div>
                <div className="w-10 h-10 rounded bg-[var(--bg-panel)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-tertiary)]">
                    <SettingsIcon className="w-5 h-5" />
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar Navigation (Mock) */}
                <div className="space-y-1">
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md bg-[var(--bg-hover)] text-white text-sm font-medium">
                        <User className="w-4 h-4" />
                        Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-hover)] text-sm font-medium transition-colors">
                        <Lock className="w-4 h-4" />
                        Security
                    </button>
                </div>

                {/* Main Content */}
                <div className="md:col-span-2 space-y-8">
                    {/* Profile Section */}
                    <section className="card p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)]">Profile Configuration</h2>

                        <div className="flex items-center gap-6">
                            <div className="relative group">
                                <img src={user.avatar} alt="Profile" className="w-20 h-20 rounded-full border-2 border-[var(--bg-panel)] shadow-lg" />
                                <button className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Upload className="w-5 h-5 text-white" />
                                </button>
                            </div>
                            <div>
                                <h3 className="font-medium text-[var(--text-primary)]">Profile Photo</h3>
                                <p className="text-xs text-[var(--text-tertiary)] mt-1">Accepts JPG, PNG. Max 1MB.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Full Name</label>
                                <input
                                    type="text"
                                    value={user.name}
                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    className="input-base w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Email Address</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    className="input-base w-full"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Bio</label>
                                <textarea
                                    value={user.bio}
                                    onChange={(e) => setUser({ ...user, bio: e.target.value })}
                                    className="input-base w-full h-24"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                                <Save className="w-4 h-4" />
                                Save Changes
                            </button>
                        </div>
                    </section>

                    {/* Password Section */}
                    <section className="card p-6 space-y-6 opacity-75">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)]">Password & Security</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Current Password</label>
                                <input
                                    type="password"
                                    className="input-base w-full"
                                    placeholder="••••••••"
                                    value={password.current}
                                    onChange={(e) => setPassword({ ...password, current: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">New Password</label>
                                <input
                                    type="password"
                                    className="input-base w-full"
                                    placeholder="••••••••"
                                    value={password.new}
                                    onChange={(e) => setPassword({ ...password, new: e.target.value })}
                                />
                            </div>
                        </div>
                    </section>

                    <button className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
                        <LogOut className="w-4 h-4" />
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
