import { useState } from 'react';
import { Check, Trash2, Calendar, Pencil, ArrowUp, ArrowDown, X, Save } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';
import { type Task, type Priority, type Category } from '../types';

interface TaskListProps {
    tasks: Task[];
    title?: string;
    emptyMessage?: string;
}

const PriorityIndicator = ({ priority }: { priority: Priority }) => {
    const colors = {
        High: 'bg-red-500',
        Medium: 'bg-amber-500',
        Low: 'bg-emerald-500',
    };

    return (
        <div className="flex items-center gap-1.5" title={`${priority} Priority`}>
            <div className={`w-1.5 h-1.5 rounded-full ${colors[priority]}`} />
            <span className="text-[10px] text-[var(--text-secondary)] font-medium uppercase tracking-wider">{priority}</span>
        </div>
    );
};

const TaskList = ({ tasks, title, emptyMessage = 'No tasks found.' }: TaskListProps) => {
    const { toggleTask, deleteTask, updateTask, moveTask } = useTaskContext();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<{ title: string; priority: Priority; category: Category; dueDate: string; dueTime: string }>({
        title: '', priority: 'Medium', category: 'Work', dueDate: '', dueTime: ''
    });

    const startEditing = (task: Task) => {
        const dateObj = new Date(task.dueDate);
        setEditingId(task.id);
        const isoDate = dateObj.toISOString().split('T')[0];
        // simple time extraction HH:mm
        const hours = dateObj.getHours().toString().padStart(2, '0');
        const minutes = dateObj.getMinutes().toString().padStart(2, '0');

        setEditForm({
            title: task.title,
            priority: task.priority,
            category: task.category,
            dueDate: isoDate,
            dueTime: `${hours}:${minutes}`
        });
    };

    const saveEdit = (id: string) => {
        let finalDate = new Date(editForm.dueDate);
        if (editForm.dueTime) {
            const [hours, minutes] = editForm.dueTime.split(':').map(Number);
            finalDate.setHours(hours, minutes);
        }

        updateTask(id, {
            title: editForm.title,
            priority: editForm.priority,
            category: editForm.category,
            dueDate: finalDate.toISOString()
        });
        setEditingId(null);
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    if (tasks.length === 0) {
        return (
            <div className="py-8 text-center border border-dashed border-[var(--border-subtle)] rounded-lg">
                <p className="text-[var(--text-tertiary)] text-sm">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {title && (
                <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                        {title}
                    </h3>
                    <span className="text-xs text-[var(--text-tertiary)] bg-[var(--bg-panel)] px-1.5 py-0.5 rounded border border-[var(--border-subtle)]">
                        {tasks.length}
                    </span>
                </div>
            )}

            <div className="space-y-1">
                {tasks.map((task) => {
                    const isEditing = editingId === task.id;

                    if (isEditing) {
                        return (
                            <div key={task.id} className="p-2 rounded-md bg-[var(--bg-hover)] border border-[var(--border-active)] space-y-2">
                                <input
                                    type="text"
                                    value={editForm.title}
                                    onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                    className="input-base w-full text-sm font-medium"
                                />
                                <div className="flex flex-wrap items-center gap-2">
                                    <input
                                        type="date"
                                        value={editForm.dueDate}
                                        onChange={e => setEditForm({ ...editForm, dueDate: e.target.value })}
                                        className="input-base text-xs py-1"
                                    />
                                    <input
                                        type="time"
                                        value={editForm.dueTime}
                                        onChange={e => setEditForm({ ...editForm, dueTime: e.target.value })}
                                        className="input-base text-xs py-1"
                                    />
                                    <select
                                        value={editForm.priority}
                                        onChange={e => setEditForm({ ...editForm, priority: e.target.value as Priority })}
                                        className="input-base text-xs py-1"
                                    >
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                    <select
                                        value={editForm.category}
                                        onChange={e => setEditForm({ ...editForm, category: e.target.value as Category })}
                                        className="input-base text-xs py-1"
                                    >
                                        <option value="Work">Work</option>
                                        <option value="Personal">Personal</option>
                                        <option value="Project">Project</option>
                                    </select>
                                </div>
                                <div className="flex justify-end gap-2 pt-1">
                                    <button onClick={cancelEdit} className="p-1 text-[var(--text-tertiary)] hover:text-[var(--text-primary)]">
                                        <X className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => saveEdit(task.id)} className="p-1 text-green-500 hover:text-green-400">
                                        <Save className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div
                            key={task.id}
                            className="group flex items-center justify-between p-2 rounded-md hover:bg-[var(--bg-hover)] transition-colors border border-transparent hover:border-[var(--border-subtle)]"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <button
                                    onClick={() => toggleTask(task.id)}
                                    className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${task.completed
                                        ? 'bg-[var(--accent-primary)] border-[var(--accent-primary)]'
                                        : 'border-[var(--text-tertiary)] hover:border-[var(--text-secondary)]'
                                        }`}
                                >
                                    {task.completed && <Check className="w-3 h-3 text-white" />}
                                </button>

                                <div className="min-w-0">
                                    <p className={`text-sm font-medium truncate ${task.completed ? 'text-[var(--text-tertiary)] line-through' : 'text-[var(--text-primary)]'
                                        }`}>
                                        {task.title}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[10px] text-[var(--text-secondary)] font-mono tracking-wide shadow-sm shadow-cyan-500/5">
                                            <Calendar className="w-3 h-3 text-[var(--accent-primary)]" />
                                            <span>
                                                {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </span>
                                            <span className="w-px h-3 bg-[var(--border-subtle)] mx-0.5" />
                                            <span className="text-[var(--text-primary)]">
                                                {new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <PriorityIndicator priority={task.priority} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                {/* Reorder Controls */}
                                <div className="flex flex-col">
                                    <button onClick={() => moveTask(task.id, 'up')} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]">
                                        <ArrowUp className="w-3 h-3" />
                                    </button>
                                    <button onClick={() => moveTask(task.id, 'down')} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]">
                                        <ArrowDown className="w-3 h-3" />
                                    </button>
                                </div>

                                <span className="h-4 w-px bg-[var(--border-subtle)] mx-1" />

                                <button
                                    onClick={() => startEditing(task)}
                                    className="p-1.5 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] rounded transition-colors"
                                >
                                    <Pencil className="w-3.5 h-3.5" />
                                </button>

                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="p-1.5 text-[var(--text-tertiary)] hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TaskList;
