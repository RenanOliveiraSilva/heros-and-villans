// gameManager.js
import { useState } from "react";

export default function gameManager() {
  const initialHero = { life: 100, name: "Jaspion", spriteState: "idle", isDefending: false };
  const initialVillain = { life: 100, name: "Satan Goss", spriteState: "idle", isDefending: false };

  const [hero, setHero] = useState(initialHero);
  const [villain, setVillain] = useState(initialVillain);
  const [isHeroTurn, setIsHeroTurn] = useState(true);
  const [gameEnded, setGameEnded] = useState(false);
  const [gameResult, setGameResult] = useState("");
  const [vilaoUsouPocao, setVilaoUsouPocao] = useState(false);

  const setSpriteTemporario = (setter, sprite, duracao = 1000) => {
    setter((prev) => ({ ...prev, spriteState: sprite }));
    setTimeout(() => {
      setter((prev) => ({ ...prev, spriteState: "idle" }));
    }, duracao);
  };

  const checkGameEnd = (updatedHero, updatedVillain) => {
    if (updatedHero.life <= 0) {
      setGameEnded(true);
      setGameResult("derrota");
    } else if (updatedVillain.life <= 0) {
      setGameEnded(true);
      setGameResult("vitória");
    }
  };

  const modifyLife = (target, amount) => {
    const setter = target === "hero" ? setHero : setVillain;
    const getState = target === "hero" ? hero : villain;

    setter((prev) => {
      const newLife = Math.min(100, Math.max(0, prev.life + amount));
      const updated = { ...prev, life: newLife };
      if (target === "hero") {
        checkGameEnd(updated, villain);
      } else {
        checkGameEnd(hero, updated);
      }
      return updated;
    });
  };

  const actions = {
    attack: () => {
      setSpriteTemporario(setHero, "attack1");
      modifyLife("villain", -10);
    },
    defense: () => {
      setSpriteTemporario(setHero, "defend");
      setHero((prev) => ({ ...prev, isDefending: true }));
    },
    usePotion: () => {
      setSpriteTemporario(setHero, "heal");
      modifyLife("hero", 15);
    },
    flee: () => {
      setSpriteTemporario(setHero, "run");
      const chance = Math.random();
      if (chance < 0.7) {
        setTimeout(() => {
          alert("Você conseguiu fugir da batalha!");
          setGameEnded(true);
          setGameResult("fuga");
        }, 1000);
      } else {
        setTimeout(() => {
          alert("Você tentou fugir, mas o inimigo te alcançou!");
          vilaoRealizaAcao();
          setIsHeroTurn(true);
        }, 1500);
      }
    }
  };

  const enemyActions = {
    attack: () => {
      setSpriteTemporario(setVillain, "attack2");
      setHero((prev) => {
        const damage = prev.isDefending ? 5 : 10;
        const updated = {
          ...prev,
          life: Math.max(0, prev.life - damage),
          isDefending: false
        };
        checkGameEnd(updated, villain);
        return updated;
      });
    },
    defense: () => {
      setSpriteTemporario(setVillain, "defend");
      setVillain((prev) => ({ ...prev, isDefending: true }));
    },
    usePotion: () => {
      if (vilaoUsouPocao) return enemyActions.attack();
      setSpriteTemporario(setVillain, "heal");
      modifyLife("villain", 10);
      setVilaoUsouPocao(true);
    }
  };

  const vilaoRealizaAcao = () => {
    const escolhas = ["attack", "defense", "usePotion"];
    const acao = escolhas[Math.floor(Math.random() * escolhas.length)];
    enemyActions[acao]?.();
  };

  const handleHeroAction = (action) => {
    if (!isHeroTurn || gameEnded) return;

    actions[action]?.();

    if (action !== "flee") {
      setIsHeroTurn(false);
      setTimeout(() => {
        vilaoRealizaAcao();
        setIsHeroTurn(true);
      }, 2000);
    }
  };

  const reiniciarJogo = () => {
    setHero(initialHero);
    setVillain(initialVillain);
    setIsHeroTurn(true);
    setGameEnded(false);
    setGameResult("");
    setVilaoUsouPocao(false);
  };

  return {
    hero,
    villain,
    handleHeroAction,
    isHeroTurn,
    gameEnded,
    gameResult,
    reiniciarJogo
  };
}
