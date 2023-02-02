import { Link, useNavigate } from "react-router-dom";
import { useTypedMutation } from "@my-sst-app/graphql/urql";
import Button from "./Button";
import * as styles from "./Navbar.css";

interface JobForm {
  nom: string;
}

export default function Navbar() {
  const navigate = useNavigate();
  const [result, createJob] = useTypedMutation((opts: JobForm) => ({
    createJob: [
      opts,
      {
        id: true,
      },
    ],
  }));

  return (
    <div className={styles.navbar}>
      <div className={styles.header}>
        <Link to="/" className={styles.title}>
          <span className={styles.logo}>&#128279;</span> Jobs
        </Link>
      </div>
      <form
        className={styles.form}
        onSubmit={async (e) => {
          e.preventDefault();

          const fd = new FormData(e.currentTarget);
          const nom = fd.get("nom")!.toString();

          if (nom.length > 0) {
            e.currentTarget.reset();
            const result = await createJob({
              nom,
            });
            navigate(`/job/${result.data?.createJob.id}`);
          }
        }}
      >
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          className={styles.field}
        />
        
        <Button
          type="submit"
          loading={result.fetching}
          className={styles.button}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
