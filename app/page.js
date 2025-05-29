'use client';
import Character from '@/app/components/Character';
import gameManager from '@/app/hooks/gameManager';

export default function Home() {
  const {
    hero,
    villain,
    handleHeroAction,
    isHeroTurn,
    gameEnded,
    gameResult,
    reiniciarJogo
  } = gameManager();

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        overflow: 'hidden',
      }}
    >
      <Character
        data={hero}
        isHero
        onAction={handleHeroAction}
        isHeroTurn={isHeroTurn}
        spriteState={hero.spriteState}
        spriteSheet="/hero-sprite.png"
      />

      <Character
        data={villain}
        isHero={false}
        spriteState={villain.spriteState}
        spriteSheet="/villain-sprite.png"
      />

      {gameEnded && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(0,0,0,0.8)',
            color: '#fff',
            padding: '2rem',
            borderRadius: '1rem',
            textAlign: 'center',
            zIndex: 10,
          }}
        >
          <h2>
            Você{' '}
            {gameResult === 'vitória'
              ? 'venceu!'
              : gameResult === 'derrota'
              ? 'foi derrotado!'
              : 'fugiu!'}
          </h2>
          <button
            onClick={reiniciarJogo}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              fontSize: '1rem',
              backgroundColor: '#fff',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Reiniciar Jogo
          </button>
        </div>
      )}
    </div>
  );
}
