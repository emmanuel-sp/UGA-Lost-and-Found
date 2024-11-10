import Image from 'next/image';
import styles from '../css/ItemCard.module.css';

interface ItemCardProps {
  name: string;
  dateFound: string;
  locationFound: string;
  imageUrl?: string;
  status: "Claimed" | "Unclaimed";
}

const ItemCard: React.FC<ItemCardProps> = ({ name, dateFound, locationFound, imageUrl, status }) => (
  <div className={styles.card}>
    <div className={`${styles.statusBox} ${status === "Claimed" ? styles.claimed : styles.unclaimed}`}>
        {status}
    </div>
    <div className={styles.imageContainer}>
      {imageUrl ? (
        <Image
        src={imageUrl} 
        alt={name}
        width={80}
        height={80}
        className={styles.image} />
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

export default ItemCard;

  