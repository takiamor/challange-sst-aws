import { Job } from "@my-sst-app/core/job";
import { builder } from "../builder";
import AWS from "aws-sdk";
import sharp from "sharp";
import stream from "stream";

const width = 100;
const prefix = `${width}w`;

const S3 = new AWS.S3();

// Read stream for downloading from S3
function readStreamFromS3({ Bucket, Key }) {
  return S3.getObject({ Bucket, Key }).createReadStream();
}

// Write stream for uploading to S3
function writeStreamToS3({ Bucket, Key }) {
  const pass = new stream.PassThrough();

  return {
    writeStream: pass,
    upload: S3.upload({
      Key,
      Bucket,
      Body: pass,
    }).promise(),
  };
}

// Sharp resize stream
function streamToSharp(width) {
  return sharp().resize(width);
}

import { S3Handler } from "aws-lambda";

export const main: S3Handler = async (event) => {
  const s3Record = event.Records[0].s3;

  // Grab the filename and bucket name
  const Key = s3Record.object.key;
  const Bucket = s3Record.bucket.name;

  // Check if the file has already been resized
  if (Key.startsWith(prefix)) {
    return;
  }

  // Create the new filename with the dimensions
  const newKey = `${prefix}-${Key}`;

  // Stream to read the file from the bucket
  const readStream = readStreamFromS3({ Key, Bucket });
  // Stream to resize the image
  const resizeStream = streamToSharp(width);
  // Stream to upload to the bucket
  const { writeStream, upload } = writeStreamToS3({
    Bucket,
    Key: newKey,
  });

  // Trigger the streams
  readStream.pipe(resizeStream).pipe(writeStream);

  // Wait for the file to upload
  await upload;
};

const JobType = builder
  .objectRef<Job.JobEntityType>("Job")
  .implement({
    fields: (t) => ({
      jobID: t.exposeID("jobID"),
      nom: t.exposeString("nom"),
    }),
  });

builder.queryFields((t) => ({
  job: t.field({
    type: JobType,
    args: {
      jobID: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => {
      const result = await Job.get(args.jobID);

      if (!result) {
        throw new Error("Job not found");
      }

      return result;
    },
  }),
  jobs: t.field({
    type: [JobType],
    resolve: () => job.list(),
  }),
}));

builder.mutationFields((t) => ({
  createJob: t.field({
    type: JobType,
    args: {
      nom: t.arg.string({ required: true }),
      
    },
    resolve: (_, args) => Job.create(args.nom),
  }),
}));
