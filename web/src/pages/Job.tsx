import { useParams } from "react-router-dom";
import { useTypedQuery } from "@my-sst-app/graphql/urql";
import Empty from "../components/Empty";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import * as styles from "./Article.css";

export default function Job() {
  const { id = "" } = useParams();

  const [job] = useTypedQuery({
    query: {
      job: [
        { jobID: id },
        {
          id: true,
          nom: true,
        },
      ],
    },
  });

  return (
    <div>
      <Navbar />
      {job.fetching ? (
        <Loading />
      ) : job.data?.job ? (
        <div className={styles.article}>
          <h1>{job.data.job.nom}</h1>
        </div>
      ) : (
        <Empty>Not Found</Empty>
      )}
    </div>
  );
}
