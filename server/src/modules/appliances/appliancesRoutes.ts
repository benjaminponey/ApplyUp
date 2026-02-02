import { Router } from "express";
import Joi from "joi";
import { createValidator } from "express-joi-validation";
import { validator } from "../..";

export const appliancesRoutes = Router();

type Appliance = {
  job?: string;
  title: string;
  date: Date;
};

const applianceSchema = Joi.object<Appliance>({
  job: Joi.string().optional(),
  title: Joi.string().required(),
  date: Joi.date().less("now").required(),
});

appliancesRoutes.get("/", (_, response) => {
  response.json({ message: "Appliances Home" });
});

appliancesRoutes.post(
  "/",
  validator.body(applianceSchema),
  (request, response) => {
    const appliance = request.body as Appliance;
    response.json({ message: appliance.job });
  },
);
