import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Folder, Plus, Trash2, Calendar, Layout } from 'lucide-react';
import { type Category } from '../types';

const Projects = () => {
    const { projects, addProject, deleteProject } = useTaskContext();
    const [isAdding, setIsAdding] = useState(false);
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        category: 'Work' as Category
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProject.title.trim()) return;
        addProject(newProject.title, newProject.description, newProject.category);
        setNewProject({ title: '', description: '', category: 'Work' });
        setIsAdding(false);
    };

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between pb-6 border-b border-[var(--border-subtle)]">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Projects</h1>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Manage your ongoing initiatives.</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    New Project
                </button>
            </header>

            {isAdding && (
                <div className="card p-4 animate-enter">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Project Title</label>
                            <input
                                type="text"
                                value={newProject.title}
                                onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                                className="input-base w-full"
                                placeholder="E.g. Q4 Marketing Plan"
                                autoFocus
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Description</label>
                            <input
                                type="text"
                                value={newProject.description}
                                onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                                className="input-base w-full"
                                placeholder="Brief summary of goals..."
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setIsAdding(false)}
                                className="px-3 py-1.5 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn-primary text-sm">Create Project</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.length === 0 ? (
                    <div className="col-span-full py-12 text-center border border-dashed border-[var(--border-subtle)] rounded-lg">
                        <Layout className="w-8 h-8 mx-auto text-[var(--text-tertiary)] mb-2" />
                        <p className="text-[var(--text-tertiary)]">No active projects.</p>
                    </div>
                ) : (
                    projects.map(project => (
                        <div key={project.id} className="card p-5 hover:border-[var(--border-active)] group relative">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-[var(--bg-main)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-primary)]">
                                        <Folder className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[var(--text-primary)]">{project.title}</h3>
                                        <span className="text-xs px-1.5 py-0.5 rounded border border-[var(--border-subtle)] text-[var(--text-secondary)] uppercase">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => deleteProject(project.id)}
                                    className="p-1.5 text-[var(--text-tertiary)] hover:text-red-400 hover:bg-red-400/10 rounded opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2 min-h-[40px]">
                                {project.description || "No description provided."}
                            </p>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-[var(--text-tertiary)]">
                                    <span>Progress</span>
                                    <span>{project.progress}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-[var(--bg-main)] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[var(--accent-primary)] rounded-full transition-all duration-500"
                                        style={{ width: `${project.progress}%` }}
                                    />
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)] pt-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>Due {new Date(project.dueDate || '').toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Projects;
