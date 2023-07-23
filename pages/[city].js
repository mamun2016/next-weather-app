import styles from "./details.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

function Details({ details }) {
  const router = useRouter();
  const city = router.query.city;

  return (
    <div className="box-large">
      <h1 className="title-main">Details weather report</h1>
      <div className="city-name">
        {city} <span className="country">{details?.sys?.country}</span>
      </div>

      <div className={styles.detailsReport}>
        <div className={styles.details}>
          Temp:{" "}
          <span className={styles.values}>
            {details?.main?.temp}&#xb0; Celsius
          </span>
        </div>
        <div className={styles.details}>
          Wind:{" "}
          <span className={styles.values}>{details?.wind?.speed} km/h</span>
        </div>

        <div className={styles.details}>
          Humidity:{" "}
          <span className={styles.values}>{details?.main?.humidity}%</span>
        </div>
        <div className={styles.details}>
          pressure:{" "}
          <span className={styles.values}>{details?.main?.pressure} MM</span>
        </div>
      </div>

      <div className={styles.backContainer}>
        <Link href="/" className={styles.button}>
          Back
        </Link>
      </div>
    </div>
  );
}

export default Details;

export async function getServerSideProps(context) {
  const { city } = context.params;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a0dfce10c63107f25ccb7fe294dd50e5&units=metric`
  );
  const data = await response.json();

  return {
    props: {
      details: data,
    },
  };
}
