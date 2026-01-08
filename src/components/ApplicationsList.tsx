import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './ApplicationsList.css';
import { ApplicationsContext, Application } from '../Contexts/ApplicationsContext';

const getStatusLabel = (status: Application['status']) => {
    switch (status) {
        case 'new': return 'Nouveau';
        case 'reviewed': return 'En revue';
        case 'interviewed': return 'Entretien';
        case 'rejected': return 'Refusé';
        default: return status;
    }
};

const getStatusClass = (status: Application['status']) => {
    return `status-badge status-${status}`;
};

export function ApplicationsList() {
    const { applications, removeApplication } = useContext(ApplicationsContext);
    const navigate = useNavigate();

    return (
        <div className="applications-list-container">
            <h2 className="applications-list-title">
                Candidatures Reçues
                <span className="badge-count">{applications.length}</span>
            </h2>

            {applications.length === 0 ? (
                <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginTop: '4rem' }}>
                    Aucune candidature pour le moment.
                </p>
            ) : (
                <div className="applications-grid">
                    {applications.map((app) => (
                        <div key={app.id} className="application-card">
                            <div className="card-header">
                                <h3 className="applicant-name">{app.name}</h3>
                                <span className={getStatusClass(app.status)}>
                                    {getStatusLabel(app.status)}
                                </span>
                            </div>

                            <div className="job-title">{app.jobTitle}</div>

                            <div className="card-body">
                                <div className="contact-info">
                                    <p><strong>Email:</strong> {app.email}</p>
                                    <p><strong>Tel:</strong> {app.phone}</p>
                                    <p><strong>Date:</strong> {app.date}</p>
                                </div>
                                {/* Message preview removed as requested */}
                            </div>

                            <div className="card-actions">
                                <button className="action-btn" onClick={() => navigate(`/application/${app.id}`)}>
                                    Voir
                                </button>
                                <button className="action-btn delete-btn" onClick={(e) => {
                                    e.stopPropagation();
                                    if (confirm('Supprimer cette candidature ?')) {
                                        removeApplication(app.id);
                                    }
                                }}>
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
