import { Cell } from "./cell";

import styles from "./game-field.module.scss";

export const GameField: React.FC = () => {
  const rows = Array.from({ length: 25 }, (_, idx) => idx);
  const cols = Array.from({ length: 25 }, (_, idx) => idx);

  return (
    <div className={styles.gameField}>
      {rows.map((row) => (
        <div className={styles.row}>
          {cols.map((col) => (
            <Cell key={row + col} />
          ))}
        </div>
      ))}
    </div>
  );
};
