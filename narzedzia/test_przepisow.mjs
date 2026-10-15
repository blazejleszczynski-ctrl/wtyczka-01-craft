// test_przepisow.mjs - sprawdza logikę przepisów z main.js na wszystkich próbach z proby_przepisow.json (zawartość skrzyni -> oczekiwany wynik albo null).
// Użycie: node narzedzia/test_przepisow.mjs dodatek/BP/scripts/main.js narzedzia/proby_przepisow.json
import fs from "fs";
const kod = fs.readFileSync(process.argv[2], "utf8");
const przepisy = kod.match(/const PRZEPISY = \[[\s\S]*?\n\];/)[0];
const funkcja = kod.match(/function znajdzPrzepis[\s\S]*?\n}\n/)[0];
const znajdz = new Function(przepisy + funkcja + "return znajdzPrzepis;")();
const P = new Function(przepisy + "return PRZEPISY;")();
const proby = JSON.parse(fs.readFileSync(process.argv[3], "utf8"));
let ok = 0;
// Każdy przepis musi dawać swój wynik, a zestawy muszą być unikalne
const zestawy = new Set(P.map((p) => JSON.stringify(Object.entries(p.skladniki).sort())));
console.log("przepisow:", P.length, "unikalnych zestawow:", zestawy.size);
for (const [suma, oczekiwane] of proby) {
  const wynik = znajdz(suma)?.wynik ?? null;
  const dobrze = wynik === oczekiwane;
  ok += dobrze;
  console.log(dobrze ? "OK  " : "BLAD", JSON.stringify(suma), "->", wynik);
}
console.log(`${ok}/${proby.length}`);
