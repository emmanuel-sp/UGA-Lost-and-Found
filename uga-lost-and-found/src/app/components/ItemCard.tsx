import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import styles from "../css/ItemCard.module.css";
import { useRouter } from "next/navigation";

interface ItemCardProps {
  name: string;
  dateFound: string;
  locationFound: string;
  imageUrl?: string;
  status: "Claimed" | "Unclaimed";
  onDelete: () => void; // Add the onDelete callback prop
  onEdit: () => void; // Add the onEdit callback loop
}

const ItemCard: React.FC<ItemCardProps> = ({
  name,
  dateFound,
  locationFound,
  imageUrl,
  status,
  onDelete,
  onEdit,
}) => {
  const { loggedIn } = useAuth();
  const router = useRouter();

  return (
    <div className={styles.card}>
      <div
        className={`${styles.statusBox} ${
          status === "Claimed" ? styles.claimed : styles.unclaimed
        }`}
      >
        {status}
      </div>
      {loggedIn && (
        <div className={styles.buttonContainer}>
          <button
            onClick={onEdit}
            className={styles.editButton}
          >
            Edit
          </button>
          <button onClick={onDelete} className={styles.deleteButton}>
            Delete
          </button>
        </div>
      )}

      <div className={styles.imageContainer}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            width={80}
            height={80}
            className={styles.image}
          />
        ) : (
          <span className={styles.noImage}>No Picture</span>
        )}
      </div>
      <div className={styles.textContainer}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.date}>Found on: {dateFound}</p>
        <p className={styles.location}>Location: {locationFound}</p>
      </div>
    </div>
  );
};

export default ItemCard;
