import { useParams } from "react-router-dom";
import { useAppliances } from "../contexts/AppliancesContext";

export const ApplianceDetails = () => {
  const { id } = useParams();
  /*
  Example using useSearchParams instead of useParams
  const [params, setParams] = useSearchParams();
  const id = params.get("id")
  */
  const { appliances } = useAppliances();

  const appliance = appliances.find((a) => a.id === id);

  if (!appliance) {
    return <div>Appliance not found</div>;
  }

  return (
    <div className="p-4 border rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{appliance.name}</h1>
      <p className="mb-2">
        <strong>Job:</strong> {appliance.job}
      </p>
      <p className="mb-2">
        <strong>Phone Number:</strong> {appliance.phoneNumber}
      </p>
      <p className="mb-2">
        <strong>Description:</strong> {appliance.description}
      </p>
    </div>
  );
};
