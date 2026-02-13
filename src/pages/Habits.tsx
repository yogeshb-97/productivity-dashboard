import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Flame, Check, Plus, Trash2, Activity } from 'lucide-react';


const Habits = () => {
    const { habits, addHabit, toggleHabit, deleteHabit } = useTaskContext();
    const [newHabit, setNewHabit] = useState('');
    const today = new Date().toISOString().split('T')[0];

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newHabit.trim()) return;
        addHabit(newHabit, 'Personal');
        setNewHabit('');
    };

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between pb-6 border-b border-[var(--border-subtle)]">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Habit Tracker</h1>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Consistency is key. Build your streak.</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-8 space-y-4">
                    <form onSubmit={handleAdd} className="flex gap-2">
                        <input
                            type="text"
                            className="input-base flex-1"
                            placeholder="Add a new habit..."
                            value={newHabit}
                            onChange={(e) => setNewHabit(e.target.value)}
                        />
                        <button type="submit" className="btn-primary flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Add
                        </button>
                    </form>

                    <div className="space-y-2">
                        {habits.length === 0 ? (
                            <div className="py-12 text-center border border-dashed border-[var(--border-subtle)] rounded-lg">
                                <Activity className="w-8 h-8 mx-auto text-[var(--text-tertiary)] mb-2" />
                                <p className="text-[var(--text-tertiary)]">No habits tracked yet.</p>
                            </div>
                        ) : (
                            habits.map(habit => {
                                const isCompleted = habit.completedDates.includes(today);
                                return (
                                    <div key={habit.id} className="card p-4 flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => toggleHabit(habit.id, today)}
                                                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${isCompleted
                                                    ? 'bg-orange-500 border-orange-500 text-white'
                                                    : 'border-[var(--border-subtle)] hover:border-orange-500 text-[var(--text-tertiary)] hover:text-orange-500'
                                                    }`}
                                            >
                                                <Check className="w-4 h-4" />
                                            </button>

                                            <div>
                                                <h3 className={`font-medium ${isCompleted ? 'text-[var(--text-tertiary)]' : 'text-[var(--text-primary)]'}`}>
                                                    {habit.title}
                                                </h3>
                                                <span className="text-xs text-[var(--text-secondary)]">{habit.category}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-1.5 text-orange-500">
                                                <Flame className={`w-4 h-4 ${habit.streak > 0 ? 'fill-orange-500' : ''}`} />
                                                <span className="font-bold">{habit.streak}</span>
                                                <span className="text-xs text-[var(--text-tertiary)] font-normal uppercase">Streak</span>
                                            </div>
                                            <button
                                                onClick={() => deleteHabit(habit.id)}
                                                className="p-2 text-[var(--text-tertiary)] hover:text-red-400 hover:bg-red-400/10 rounded opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                <div className="md:col-span-4">
                    <div className="card p-6 bg-gradient-to-br from-[var(--bg-panel)] to-[var(--bg-hover)] border-orange-500/20">
                        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Daily Quote</h3>
                        <blockquote className="text-[var(--text-secondary)] italic">
                            "Motivation is what gets you started. Habit is what keeps you going."
                        </blockquote>
                        <p className="text-right text-xs text-[var(--text-tertiary)] mt-2">— Jim Ryun</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Habits;
