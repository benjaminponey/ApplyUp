import { createContext, useState, useEffect, ReactNode } from "react";

export interface Application {
    id: number;
    jobTitle: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    date: string;
    status: 'new' | 'reviewed' | 'interviewed' | 'rejected';
}

export type ApplicationsContextType = {
    applications: Application[];
    addApplication: (application: Omit<Application, 'id' | 'date' | 'status'>) => void;
    removeApplication: (id: number) => void;
};

export const ApplicationsContext = createContext<ApplicationsContextType>({
    applications: [],
    addApplication: () => { },
    removeApplication: () => { },
});

export const ApplicationsProvider = ({ children }: { children: ReactNode }) => {
    // 1. Initialize state from localStorage (lazy initialization)
    const [applications, setApplications] = useState<Application[]>(() => {
        const saved = localStorage.getItem('applications');
        return saved ? JSON.parse(saved) : [];
    });

    // 2. Sync with localStorage whenever applications change
    useEffect(() => {
        localStorage.setItem('applications', JSON.stringify(applications));
    }, [applications]);

    const addApplication = (newApp: Omit<Application, 'id' | 'date' | 'status'>) => {
        const application: Application = {
            ...newApp,
            id: Date.now(), // Generate a unique ID using timestamp
            date: new Date().toLocaleDateString('fr-FR'),
            status: 'new'
        };
        setApplications(prev => [application, ...prev]);
    };

    const removeApplication = (id: number) => {
        setApplications(prev => prev.filter(app => app.id !== id));
    };

    return (
        <ApplicationsContext.Provider value={{ applications, addApplication, removeApplication }}>
            {children}
        </ApplicationsContext.Provider>
    );
};
