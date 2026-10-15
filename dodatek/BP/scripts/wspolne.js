// wspolne.js - funkcje wspólne dla przedmiotów z efektami: czas przytrzymania prawego przycisku, zużycie wytrzymałości, wystrzał pocisku z oczu gracza.
import { world, system, EquipmentSlot } from "@minecraft/server";

// Tick, w którym gracz zaczął używać przedmiotu (id gracza -> tick)
const poczatekUzycia = new Map();
world.afterEvents.itemStartUse.subscribe((event) => poczatekUzycia.set(event.source.id, system.currentTick));

// Ile ticków gracz trzymał prawy przycisk (wołać przy puszczeniu, w itemReleaseUse)
export function czasUzycia(gracz) {
  const ticki = system.currentTick - (poczatekUzycia.get(gracz.id) ?? system.currentTick);
  poczatekUzycia.delete(gracz.id);
  return ticki;
}

// Zużywa 1 punkt wytrzymałości; zwraca przedmiot albo undefined, gdy pękł
export function zuzyj(przedmiot) {
  const wytrzymalosc = przedmiot.getComponent("minecraft:durability");
  if (wytrzymalosc.damage >= wytrzymalosc.maxDurability) return undefined;
  wytrzymalosc.damage += 1;
  return przedmiot;
}

// Zużywa przedmiot w ręku gracza; pęknięty znika z dźwiękiem
export function zuzyjWReku(gracz) {
  const ekwipunek = gracz.getComponent("minecraft:equippable");
  const przedmiot = zuzyj(ekwipunek.getEquipment(EquipmentSlot.Mainhand));
  ekwipunek.setEquipment(EquipmentSlot.Mainhand, przedmiot);
  if (!przedmiot) gracz.dimension.playSound("random.break", gracz.location);
}

// shoot() nadaje pociskowi prędkość ok. 1,92 raza większą niż podana (pomiar w grze: 50 strzałów, od 1,90 do 1,97) - dzielimy przez nią
const MNOZNIK_SHOOT = 1.92;

// Tworzy pocisk na wysokości oczu gracza i wystrzeliwuje go w kierunku patrzenia (prędkość w blokach na tick); zwraca pocisk
export function wystrzel(gracz, typPocisku, predkoscDocelowa) {
  const predkosc = predkoscDocelowa / MNOZNIK_SHOOT;
  const kierunek = gracz.getViewDirection();
  const glowa = gracz.getHeadLocation();
  const start = { x: glowa.x + kierunek.x * 0.5, y: glowa.y + kierunek.y * 0.5, z: glowa.z + kierunek.z * 0.5 };
  const pocisk = gracz.dimension.spawnEntity(typPocisku, start);
  const lot = pocisk.getComponent("minecraft:projectile");
  lot.owner = gracz;
  lot.shoot({ x: kierunek.x * predkosc, y: kierunek.y * predkosc, z: kierunek.z * predkosc });
  return pocisk;
}
