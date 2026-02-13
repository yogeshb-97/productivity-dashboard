import { Folder, MoreHorizontal } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';

const ProjectList = () => {
    const { projects } = useTaskContext();

    const displayProjects = projects.length > 0 ? projects : [
        { id: 'p1', title: 'Website Redesign', description: 'Revamp the corporate website.', progress: 75, dueDate: '2023-12-31', category: 'Work' },
        { id: 'p2', title: 'Mobile App', description: 'Flutter based items.', progress: 30, dueDate: '2024-03-01', category: 'Project' },
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                    Active Projects
                </h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {displayProjects.map((project) => (
                    <div
                        key={project.id}
                        className="card p-3 flex flex-col gap-3 group cursor-pointer hover:border-[var(--border-active)]"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-[var(--bg-main)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)]">
                                    <Folder className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-[var(--text-primary)]">{project.title}</h4>
                                    <p className="text-xs text-[var(--text-tertiary)] line-clamp-1">{project.description}</p>
                                </div>
                            </div>
                            <MoreHorizontal className="w-4 h-4 text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <div>
                            <div className="flex justify-between text-[10px] text-[var(--text-tertiary)] mb-1">
                                <span>Progress</span>
                                <span>{project.progress}%</span>
                            </div>
                            <div className="w-full h-1 bg-[var(--bg-main)] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[var(--accent-primary)] rounded-full"
                                    style={{ width: `${project.progress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <button className="w-full py-2 rounded border border-dashed border-[var(--border-subtle)] text-xs font-medium text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:border-[var(--text-secondary)] transition-all">
                    + New Project
                </button>
            </div>
        </div>
    );
};

export default ProjectList;
