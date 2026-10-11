// main.js - skrypt stołu wojownika. Na razie test dymny: po uderzeniu stołu wypisuje na czacie zawartość skrzyni i życie stołu.
import { world } from "@minecraft/server";

// Gracz uderzył stół: zlicz przedmioty w skrzyni według rodzaju i wypisz je graczowi
world.afterEvents.entityHitEntity.subscribe((event) => {
  const gracz = event.damagingEntity;
  const stol = event.hitEntity;
  if (stol.typeId !== "osm:stol_wojownika" || gracz.typeId !== "minecraft:player") return;

  const skrzynia = stol.getComponent("minecraft:inventory").container;
  const suma = {};
  for (let i = 0; i < skrzynia.size; i++) {
    const przedmiot = skrzynia.getItem(i);
    if (przedmiot) suma[przedmiot.typeId] = (suma[przedmiot.typeId] ?? 0) + przedmiot.amount;
  }

  const opis = Object.entries(suma).map(([id, ile]) => `${ile}x ${id}`).join(", ") || "pusty";
  const zycie = stol.getComponent("minecraft:health");
  gracz.sendMessage(`Stół: ${opis} | życie: ${zycie.currentValue}/${zycie.effectiveMax}`);
});
