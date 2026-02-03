import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useAppliances } from "../hooks/useAppliances";

export type Appliance = {
  id: string;
  name: string;
  phoneNumber: string;
  job: string;
  description: string;
};

export const AppliancesList = () => {
  const {
    data: appliances = [],
    error,
    isLoading,
  } = useAppliances()

  return (
    <div className="flex flex-col">
      {appliances.map((appliance) => (
        <Link to={`/details/${appliance.id}`}>
          {/* Syntax with search params instead of path params:  <Link to={`/details?id=${appliance.id}`}> */}
          <div key={appliance.id} className="border p-4 mb-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">{appliance.name}</h2>
            <p className="mb-1">
              <strong>Job:</strong> {appliance.job}
            </p>
            <p className="mb-1">
              <strong>Phone Number:</strong> {appliance.phoneNumber}
            </p>
            <button
              className="btn btn-error"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Supprimer
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};
