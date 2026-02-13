import { Flame, Plus, Trash2, Check } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';
import { useState } from 'react';

const HabitTracker = () => {
    const { habits, addHabit, toggleHabit, deleteHabit } = useTaskContext();
    const [newHabitTitle, setNewHabitTitle] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [expandedHabitId, setExpandedHabitId] = useState<string | null>(null);

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // Helper to get dates
    const getDaysArray = (days: number) => {
        return Array.from({ length: days }, (_, i) => {
            const d = new Date(today);
            d.setDate(today.getDate() - (days - 1 - i));
            return d.toISOString().split('T')[0];
        });
    };

    const last14Days = getDaysArray(14);
    const last30Days = getDaysArray(30);

    const handleAddHabit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newHabitTitle.trim()) return;
        addHabit(newHabitTitle, 'Personal');
        setNewHabitTitle('');
        setIsAdding(false);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                    HABITS
                </h3>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="p-1 rounded hover:bg-[var(--bg-hover)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleAddHabit}>
                    <input
                        type="text"
                        placeholder="New habit..."
                        value={newHabitTitle}
                        onChange={(e) => setNewHabitTitle(e.target.value)}
                        className="input-base w-full text-sm"
                        autoFocus
                        onBlur={() => !newHabitTitle && setIsAdding(false)}
                    />
                </form>
            )}

            <div className="space-y-3">
                {habits.map((habit) => {
                    const isExpanded = expandedHabitId === habit.id;
                    const displayDays = isExpanded ? last30Days : last14Days;

                    return (
                        <div key={habit.id} className="group flex flex-col py-1">
                            <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0 mr-4 cursor-pointer" onClick={() => setExpandedHabitId(isExpanded ? null : habit.id)}>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-sm font-medium text-[var(--text-primary)] truncate">{habit.title}</span>

                                        <div className="flex items-center gap-1 text-xs text-orange-500 font-bold opacity-100 transition-opacity">
                                            <Flame className="w-3 h-3 fill-orange-500" />
                                            {habit.streak}
                                            {isExpanded && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); deleteHabit(habit.id); }}
                                                    className="ml-2 p-1 text-[var(--text-tertiary)] hover:text-red-400 transition-colors"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Dot Grid */}
                                    <div className={`flex items-center gap-1 flex-wrap ${isExpanded ? 'mb-2' : ''}`}>
                                        {displayDays.map((date) => {
                                            const isCompleted = habit.completedDates.includes(date);
                                            const isToday = date === todayStr;

                                            return (
                                                <button
                                                    key={date}
                                                    onClick={(e) => {
                                                        if (isToday) {
                                                            e.stopPropagation();
                                                            toggleHabit(habit.id, date);
                                                        }
                                                    }}
                                                    disabled={!isToday}
                                                    title={date}
                                                    className={`w-2 h-2 rounded-full transition-all ${isCompleted
                                                            ? 'bg-orange-500'
                                                            : isToday
                                                                ? 'bg-[var(--bg-hover)] border border-[var(--text-tertiary)] hover:border-orange-500 cursor-pointer'
                                                                : 'bg-[var(--bg-hover)]'
                                                        }`}
                                                />
                                            );
                                        })}
                                    </div>
                                    {isExpanded && <p className="text-[10px] text-[var(--text-tertiary)] mt-1">Showing last 30 days</p>}
                                </div>

                                {/* Today's Toggle (Big Button) - Only show in collapsed mode or if desired */}
                                {!isExpanded && (
                                    <button
                                        onClick={() => toggleHabit(habit.id, todayStr)}
                                        className={`w-8 h-8 rounded shrink-0 flex items-center justify-center border transition-all ${habit.completedDates.includes(todayStr)
                                                ? 'bg-orange-500 border-orange-500 text-white'
                                                : 'border-[var(--text-tertiary)] hover:border-orange-500 hover:text-orange-500'
                                            }`}
                                    >
                                        <Check className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HabitTracker;
