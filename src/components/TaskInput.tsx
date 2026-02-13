import { useState } from 'react';
import { Plus, Calendar, Flag, Tag } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';
import { type Priority, type Category } from '../types';

const TaskInput = () => {
    const { addTask } = useTaskContext();
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
    const [dueTime, setDueTime] = useState('');
    const [priority, setPriority] = useState<Priority>('Medium');
    const [category, setCategory] = useState<Category>('Work');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        let finalDate = new Date(dueDate);
        if (dueTime) {
            const [hours, minutes] = dueTime.split(':').map(Number);
            finalDate.setHours(hours, minutes);
        } else {
            // Default to end of day if no time ? or just keep date only (00:00)
            // Let's keep it simple, if no time, it's just date (00:00 local)
        }

        addTask({
            title,
            dueDate: finalDate.toISOString(), // formatting handles both
            priority,
            category,
        });

        setTitle('');
        setDueTime('');
    };

    return (
        <div className="card p-1">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex items-center gap-3 px-3 pt-2">
                    <div className="w-5 h-5 rounded flex items-center justify-center border border-[var(--border-subtle)] text-[var(--text-secondary)]">
                        <Plus className="w-3.5 h-3.5" />
                    </div>

                    <input
                        type="text"
                        placeholder="Add a new task..."
                        className="flex-1 bg-transparent border-none outline-none text-[var(--text-primary)] placeholder-[var(--text-secondary)] text-sm py-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="flex items-center justify-between border-t border-[var(--border-subtle)] px-2 py-1.5 bg-[var(--bg-panel)] rounded-b-md">
                    <div className="flex items-center gap-2">
                        <div className="relative group flex items-center gap-2">
                            <div className="relative">
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full"
                                />
                                <div className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] transition-colors cursor-pointer">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span className="text-xs font-medium">{new Date(dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                </div>
                            </div>

                            {/* Time Input */}
                            <input
                                type="time"
                                value={dueTime}
                                onChange={(e) => setDueTime(e.target.value)}
                                className="bg-transparent text-[var(--text-secondary)] text-xs border border-[var(--border-subtle)] rounded px-1 py-0.5 focus:border-[var(--accent-primary)] outline-none"
                            />
                        </div>

                        <div className="relative">
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value as Priority)}
                                className="absolute inset-0 opacity-0 cursor-pointer w-full"
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] transition-colors cursor-pointer">
                                <Flag className="w-3.5 h-3.5" />
                                <span className="text-xs font-medium">{priority}</span>
                            </div>
                        </div>

                        <div className="relative">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value as Category)}
                                className="absolute inset-0 opacity-0 cursor-pointer w-full"
                            >
                                <option value="Work">Work</option>
                                <option value="Personal">Personal</option>
                                <option value="Project">Project</option>
                                <option value="Learning">Learning</option>
                                <option value="Health">Health</option>
                            </select>
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] transition-colors cursor-pointer">
                                <Tag className="w-3.5 h-3.5" />
                                <span className="text-xs font-medium">{category}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!title.trim()}
                        className="px-3 py-1 rounded bg-[var(--accent-primary)] text-white text-xs font-medium hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Add Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskInput;
