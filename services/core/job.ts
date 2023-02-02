import { ulid } from "ulid";
import { Entity, EntityItem } from "electrodb";
import { Dynamo } from "./dynamo";

export * as Job from "./job";

export const JobEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Job",
      service: "scratch",
    },
    attributes: {
      jobID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      nom: {
        type: "string",
        required: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          composite: [],
        },
        sk: {
          field: "sk",
          composite: ["jobID"],
        },
      },
    },
  },
  Dynamo.Configuration
);

export type JobEntityType = EntityItem<typeof JobEntity>;

export async function create(nom: string) {
  const result = await JobEntity.create({
    jobID: ulid(),
    nom,
  }).go();

  return result.data;
}

export async function get(jobID: string) {
  const result = await JobEntity.get({ jobID }).go();

  return result.data;
}

export async function list() {
  const result = await JobEntity.query.primary({}).go();

  return result.data;
}
