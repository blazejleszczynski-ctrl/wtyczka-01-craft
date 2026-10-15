// proca.js - proca: naciąganie (przytrzymanie prawego przycisku) i strzał brukiem z ekwipunku; siła naciągu jak w łuku, zasięg 2/3 łuku.
// Obrażenia liczy gra: pocisk osm:kamien_z_procy ma obrażenia zależne od prędkości (jak strzała gracza).
import { world, system, EquipmentSlot, GameMode } from "@minecraft/server";

// Prędkość kamienia przy pełnym naciągu w blokach na tick. Łuk ma 3,0; 2,34 daje 2/3 zasięgu łuku (symulacja lotu w notes.md)
const PREDKOSC_MAX = 2.34;
// Ticki do pełnego naciągu (jak łuk: 1 s)
const PELNY_NACIAG = 20;
const AMUNICJA = "minecraft:cobblestone";

// Tick, w którym gracz zaczął naciągać procę (id gracza -> tick)
const poczatekNaciagu = new Map();

// Siła naciągu 0..1 jak w łuku: (t² + 2t) / 3, t w sekundach
function silaNaciagu(ticki) {
  const t = ticki / PELNY_NACIAG;
  return Math.min((t * t + 2 * t) / 3, 1);
}

// Zabiera 1 bruk z ekwipunku gracza; zwraca false, gdy bruku nie ma
function zabierzAmunicje(gracz) {
  const ekwipunek = gracz.getComponent("minecraft:inventory").container;
  for (let i = 0; i < ekwipunek.size; i++) {
    const przedmiot = ekwipunek.getItem(i);
    if (przedmiot?.typeId !== AMUNICJA) continue;
    if (przedmiot.amount > 1) {
      przedmiot.amount -= 1;
      ekwipunek.setItem(i, przedmiot);
    } else {
      ekwipunek.setItem(i);
    }
    return true;
  }
  return false;
}

// Zużywa 1 punkt wytrzymałości procy w ręku; zużyta do końca proca pęka
function zuzyjProce(gracz) {
  const ekwipunek = gracz.getComponent("minecraft:equippable");
  const proca = ekwipunek.getEquipment(EquipmentSlot.Mainhand);
  const wytrzymalosc = proca.getComponent("minecraft:durability");
  if (wytrzymalosc.damage >= wytrzymalosc.maxDurability) {
    ekwipunek.setEquipment(EquipmentSlot.Mainhand);
    gracz.dimension.playSound("random.break", gracz.location);
    return;
  }
  wytrzymalosc.damage += 1;
  ekwipunek.setEquipment(EquipmentSlot.Mainhand, proca);
}

// Wystrzeliwuje kamień z wysokości oczu gracza w kierunku patrzenia
function wystrzel(gracz, predkosc) {
  const kierunek = gracz.getViewDirection();
  const glowa = gracz.getHeadLocation();
  const start = { x: glowa.x + kierunek.x * 0.5, y: glowa.y + kierunek.y * 0.5, z: glowa.z + kierunek.z * 0.5 };
  const kamien = gracz.dimension.spawnEntity("osm:kamien_z_procy", start);
  const pocisk = kamien.getComponent("minecraft:projectile");
  pocisk.owner = gracz;
  pocisk.shoot({ x: kierunek.x * predkosc, y: kierunek.y * predkosc, z: kierunek.z * predkosc });
  gracz.dimension.playSound("random.bow", gracz.location);
}

world.afterEvents.itemStartUse.subscribe((event) => {
  if (event.itemStack?.typeId !== "osm:proca") return;
  poczatekNaciagu.set(event.source.id, system.currentTick);
});

// Gracz puścił prawy przycisk: strzał z siłą zależną od czasu naciągu, w trybie przetrwania za 1 bruk i 1 punkt wytrzymałości
world.afterEvents.itemReleaseUse.subscribe((event) => {
  const gracz = event.source;
  if (event.itemStack?.typeId !== "osm:proca" || !poczatekNaciagu.has(gracz.id)) return;
  const sila = silaNaciagu(system.currentTick - poczatekNaciagu.get(gracz.id));
  poczatekNaciagu.delete(gracz.id);
  // Jak łuk: zbyt krótki naciąg nie strzela
  if (sila < 0.1) return;

  const tworczy = gracz.getGameMode() === GameMode.Creative;
  if (!tworczy && !zabierzAmunicje(gracz)) return;
  wystrzel(gracz, sila * PREDKOSC_MAX);
  if (!tworczy) zuzyjProce(gracz);
  console.warn(`[proca] sila=${sila.toFixed(2)} predkosc=${(sila * PREDKOSC_MAX).toFixed(2)}`);
});

// Pomiar kontrolny: prędkość strzały z łuku i kamienia z procy tick po wystrzale (sprawdza założenie, że łuk strzela z prędkością 3,0)
world.afterEvents.entitySpawn.subscribe(({ entity }) => {
  if (entity.typeId !== "minecraft:arrow" && entity.typeId !== "osm:kamien_z_procy") return;
  system.runTimeout(() => {
    if (!entity.isValid) return;
    const v = entity.getVelocity();
    console.warn(`[pomiar] ${entity.typeId} predkosc=${Math.hypot(v.x, v.y, v.z).toFixed(2)}`);
  }, 1);
});

// Kamień trafił moba: wpis w logu z obrażeniami zadanymi przez grę (do sprawdzenia zależności od naciągu).
// Pocisk znika przy trafieniu, więc strzał z procy rozpoznajemy po rodzaju obrażeń i procy w ręku strzelającego.
world.afterEvents.entityHurt.subscribe((event) => {
  const gracz = event.damageSource.damagingEntity;
  if (event.damageSource.cause !== "projectile" || gracz?.typeId !== "minecraft:player") return;
  if (gracz.getComponent("minecraft:equippable").getEquipment(EquipmentSlot.Mainhand)?.typeId !== "osm:proca") return;
  console.warn(`[proca] cel=${event.hurtEntity.typeId} obrazenia=${event.damage}`);
});
