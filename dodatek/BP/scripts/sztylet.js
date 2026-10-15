// sztylet.js - sztylet: cios od tyłu zadaje drugi taki sam cios (8 zamiast 4), zużycie przy ciosie, rzut po przymierzeniu się (0,5 s).
// Rzucony sztylet (pocisk osm:rzucony_sztylet) zadaje 5 pkt, a po trafieniu spada w tym miejscu jako przedmiot do podniesienia.
import { world, EquipmentSlot, GameMode } from "@minecraft/server";
import { czasUzycia, zuzyj, zuzyjWReku, wystrzel } from "./wspolne.js";

// Ticki przymierzania przed rzutem (0,5 s)
const CZAS_PRZYMIERZANIA = 10;
// Prędkość rzutu w blokach na tick: zasięg 20 bloków (symulacja lotu w notes.md)
const PREDKOSC_RZUTU = 1.06;

// Rzucone sztylety w locie: id pocisku -> sztylet do upuszczenia po trafieniu (w trybie kreatywnym brak wpisu - sztylet zostaje w ręku)
const wLocie = new Map();

// Czy atakujący stoi za plecami celu: kierunek do atakującego jest przeciwny do kierunku, w którym cel jest zwrócony ciałem
function odTylu(cel, atakujacy) {
  const kat = (cel.getRotation().y * Math.PI) / 180;
  const dx = atakujacy.location.x - cel.location.x;
  const dz = atakujacy.location.z - cel.location.z;
  return -Math.sin(kat) * dx + Math.cos(kat) * dz < 0;
}

// Cios sztyletem: zużycie (strzelacz wyłącza grze zużycie przy ciosach) i podwójne obrażenia od tyłu
world.afterEvents.entityHurt.subscribe((event) => {
  const gracz = event.damageSource.damagingEntity;
  const cel = event.hurtEntity;
  if (event.damageSource.cause !== "entityAttack" || gracz?.typeId !== "minecraft:player") return;
  if (gracz.getComponent("minecraft:equippable").getEquipment(EquipmentSlot.Mainhand)?.typeId !== "osm:sztylet") return;

  if (gracz.getGameMode() !== GameMode.Creative) zuzyjWReku(gracz);
  const zTylu = cel.isValid && odTylu(cel, gracz);
  // Drugi cios o tej samej sile (4 + 4 = 8). applyDamage działa mimo chwilowej nietykalności celu po ciosie (pomiar: golem -12 przy 4 + 8).
  // Rodzaj "override", żeby ten nasłuch nie złapał własnych obrażeń
  if (zTylu) cel.applyDamage(event.damage, { cause: "override", damagingEntity: gracz });
  const zycie = cel.isValid ? cel.getComponent("minecraft:health")?.currentValue : 0;
  console.warn(`[sztylet] cel=${cel.typeId} obrazenia=${event.damage} od_tylu=${zTylu ? "tak" : "nie"} zycie=${zycie}`);
});

// Gracz puścił prawy przycisk po przymierzeniu się: rzut; w trybie przetrwania sztylet znika z ręki i traci 1 punkt wytrzymałości
world.afterEvents.itemReleaseUse.subscribe((event) => {
  const gracz = event.source;
  if (event.itemStack?.typeId !== "osm:sztylet") return;
  if (czasUzycia(gracz) < CZAS_PRZYMIERZANIA) return;

  const pocisk = wystrzel(gracz, "osm:rzucony_sztylet", PREDKOSC_RZUTU);
  gracz.dimension.playSound("item.trident.throw", gracz.location);
  console.warn("[sztylet] rzut");
  if (gracz.getGameMode() === GameMode.Creative) return;
  const ekwipunek = gracz.getComponent("minecraft:equippable");
  wLocie.set(pocisk.id, zuzyj(ekwipunek.getEquipment(EquipmentSlot.Mainhand)));
  ekwipunek.setEquipment(EquipmentSlot.Mainhand);
});

// Rzucony sztylet trafił moba albo blok: pocisk znika, a w miejscu trafienia spada sztylet do podniesienia
function upusc(event) {
  const pocisk = event.projectile;
  if (!pocisk.isValid || pocisk.typeId !== "osm:rzucony_sztylet") return;
  console.warn(`[sztylet] trafienie=${event.getEntityHit?.().entity?.typeId ?? "blok"}`);
  const sztylet = wLocie.get(pocisk.id);
  wLocie.delete(pocisk.id);
  pocisk.remove();
  if (sztylet) event.dimension.spawnItem(sztylet, event.location);
}
world.afterEvents.projectileHitEntity.subscribe(upusc);
world.afterEvents.projectileHitBlock.subscribe(upusc);
