import fastify from "fastify";
import { createGoal } from "../functions/create-goal";
import z from "zod";

const app = fastify();

app.post("/goals", async (request) => {
  const createGoalsSchema = z.object({
    title: z.string(),
    desiredWeeklyFrequency: z.number().int().min(1).max(7),
  });

  const body = createGoalsSchema.parse(request.body);

  await createGoal({
    title: body.title,
    desiredWeeklyFrequency: body.desiredWeeklyFrequency,
  });
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server is running on port 3333");
  });
