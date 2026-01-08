import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './ApplicationForm.css';
import { ApplicationsContext } from '../Contexts/ApplicationsContext';

const JOB_OPENINGS = [
    { id: 'frontend', label: 'Développeur Frontend' },
    { id: 'backend', label: 'Développeur Backend' },
    { id: 'fullstack', label: 'Développeur Fullstack' },
    { id: 'ui-ux', label: 'UI/UX Designer' },
    { id: 'pm', label: 'Product Manager' },
    { id: 'data', label: 'Data Scientist' },
];

interface FormData {
    job: string;
    name: string;
    email: string;
    phone: string;
    message: string;
}

const INITIAL_STATE: FormData = {
    job: '',
    name: '',
    email: '',
    phone: '',
    message: ''
};

export function ApplicationForm() {
    const [formData, setFormData] = useState<FormData>(INITIAL_STATE);
    const { addApplication } = useContext(ApplicationsContext);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.job || !formData.name || !formData.email) {
            alert("Veuillez remplir au moins le poste, le nom et l'email.");
            return;
        }

        const jobLabel = JOB_OPENINGS.find(j => j.id === formData.job)?.label || formData.job;

        addApplication({
            jobTitle: jobLabel,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message
        });

        alert("Candidature envoyée avec succès !");
        setFormData(INITIAL_STATE);
        navigate('/list');
    };

    return (
        <form className="application-form-container" onSubmit={handleSubmit}>
            <h2 className="application-form-title">Candidature Spontanée</h2>

            <div className="form-group">
                <label htmlFor="job" className="form-label">Poste visé</label>
                <select
                    id="job"
                    name="job"
                    value={formData.job}
                    onChange={handleChange}
                    className="form-select"
                    required
                >
                    <option value="" disabled>Sélectionnez un poste...</option>
                    {JOB_OPENINGS.map(job => (
                        <option key={job.id} value={job.id}>{job.label}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="name" className="form-label">Nom complet</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jean Dupont"
                    className="form-input"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jean.dupont@example.com"
                    className="form-input"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="phone" className="form-label">Téléphone</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="06 12 34 56 78"
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Pourquoi voulez-vous nous rejoindre ?"
                    className="form-textarea"
                />
            </div>

            <button type="submit" className="submit-btn">
                Valider ma candidature
            </button>
        </form>
    );
}
