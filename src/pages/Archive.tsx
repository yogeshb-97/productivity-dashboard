import { useTaskContext } from '../context/TaskContext';
import TaskList from '../components/TaskList';
import { Archive as ArchiveIcon } from 'lucide-react';
import { useMemo } from 'react';

const Archive = () => {
    const { tasks } = useTaskContext();

    const archivedTasks = useMemo(() => {
        return tasks.filter(task => task.completed).sort((a, b) =>
            new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
        );
    }, [tasks]);

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between pb-6 border-b border-[var(--border-subtle)]">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Archive</h1>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">History of all your completed tasks.</p>
                </div>
                <div className="w-10 h-10 rounded bg-[var(--bg-panel)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-tertiary)]">
                    <ArchiveIcon className="w-5 h-5" />
                </div>
            </header>

            <div className="card p-6">
                <TaskList
                    tasks={archivedTasks}
                    title={`Completed Tasks (${archivedTasks.length})`}
                    emptyMessage="No archived tasks found."
                />
            </div>
        </div>
    );
};

export default Archive;
