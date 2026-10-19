// wspolne.js - funkcje wspólne dla przedmiotów z efektami: czas przytrzymania prawego przycisku, zużycie wytrzymałości, wystrzał pocisku z oczu gracza, prowadzenie toru pocisku skryptem.
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

// Lot naszych pocisków w grze (pomiar granatu 2026-10-19, 22 pary ticków, odchyłka 0,0001): co tick
// prędkość pozioma × 0,9008, pionowa × 0,9702 − 0,255, potem przesunięcie o nową prędkość. Docelowo lot jak strzała: opór 0,99, grawitacja 0,05.
const GRA_OPOR_POZIOM = 0.9008;
const GRA_OPOR_PION = 0.9702;
const GRA_GRAWITACJA = 0.255;
const OPOR = 0.99;
const GRAWITACJA = 0.05;

// Prowadzi pocisk co tick po torze z oporem OPOR i grawitacją GRAWITACJA, zaczynając od prędkości `predkosc` w kierunku patrzenia gracza.
// Ustawia prędkość odwrotną do modelu gry, żeby po jej hamowaniu i grawitacji pocisk przesunął się o prędkość z naszego modelu.
export function prowadzLot(pocisk, gracz, predkosc) {
  const k = gracz.getViewDirection();
  let v = { x: k.x * predkosc, y: k.y * predkosc, z: k.z * predkosc };
  const id = system.runInterval(() => {
    if (!pocisk.isValid) return system.clearRun(id);
    pocisk.clearVelocity();
    // applyImpulse też mnoży prędkość ok. 1,92 raza jak shoot() (pomiar 2026-10-19: tor 1,93 raza za duży), stąd dzielenie
    const m = MNOZNIK_SHOOT;
    pocisk.applyImpulse({ x: v.x / GRA_OPOR_POZIOM / m, y: (v.y + GRA_GRAWITACJA) / GRA_OPOR_PION / m, z: v.z / GRA_OPOR_POZIOM / m });
    v = { x: v.x * OPOR, y: v.y * OPOR - GRAWITACJA, z: v.z * OPOR };
  }, 1);
}
