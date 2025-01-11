import { type FastifyTypedInstance, paginationSchema } from "@/types";
import { prisma } from "@/utils";
import z from "zod";

export async function profileRoutes(app: FastifyTypedInstance) {
	app.get(
		"/profiles",
		{
			schema: {
				tags: ["profiles"],
				description: "List profiles",
				querystring: paginationSchema,
				response: {
					200: z.object({
						data: z.array(
							z.object({
								id: z.string(),
								profileName: z.string(),
							}),
						),
						total: z.number(),
						page: z.number(),
						limit: z.number(),
					}),
					404: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { page, limit } = request.query;
			const skip = (page - 1) * limit;

			const [data, total] = await Promise.all([
				prisma.profile.findMany({
					skip,
					take: limit,
					orderBy: { profileName: "desc" },
				}),
				prisma.profile.count(),
			]);
			if (data.length === 0) {
				return reply.status(404).send({ message: "No Profiles Found" });
			}
			return reply.status(200).send({
				data,
				total,
				page,
				limit,
			});
		},
	);
}
