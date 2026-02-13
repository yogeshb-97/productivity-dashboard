import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Task, type Habit, type Project, type Category } from '../types';

interface TaskContextType {
    tasks: Task[];
    habits: Habit[];
    projects: Project[];
    addTask: (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    moveTask: (id: string, direction: 'up' | 'down') => void;
    addHabit: (title: string, category: Category) => void;
    toggleHabit: (id: string, date: string) => void;
    deleteHabit: (id: string) => void;
    addProject: (title: string, description: string, category: Category) => void;
    deleteProject: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};

interface TaskProviderProps {
    children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
    // Use lazy initialization to read from localStorage only once on mount
    const [tasks, setTasks] = useState<Task[]>(() => {
        try {
            const saved = localStorage.getItem('tasks');
            return saved ? JSON.parse(saved) : [
                {
                    id: '1',
                    title: 'Review System Design',
                    dueDate: new Date().toISOString(),
                    priority: 'High',
                    completed: false,
                    category: 'Work',
                    createdAt: new Date().toISOString()
                },
                {
                    id: '2',
                    title: 'Morning Workout',
                    dueDate: new Date().toISOString(),
                    priority: 'Medium',
                    completed: false,
                    category: 'Health',
                    createdAt: new Date().toISOString()
                }
            ];
        } catch (e) {
            console.error("Failed to parse tasks from localStorage", e);
            return [];
        }
    });

    const [habits, setHabits] = useState<Habit[]>(() => {
        try {
            const saved = localStorage.getItem('habits');
            return saved ? JSON.parse(saved) : [
                { id: 'h1', title: 'Drink 3L Water', streak: 5, completedDates: [], category: 'Health' },
                { id: 'h2', title: 'Read 30 mins', streak: 12, completedDates: [], category: 'Learning' }
            ];
        } catch (e) {
            console.error("Failed to parse habits from localStorage", e);
            return [];
        }
    });

    const [projects, setProjects] = useState<Project[]>(() => {
        try {
            const saved = localStorage.getItem('projects');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Failed to parse projects from localStorage", e);
            return [];
        }
    });

    // Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem('habits', JSON.stringify(habits));
    }, [habits]);

    useEffect(() => {
        localStorage.setItem('projects', JSON.stringify(projects));
    }, [projects]);

    const addTask = (newTaskData: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
        const newTask: Task = {
            ...newTaskData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            completed: false,
        };
        setTasks((prev) => [...prev, newTask]);
    };

    const toggleTask = (id: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const addHabit = (title: string, category: Category) => {
        const newHabit: Habit = {
            id: crypto.randomUUID(),
            title,
            streak: 0,
            completedDates: [],
            category
        };
        setHabits(prev => [...prev, newHabit]);
    };

    const toggleHabit = (id: string, date: string) => {
        setHabits(prev => prev.map(habit => {
            if (habit.id !== id) return habit;

            const isCompleted = habit.completedDates.includes(date);
            const newDates = isCompleted
                ? habit.completedDates.filter(d => d !== date)
                : [...habit.completedDates, date];

            // Simple streak logic
            let newStreak = habit.streak;
            if (!isCompleted) {
                newStreak += 1;
            } else {
                newStreak = Math.max(0, newStreak - 1);
            }

            return { ...habit, completedDates: newDates, streak: newStreak };
        }));
    };

    const deleteHabit = (id: string) => {
        setHabits(prev => prev.filter(h => h.id !== id));
    };

    const addProject = (title: string, description: string, category: Category) => {
        const newProject: Project = {
            id: crypto.randomUUID(),
            title,
            description,
            progress: 0,
            dueDate: new Date().toISOString(), // Default to today for now
            category
        };
        setProjects(prev => [...prev, newProject]);
    };

    const deleteProject = (id: string) => {
        setProjects(prev => prev.filter(p => p.id !== id));
    };

    const updateTask = (id: string, updates: Partial<Task>) => {
        setTasks((prev) => prev.map(task => task.id === id ? { ...task, ...updates } : task));
    };

    const moveTask = (id: string, direction: 'up' | 'down') => {
        setTasks((prev) => {
            const index = prev.findIndex(t => t.id === id);
            if (index === -1) return prev;

            const newTasks = [...prev];
            const targetIndex = direction === 'up' ? index - 1 : index + 1;

            if (targetIndex >= 0 && targetIndex < newTasks.length) {
                [newTasks[index], newTasks[targetIndex]] = [newTasks[targetIndex], newTasks[index]];
            }

            return newTasks;
        });
    };

    return (
        <TaskContext.Provider value={{
            tasks, habits, projects,
            addTask, toggleTask, deleteTask, updateTask, moveTask,
            addHabit, toggleHabit, deleteHabit,
            addProject, deleteProject
        }}>
            {children}
        </TaskContext.Provider>
    );
};
