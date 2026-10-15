// proca.js - proca: naciąganie (przytrzymanie prawego przycisku) i strzał brukiem z ekwipunku; siła naciągu jak w łuku, zasięg 2/3 łuku.
// Obrażenia liczy gra: pocisk osm:kamien_z_procy ma obrażenia zależne od prędkości (jak strzała gracza).
import { world, system, EquipmentSlot, GameMode } from "@minecraft/server";
import { czasUzycia, zuzyjWReku, wystrzel } from "./wspolne.js";

// Prędkość kamienia przy pełnym naciągu w blokach na tick. Łuk ma 3,0; 2,34 daje 2/3 zasięgu łuku (symulacja lotu w notes.md)
const PREDKOSC_MAX = 2.34;
// Ticki do pełnego naciągu (jak łuk: 1 s)
const PELNY_NACIAG = 20;
const AMUNICJA = "minecraft:cobblestone";

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

// Gracz puścił prawy przycisk: strzał z siłą zależną od czasu naciągu, w trybie przetrwania za 1 bruk i 1 punkt wytrzymałości
world.afterEvents.itemReleaseUse.subscribe((event) => {
  const gracz = event.source;
  if (event.itemStack?.typeId !== "osm:proca") return;
  const sila = silaNaciagu(czasUzycia(gracz));
  // Jak łuk: zbyt krótki naciąg nie strzela
  if (sila < 0.1) return;

  const tworczy = gracz.getGameMode() === GameMode.Creative;
  if (!tworczy && !zabierzAmunicje(gracz)) return;
  wystrzel(gracz, "osm:kamien_z_procy", sila * PREDKOSC_MAX);
  gracz.dimension.playSound("random.bow", gracz.location);
  if (!tworczy) zuzyjWReku(gracz);
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

// Kamień trafił moba albo blok: wpis w logu i usunięcie kamienia (gra go nie usuwa, żeby skrypt zdążył go odczytać)
function trafienie(event) {
  const kamien = event.projectile;
  if (!kamien.isValid || kamien.typeId !== "osm:kamien_z_procy") return;
  const cel = event.getEntityHit?.().entity;
  console.warn(`[proca] trafienie=${cel ? cel.typeId : "blok"}`);
  kamien.remove();
}
world.afterEvents.projectileHitEntity.subscribe(trafienie);
world.afterEvents.projectileHitBlock.subscribe(trafienie);

// Kamień zranił moba: wpis w logu z obrażeniami zadanymi przez grę (do sprawdzenia zależności od naciągu).
// Pocisk znika przy trafieniu, więc strzał z procy rozpoznajemy po rodzaju obrażeń i procy w ręku strzelającego.
world.afterEvents.entityHurt.subscribe((event) => {
  const gracz = event.damageSource.damagingEntity;
  if (event.damageSource.cause !== "projectile" || gracz?.typeId !== "minecraft:player") return;
  if (gracz.getComponent("minecraft:equippable").getEquipment(EquipmentSlot.Mainhand)?.typeId !== "osm:proca") return;
  console.warn(`[proca] cel=${event.hurtEntity.typeId} obrazenia=${event.damage}`);
});
