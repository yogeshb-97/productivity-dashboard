export type Priority = 'High' | 'Medium' | 'Low';
export type Category = 'Work' | 'Personal' | 'Project' | 'Learning' | 'Health';

export interface Task {
    id: string;
    title: string;
    description?: string;
    dueDate: string; // ISO Date string
    priority: Priority;
    completed: boolean;
    category: Category;
    createdAt: string;
}

export interface Habit {
    id: string;
    title: string;
    streak: number;
    completedDates: string[]; // Array of ISO Date strings (YYYY-MM-DD)
    category: Category;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    progress: number; // 0-100
    dueDate?: string;
    category: Category;
}
