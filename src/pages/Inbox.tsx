import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskList from '../components/TaskList';
import { Inbox as InboxIcon, Plus } from 'lucide-react';
import { type Priority, type Category } from '../types';

const Inbox = () => {
    const { tasks, addTask } = useTaskContext();
    const [title, setTitle] = useState('');

    // Inbox tasks are those that are NOT completed and (optionally) don't have a due date set for *today* 
    // OR just all pending tasks that aren't focused today.
    // Based on user request "pending or upcoming tasks... back and forth between upcoming and today"
    // Let's treat Inbox as "Backlog" -> No Date OR Future Date.

    // For this implementation, I'll filter for tasks that are NOT due today.
    // But to make it a true "Inbox", we should probably allow adding tasks with specific dates too.

    const todayStr = new Date().toISOString().split('T')[0];

    // Filter: Pending tasks that are NOT due today (so Future or Past ignored? No, Inbox usually means everything not done today).
    // Let's show ALL pending tasks here, sorted by date.
    const inboxTasks = tasks.filter(t => !t.completed && !t.dueDate.startsWith(todayStr))
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

    const handleQuickAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        // Add for "tomorrow" by default so it goes to Inbox, not Today
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        addTask({
            title,
            dueDate: tomorrow.toISOString(),
            priority: 'Medium' as Priority,
            category: 'Work' as Category
        });
        setTitle('');
    };

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between pb-6 border-b border-[var(--border-subtle)]">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Inbox</h1>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Capture everything. Sort it later.</p>
                </div>
                <div className="w-10 h-10 rounded bg-[var(--bg-panel)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-tertiary)]">
                    <InboxIcon className="w-5 h-5" />
                </div>
            </header>

            {/* Quick Capture */}
            <div className="card p-2">
                <form onSubmit={handleQuickAdd} className="flex items-center gap-3 px-3">
                    <Plus className="w-5 h-5 text-[var(--text-secondary)]" />
                    <input
                        type="text"
                        placeholder="Quick capture a task for later..."
                        className="flex-1 bg-transparent border-none outline-none text-[var(--text-primary)] placeholder-[var(--text-secondary)] text-sm py-3"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={!title.trim()}
                        className="text-xs font-medium text-[var(--accent-primary)] disabled:opacity-50 hover:text-[var(--accent-hover)]"
                    >
                        Enter
                    </button>
                </form>
            </div>

            <div className="card p-6">
                <TaskList
                    tasks={inboxTasks}
                    title={`Pending / Upcoming (${inboxTasks.length})`}
                    emptyMessage="Your inbox is empty. You're all caught up!"
                />
            </div>
        </div>
    );
};

export default Inbox;
