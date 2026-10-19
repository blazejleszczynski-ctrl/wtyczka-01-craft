// granat.js - granat: rzut prawym przyciskiem (zasięg 20 bloków), wybuch od razu po trafieniu w moba albo blok.
// Wybuch nie niszczy bloków i rani tylko moby w promieniu 5 bloków: 50 pkt w środku, liniowo do 0 na krawędzi. Błysk, dym, czerwone iskry, dźwięk pękającego narzędzia.
import { world, EquipmentSlot, GameMode } from "@minecraft/server";
import { wystrzel } from "./wspolne.js";

// Prędkość rzutu w blokach na tick: zasięg 20 bloków (ta sama symulacja lotu co rzucony sztylet, notes.md)
const PREDKOSC_RZUTU = 1.06;
const PROMIEN = 5;
const OBRAZENIA_MAX = 50;
// Postacie, które nie są mobami, a mają życie (gracz, leżące przedmioty, kulki doświadczenia)
const NIE_MOBY = ["minecraft:player", "minecraft:item", "minecraft:xp_orb"];

// Gracz użył granatu: rzut; w trybie przetrwania ubywa 1 granat ze stosu w ręku
world.afterEvents.itemUse.subscribe((event) => {
  const gracz = event.source;
  if (event.itemStack?.typeId !== "osm:granat") return;

  wystrzel(gracz, "osm:rzucony_granat", PREDKOSC_RZUTU);
  gracz.dimension.playSound("random.bow", gracz.location);
  if (gracz.getGameMode() === GameMode.Creative) return;
  const ekwipunek = gracz.getComponent("minecraft:equippable");
  const stos = ekwipunek.getEquipment(EquipmentSlot.Mainhand);
  if (stos.amount > 1) {
    stos.amount -= 1;
    ekwipunek.setEquipment(EquipmentSlot.Mainhand, stos);
  } else {
    ekwipunek.setEquipment(EquipmentSlot.Mainhand);
  }
});

// Rozrzuca `ile` cząsteczek danego rodzaju losowo w sześcianie o boku 2 × rozrzut wokół punktu
function czasteczki(wymiar, rodzaj, punkt, ile, rozrzut) {
  for (let i = 0; i < ile; i++) {
    const los = () => (Math.random() * 2 - 1) * rozrzut;
    wymiar.spawnParticle(rodzaj, { x: punkt.x + los(), y: punkt.y + los(), z: punkt.z + los() });
  }
}

// Odległość punktu wybuchu od ciała moba (najbliższy punkt na pionowym odcinku od stóp do głowy)
function odleglosc(punkt, mob) {
  const stopy = mob.location;
  const y = Math.min(Math.max(punkt.y, stopy.y), mob.getHeadLocation().y);
  return Math.hypot(punkt.x - stopy.x, punkt.y - y, punkt.z - stopy.z);
}

// Granat trafił moba albo blok: wybuch w miejscu trafienia
function wybuch(event) {
  const granat = event.projectile;
  if (!granat.isValid || granat.typeId !== "osm:rzucony_granat") return;
  const rzucajacy = granat.getComponent("minecraft:projectile").owner;
  const punkt = event.location;
  const wymiar = event.dimension;
  console.warn(`[granat] trafienie=${event.getEntityHit?.().entity?.typeId ?? "blok"}`);
  granat.remove();

  czasteczki(wymiar, "minecraft:large_explosion", punkt, 1, 0);
  czasteczki(wymiar, "minecraft:basic_smoke_particle", punkt, 10, 1);
  czasteczki(wymiar, "minecraft:redstone_torch_dust_particle", punkt, 15, 1.5);
  wymiar.playSound("random.break", punkt);

  // Szukamy z zapasem 2 bloków, bo wyszukiwanie mierzy do stóp moba, a my do najbliższego punktu ciała
  // Obrażenia przypisane rzucającemu (np. łup z moba), o ile nadal jest w świecie
  const zrodlo = rzucajacy?.isValid ? { cause: "entityExplosion", damagingEntity: rzucajacy } : { cause: "entityExplosion" };
  const moby = wymiar.getEntities({ location: punkt, maxDistance: PROMIEN + 2, excludeTypes: NIE_MOBY });
  for (const mob of moby) {
    if (!mob.getComponent("minecraft:health")) continue;
    const d = odleglosc(punkt, mob);
    if (d >= PROMIEN) continue;
    const obrazenia = OBRAZENIA_MAX * (1 - d / PROMIEN);
    mob.applyDamage(obrazenia, zrodlo);
    const zycie = mob.isValid ? mob.getComponent("minecraft:health")?.currentValue : 0;
    console.warn(`[granat] cel=${mob.typeId} odleglosc=${d.toFixed(2)} obrazenia=${obrazenia.toFixed(1)} zycie=${zycie}`);
  }
}
world.afterEvents.projectileHitEntity.subscribe(wybuch);
world.afterEvents.projectileHitBlock.subscribe(wybuch);
