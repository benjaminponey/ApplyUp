import { PropsWithChildren, useState } from "react";
import { useNavigate } from "react-router-dom";

type JobId = 'front' | 'back';

type Job = {
  id: JobId;
  title: string;
};

const JOBS: Job[] = [
  { id: "front", title: "Développeur Frontend" },
  { id: "back", title: "Développeur Backend" },
];

export const ApplyForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [jobId, setJobId] = useState<JobId>("front");

  const navigate = useNavigate();

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/list");
        }}
        className="flex flex-col gap-4"
      >
        <Row label="Nom">
          <input
            name="name"
            required
            type="text"
            placeholder="Votre nom"
            className="input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Row>
        {!name && <p className="text-red-500">Le nom est requis</p>}
        <input
          name="email"
          type="email"
          required
          placeholder="Votre email"
          className="input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <select
          defaultValue="front"
          className="select"
          value={jobId}
          onChange={(e) => setJobId(e.target.value as JobId)}
        >
          {JOBS.map((job) => (
            <option key={job.id} value={job.id}>
              {job.title}
            </option>
          ))}
        </select>
        <textarea className="textarea" placeholder="Description"></textarea>
        <button className="btn btn-success" type="submit">
          Envoyer
        </button>
      </form>
    </div>
  );
};

type RowProps = {
  label: string;
};

const Row = ({ label, children }: PropsWithChildren<RowProps>) => {
  return (
    <div className="flex flex-row gap-4">
      <span>{label}</span>
      {children}
    </div>
  );
};
