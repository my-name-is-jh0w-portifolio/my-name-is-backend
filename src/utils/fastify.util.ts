import { fastify } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

const app = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

export { app };
