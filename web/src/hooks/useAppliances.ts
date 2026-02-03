import { Appliance } from "../components/AppliancesList";
import { useFetch } from "./useFetch";

export const useAppliances = () => {
    return useFetch<Appliance[]>("appliances");
}