// main.js - skrypt dodatku: crafting na stole wojownika (uderzenie stołu zamienia składniki na wynik) i ogłuszenie maczugą z pryzmarynu.
// Efekty pozostałych przedmiotów są w osobnych plikach (proca.js, sztylet.js, granat.js, strzala.js), funkcje wspólne w wspolne.js.
import { world, ItemStack, EquipmentSlot } from "@minecraft/server";
import "./proca.js";
import "./sztylet.js";
import "./granat.js";
import "./strzala.js";

// Ogłuszenie maczugą: szansa na uderzenie i czas w tickach (20 ticków = 1 s)
const SZANSA_OGLUSZENIA = 0.2;
const CZAS_OGLUSZENIA = 20;

// Przepisy bez kształtu: składniki (rodzaj -> liczba) muszą dokładnie zgadzać się z zawartością skrzyni
const PRZEPISY = [
  { skladniki: { "minecraft:prismarine_shard": 5 }, wynik: "osm:maczuga_pryzmarynowa", ile: 1 },
  { skladniki: { "minecraft:iron_ingot": 1, "minecraft:stick": 1 }, wynik: "osm:sztylet", ile: 1 },
  { skladniki: { "minecraft:stick": 4, "minecraft:string": 1 }, wynik: "osm:proca", ile: 1 },
  { skladniki: { "minecraft:iron_ingot": 4, "minecraft:gunpowder": 4, "minecraft:fire_charge": 1 }, wynik: "osm:granat", ile: 4 },
  { skladniki: { "minecraft:gunpowder": 8, "minecraft:arrow": 1 }, wynik: "osm:strzala_wybuchowa", ile: 2 },
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

// Gracz zranił moba maczugą z pryzmarynu: z szansą SZANSA_OGLUSZENIA ogłusz go (spowolnienie i osłabienie na najwyższym poziomie).
// entityHurt, a nie entityHitEntity: to drugie zachodzi też przy kliknięciach, gdy mob chwilowo nie przyjmuje obrażeń.
world.afterEvents.entityHurt.subscribe((event) => {
  const gracz = event.damageSource.damagingEntity;
  const cel = event.hurtEntity;
  if (gracz?.typeId !== "minecraft:player") return;

  const bron = gracz.getComponent("minecraft:equippable").getEquipment(EquipmentSlot.Mainhand);
  if (bron?.typeId !== "osm:maczuga_pryzmarynowa") return;

  const ogluszenie = Math.random() < SZANSA_OGLUSZENIA;
  console.warn(`[maczuga] cel=${cel.typeId} obrazenia=${event.damage} ogluszenie=${ogluszenie ? "tak" : "nie"}`);
  // Mob zabity tym ciosem już nie istnieje - nie da się nałożyć efektu
  if (!ogluszenie || !cel.isValid) return;

  cel.addEffect("slowness", CZAS_OGLUSZENIA, { amplifier: 255 });
  cel.addEffect("weakness", CZAS_OGLUSZENIA, { amplifier: 255 });
});
