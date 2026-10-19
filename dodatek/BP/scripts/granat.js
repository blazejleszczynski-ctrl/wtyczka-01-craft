// granat.js - granat: rzut prawym przyciskiem (prosto ok. 13 bloków, najdalej ok. 38), wybuch od razu po trafieniu w moba albo blok.
// Wybuch nie niszczy bloków i rani tylko moby w promieniu 5 bloków: 50 pkt w środku, liniowo do 0 na krawędzi. Błysk, dym, czerwone iskry, dźwięk pękającego narzędzia.
import { world, system, EquipmentSlot, GameMode } from "@minecraft/server";
import { wystrzel, prowadzLot } from "./wspolne.js";

// Prędkość rzutu w blokach na tick: rzut prosto ok. 13 bloków, w górę najdalej ok. 38 (symulacja lotu, notes.md; wybór użytkownika po teście)
const PREDKOSC_RZUTU = 1.5;
const PROMIEN = 5;
const OBRAZENIA_MAX = 50;

// Gracz użył granatu: rzut; w trybie przetrwania ubywa 1 granat ze stosu w ręku
world.afterEvents.itemUse.subscribe((event) => {
  const gracz = event.source;
  if (event.itemStack?.typeId !== "osm:granat") return;

  const granat = wystrzel(gracz, "osm:rzucony_granat", PREDKOSC_RZUTU);
  // Gra hamuje nasze pociski mocniej niż strzałę - tor prowadzi skrypt (wspolne.js)
  prowadzLot(granat, gracz, PREDKOSC_RZUTU);
  gracz.dimension.playSound("random.bow", gracz.location);
  // Pomiar tymczasowy (do usunięcia): położenie granatu co tick - przesunięcie na tick ma maleć × 0,99, grawitacja 0,05
  const pomiar = system.runInterval(() => {
    if (!granat.isValid) return system.clearRun(pomiar);
    const p = granat.location, v = granat.getVelocity();
    console.warn(`[lot] t=${system.currentTick} x=${p.x.toFixed(3)} y=${p.y.toFixed(3)} z=${p.z.toFixed(3)} vx=${v.x.toFixed(4)} vy=${v.y.toFixed(4)} vz=${v.z.toFixed(4)}`);
  }, 1);
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
  // Odległość w poziomie od rzucającego (do sprawdzenia zasięgu rzutu)
  const odGracza = rzucajacy?.isValid ? Math.hypot(punkt.x - rzucajacy.location.x, punkt.z - rzucajacy.location.z).toFixed(1) : "?";
  console.warn(`[granat] trafienie=${event.getEntityHit?.().entity?.typeId ?? "blok"} od_gracza=${odGracza}`);
  granat.remove();

  czasteczki(wymiar, "minecraft:large_explosion", punkt, 1, 0);
  czasteczki(wymiar, "minecraft:basic_smoke_particle", punkt, 10, 1);
  czasteczki(wymiar, "minecraft:redstone_torch_dust_particle", punkt, 15, 1.5);
  wymiar.playSound("random.break", punkt);

  // Szukamy z zapasem 2 bloków, bo wyszukiwanie mierzy do stóp moba, a my do najbliższego punktu ciała
  // Obrażenia przypisane rzucającemu (np. łup z moba), o ile nadal jest w świecie
  const zrodlo = rzucajacy?.isValid ? { cause: "entityExplosion", damagingEntity: rzucajacy } : { cause: "entityExplosion" };
  // Tylko rodzina "mob" (59 mobów z gry; poza nią m.in. ryby, gracz, pociski, leżące przedmioty)
  const moby = wymiar.getEntities({ location: punkt, maxDistance: PROMIEN + 2, families: ["mob"], excludeTypes: ["minecraft:player"] });
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
