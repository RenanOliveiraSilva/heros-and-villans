import styles from './page.module.css';

export default function Character({
  data,
  isHero,
  onAction,
  isHeroTurn,
  spriteState = 'idle',
  spriteSheet = '/hero-sprite.png'
}) {
  const lifePercent = Math.max(0, data.life) + '%';

  return (
    <div className={`${styles.character} ${isHero ? styles.bottomLeft : styles.topRight}`}>
      <div className={styles.lifeBar}>
        <div className={styles.lifeFill} style={{ width: lifePercent }} />
        <div className={styles.lifeText}>{data.life}</div>
      </div>

      <div
        className={`${styles.sprite} ${styles[spriteState]}`}
        style={{ backgroundImage: `url(${spriteSheet})` }}
      />

      <h1>{data.name}</h1>

      {isHero && onAction && (
        <div className={styles.actions}>
          <button disabled={!isHeroTurn} onClick={() => onAction("attack")}>Atacar</button>
          <button disabled={!isHeroTurn} onClick={() => onAction("defense")}>Defesa</button>
          <button disabled={!isHeroTurn} onClick={() => onAction("usePotion")}>Usar Poção</button>
          <button disabled={!isHeroTurn} onClick={() => onAction("flee")}>Correr</button>
        </div>
      )}
    </div>
  );
}