import { fastifyCors } from "@fastify/cors";
import {
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { registerOpenApi } from "./plugins/swagger.plugin";
import { Routes } from "./routes";
import { app } from "./utils";

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(fastifyCors, { origin: "*" });

registerOpenApi(app);

Routes();

app.listen({ port: 3000 }).then(() => {
	console.log("Server is running on port 3000 🚀");
});
