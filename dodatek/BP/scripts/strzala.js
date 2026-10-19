// strzala.js - strzała wybuchowa: łuk strzela nią, gdy leży w drugiej ręce gracza; po trafieniu wybuch o sile 2,67 (2/3 TNT), który niszczy bloki i rani wszystkich.
// Łuk z gry przyjmuje tylko strzały z gry, więc skrypt oznacza wystrzeloną zwykłą strzałę jako wybuchową, zabiera 1 strzałę wybuchową i oddaje zwykłą.
import { world, system, ItemStack, EquipmentSlot, GameMode } from "@minecraft/server";

const SILA_WYBUCHU = 2.67;
// Znacznik (tag) strzały wybuchowej; zostaje na strzale także po ponownym wczytaniu świata
const ZNACZNIK = "osm_wybuchowa";
// Numery (id) wystrzelonych strzał wybuchowych - strzała z gry znika przy trafieniu moba, zanim skrypt odczyta jej znacznik, a numer zostaje
const wybuchowe = new Set();

// Wystrzelona strzała: jeśli strzelał gracz z łuku, a w drugiej ręce ma strzałę wybuchową - oznacz strzałę i rozlicz amunicję
world.afterEvents.entitySpawn.subscribe(({ entity }) => {
  // Strzała mogła już zniknąć (np. strzał z bardzo bliska) - wtedy nie da się jej odczytać
  if (!entity.isValid || entity.typeId !== "minecraft:arrow") return;
  const gracz = entity.getComponent("minecraft:projectile")?.owner;
  if (gracz?.typeId !== "minecraft:player") return;
  const ekwipunek = gracz.getComponent("minecraft:equippable");
  const luk = ekwipunek.getEquipment(EquipmentSlot.Mainhand);
  const druga = ekwipunek.getEquipment(EquipmentSlot.Offhand);
  if (luk?.typeId !== "minecraft:bow" || druga?.typeId !== "osm:strzala_wybuchowa") return;

  entity.addTag(ZNACZNIK);
  wybuchowe.add(entity.id);
  console.warn("[strzala] wystrzal wybuchowej");
  if (gracz.getGameMode() === GameMode.Creative) return;
  if (druga.amount > 1) {
    druga.amount -= 1;
    ekwipunek.setEquipment(EquipmentSlot.Offhand, druga);
  } else {
    ekwipunek.setEquipment(EquipmentSlot.Offhand);
  }
  // Łuk zabrał zwykłą strzałę (chyba że ma Nieskończoność) - oddajemy ją
  if (!luk.getComponent("minecraft:enchantable")?.hasEnchantment("minecraft:infinity")) {
    gracz.getComponent("minecraft:inventory").container.addItem(new ItemStack("minecraft:arrow", 1));
  }
});

// Smuga czerwonych iskier za strzałami wybuchowymi w locie (co 2 ticki)
system.runInterval(() => {
  for (const wymiar of ["minecraft:overworld", "minecraft:nether", "minecraft:the_end"]) {
    const d = world.getDimension(wymiar);
    for (const strzala of d.getEntities({ tags: [ZNACZNIK] })) {
      d.spawnParticle("minecraft:redstone_torch_dust_particle", strzala.location);
    }
  }
}, 2);

// Strzała wybuchowa trafiła moba albo blok: wybuch w miejscu trafienia (bez źródła, więc rani też strzelającego, jak TNT)
function wybuch(event) {
  const strzala = event.projectile;
  // Znacznik sprawdzamy tylko, gdy strzała jeszcze istnieje (np. strzała wbita przed ponownym wczytaniem świata)
  if (!wybuchowe.delete(strzala.id) && !(strzala.isValid && strzala.hasTag(ZNACZNIK))) return;
  console.warn(`[strzala] wybuch trafienie=${event.getEntityHit?.().entity?.typeId ?? "blok"} istnieje=${strzala.isValid ? "tak" : "nie"}`);
  if (strzala.isValid) strzala.remove();
  event.dimension.createExplosion(event.location, SILA_WYBUCHU, { breaksBlocks: true });
}
world.afterEvents.projectileHitEntity.subscribe(wybuch);
world.afterEvents.projectileHitBlock.subscribe(wybuch);
