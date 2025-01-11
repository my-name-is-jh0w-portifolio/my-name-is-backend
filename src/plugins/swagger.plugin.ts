import type { FastifyTypedInstance } from "@/types";
import { PackageJson } from "@/utils";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

export async function registerOpenApi(app: FastifyTypedInstance) {
	app.register(fastifySwagger, {
		openapi: {
			info: {
				title: `API ${PackageJson().name}`,
				version: `${PackageJson().version}`,
			},
			tags: [{ name: "profiles", description: "Profile operations" }],
		},
		transform: jsonSchemaTransform,
	});
	app.register(fastifySwaggerUi, {
		routePrefix: "/docs",
		uiConfig: {
			docExpansion: "full",
			deepLinking: false,
		},
	});
}
