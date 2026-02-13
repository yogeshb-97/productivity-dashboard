import { useTaskContext } from '../context/TaskContext';
import TaskList from '../components/TaskList';
import TaskInput from '../components/TaskInput';
import HabitTracker from '../components/HabitTracker';
import QuoteWidget from '../components/QuoteWidget';
import { useMemo } from 'react';

const Dashboard = () => {
    const { tasks } = useTaskContext();

    const todayStr = new Date().toISOString().split('T')[0];

    const todayTasks = useMemo(() => {
        return tasks.filter(task => task.dueDate.startsWith(todayStr) && !task.completed);
    }, [tasks, todayStr]);

    const pendingTasks = useMemo(() => {
        return tasks.filter(task =>
            !task.completed &&
            !task.dueDate.startsWith(todayStr)
        ).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    }, [tasks, todayStr]);


    const completedTasks = useMemo(() => {
        return tasks.filter(task => task.completed && task.dueDate.startsWith(todayStr));
    }, [tasks, todayStr]);

    return (
        <div className="space-y-8">
            {/* Header */}
            <header className="flex items-center justify-between pb-6 border-b border-[var(--border-subtle)]">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Dashboard</h1>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </header>

            <QuoteWidget />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content (Tasks) */}
                <div className="lg:col-span-8 space-y-8">
                    <section className="space-y-4">
                        <TaskInput />

                        <div className="card p-4">
                            <TaskList
                                tasks={todayTasks}
                                title="Today's Focus"
                                emptyMessage="No tasks for today. Add one above!"
                            />
                        </div>

                        {completedTasks.length > 0 && (
                            <div className="card p-4 opacity-75">
                                <TaskList
                                    tasks={completedTasks}
                                    title="Completed Today"
                                    emptyMessage=""
                                />
                            </div>
                        )}

                        <div className="card p-4">
                            <TaskList
                                tasks={pendingTasks}
                                title="Upcoming Pipeline"
                                emptyMessage="No upcoming tasks."
                            />
                        </div>
                    </section>
                </div>

                {/* Side Panel (Habits & Projects) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="card p-4">
                        <HabitTracker />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
