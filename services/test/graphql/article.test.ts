import { Api } from "@serverless-stack/node/api";
import { expect, it } from "vitest";
import { createClient } from "@my-sst-app/graphql/genql";
import { Job } from "@my-sst-app/core/job";

it("create an job", async () => {
  const client = createClient({
    url: Api.api.url + "/graphql",
  });

  const job = await client.mutation({
    createJob: [
      { nom: "Hello world" },
      {
        id: true,
      },
    ],
  });
  const list = await Job.list();
  expect(
    list.find((a) => a.jobID === job.createJob.id)
  ).not.toBeNull();
});
