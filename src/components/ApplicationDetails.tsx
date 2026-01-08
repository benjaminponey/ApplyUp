import { useParams, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ApplicationsContext, Application } from '../Contexts/ApplicationsContext';
import './ApplicationDetails.css';

export function ApplicationDetails() {
    const { id } = useParams<{ id: string }>();
    const { applications } = useContext(ApplicationsContext);
    const [application, setApplication] = useState<Application | null>(null);

    useEffect(() => {
        if (id && applications.length > 0) {
            const found = applications.find(app => app.id === Number(id));
            setApplication(found || null);
        }
    }, [id, applications]);

    if (!application) {
        return (
            <div className="application-details-container not-found">
                <h2>Candidature introuvable</h2>
                <Link to="/list" className="back-link">Retour à la liste</Link>
            </div>
        );
    }

    return (
        <div className="application-details-container">
            <Link to="/list" className="back-link">← Retour</Link>

            <div className="details-header">
                <h1 className="details-title">{application.jobTitle}</h1>
                <span className={`status-badge-lg status-${application.status}`}>
                    {getStatusLabel(application.status)}
                </span>
            </div>

            <div className="details-section">
                <h3>Informations du candidat</h3>
                <div className="info-grid">
                    <div className="info-item">
                        <span className="label">Nom</span>
                        <span className="value">{application.name}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Email</span>
                        <span className="value">{application.email}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Téléphone</span>
                        <span className="value">{application.phone}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Date de candidature</span>
                        <span className="value">{application.date}</span>
                    </div>
                </div>
            </div>

            <div className="details-section">
                <h3>Message / Motivation</h3>
                <div className="message-box">
                    {application.message || "Aucun message fourni."}
                </div>
            </div>
        </div>
    );
}

const getStatusLabel = (status: Application['status']) => {
    switch (status) {
        case 'new': return 'Nouveau';
        case 'reviewed': return 'En revue';
        case 'interviewed': return 'Entretien';
        case 'rejected': return 'Refusé';
        default: return status;
    }
};
