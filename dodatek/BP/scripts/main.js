// main.js - skrypt stołu wojownika: po uderzeniu stołu sprawdza zawartość skrzyni i, gdy pasuje do przepisu, zamienia składniki na wynik.
import { world, ItemStack } from "@minecraft/server";

// Przepisy bez kształtu: składniki (rodzaj -> liczba) muszą dokładnie zgadzać się z zawartością skrzyni
const PRZEPISY = [
  { skladniki: { "minecraft:prismarine_shard": 5 }, wynik: "osm:maczuga_pryzmarynowa", ile: 1 },
  { skladniki: { "minecraft:iron_ingot": 1, "minecraft:stick": 1 }, wynik: "osm:sztylet", ile: 1 },
];

// Zwraca przepis, którego składniki są identyczne z sumą przedmiotów w skrzyni, albo undefined
function znajdzPrzepis(suma) {
  return PRZEPISY.find((przepis) => {
    const rodzaje = Object.keys(przepis.skladniki);
    return rodzaje.length === Object.keys(suma).length && rodzaje.every((id) => suma[id] === przepis.skladniki[id]);
  });
}

// Gracz uderzył stół: zlicz przedmioty w skrzyni według rodzaju i wykonaj pasujący przepis
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

  const przepis = znajdzPrzepis(suma);
  if (!przepis) return;

  skrzynia.clearAll();
  skrzynia.addItem(new ItemStack(przepis.wynik, przepis.ile));
  gracz.sendMessage(`Wykonano: ${przepis.wynik}`);
});
