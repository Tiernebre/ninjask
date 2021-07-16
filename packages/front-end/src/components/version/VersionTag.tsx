import { Tag } from "@tiernebre/kecleon";
import styles from "./VersionTag.module.scss";

// ids are mapped to their PokeAPI equivalents
const pokemonVersionCopyMap = new Map([
  [1, "red"],
  [2, "blue"],
  [3, "yellow"],
  [4, "gold"],
  [5, "silver"],
  [6, "crystal"],
  [7, "ruby"],
  [8, "sapphire"],
  [9, "emerald"],
]);

type VersionTagProps = { id: number };

export const VersionTag = ({ id }: VersionTagProps): JSX.Element => {
  const versionName = pokemonVersionCopyMap.get(id);
  const versionNameClass = versionName ? styles[versionName] : "";
  return (
    <Tag className={`${styles.tag} ${versionNameClass}`} size="medium">
      {versionName}
    </Tag>
  );
};
