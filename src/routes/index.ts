import { profileRoutes } from "@/model";
import { app } from "@/utils";

export const Routes = () => {
	app.register(profileRoutes, { prefix: "/api" });
};
