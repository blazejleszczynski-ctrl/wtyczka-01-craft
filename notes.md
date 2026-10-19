# notes.md

Szczegółowe wyjaśnienia napisanych funkcji, podjętych decyzji oraz udanych i nieudanych prób.

Jak używać: po napisaniu i przetestowaniu większej części kodu dopisujemy sekcję: co zrobiliśmy, dlaczego tak, co nie zadziałało.

## Dodatek Bedrock - budowa (2026-10-11)
- Dwie paczki: BP (zachowanie: bloki, przedmioty, przepisy) i RP (wygląd: tekstury, nazwy). BP w `manifest.json` ma zależność od UUID nagłówka RP, więc gra włącza RP razem z BP.
- Przedrostek nazw: `osm`. Stół: postać `osm:stol_wojownika`. Dawny blok `osm:stol` (siatka 3x3, tag przepisów `osm_stol`) usunięto 2026-10-12 - zastąpiła go postać ze skrzynią.
- Format plików: `1.26.50`, `min_engine_version` `[1, 26, 50]` - zgodne z grą 1.26.52.

## Lekcje z testu dymnego stołu
- Blok w formacie 1.26.50 wymaga **jednocześnie** `minecraft:geometry` i `minecraft:material_instances`. Bez `geometry` gra po cichu odrzuca blok: nie ma go w ekwipunku, a `/give` zgłasza „nieoczekiwany błąd składni”.
- Dziennik zawartości trzeba włączyć w Ustawienia -> Twórca (nie Ogólne). Gra zapisuje go do pliku z opóźnieniem - plik bywa pusty zaraz po błędzie, czytać ponownie po chwili.
- Ścieżka `%LocalAppData%\Packages\Microsoft.MinecraftUWP...\LocalState\games\com.mojang` jest stara - obecna gra używa `%AppData%\Minecraft Bedrock\Users\Shared\games\com.mojang`.

## Lekcje z testu dymnego stołu 5x5 (2026-10-11)
- Wbudowany stół do craftingu (`minecraft:crafting_table`) ma zawsze siatkę 3x3 - komponent ma tylko `crafting_tags` i `table_name`.
- Postać z `minecraft:inventory` (`container_type: container`) otwiera okno małej skrzyni (3 rzędy) nawet przy 54 polach. Stąd przepisy bez kształtu w oknie 9x3.
- Crafting uruchamia uderzenie stołu, a nie samo włożenie składników - inaczej sztylet (żelazo + patyk) powstawałby w trakcie układania artefaktu-miecza, który zawiera te same składniki.
- Modele z gry są spakowane w `__brarchive` i ich nazw nie da się pewnie odczytać - własny model sześcianu (`geometry.osm.stol_wojownika`) jest pewniejszy.
- Gra działa po polsku: nazwy trzeba dopisywać także do `pl_PL.lang`, inaczej okno ma tytuł „Nieznany”.
- `"deals_damage": "no"` w `minecraft:damage_sensor` działa dopiero w formacie postaci `1.26.0`. W formacie `1.21.0` gra po cichu go pomija (postać traci życie, w logu brak błędu).
- Moduł skryptów `@minecraft/server` 2.10.0 działa w grze 1.26.52. Zdarzenie uderzenia (`entityHitEntity`) działa także na postaci, która nie przyjmuje obrażeń.

## Maczuga i pierwszy przepis (2026-10-12)
- Przedmiot (format 1.26.50): `minecraft:icon`, `minecraft:display_name`, `minecraft:max_stack_size`, `minecraft:hand_equipped`. Działa od razu, 0 błędów w logu.
- Nazwa przez `minecraft:display_name` z kluczem `item.osm.maczuga_pryzmarynowa.name`, wpisanym tylko w `en_US.lang` - w polskiej grze wyświetla się poprawnie (najpewniej gra sięga po angielski plik, gdy brak klucza w polskim). Inaczej niż tytuł okna stołu, który bez `pl_PL.lang` miał „Nieznany”.
- Ikona może tymczasowo wskazywać obrazek z gry (`textures/items/prismarine_shard` w `item_texture.json`) - nie trzeba własnego pliku PNG.
- Przepisy w `main.js` to lista `PRZEPISY` (składniki rodzaj -> liczba, wynik, ile). Funkcja `znajdzPrzepis` wymaga dokładnej zgodności: te same rodzaje i te same liczby. Po dopasowaniu skrzynia jest czyszczona (`clearAll`) i dostaje wynik. Test: 4/4 (5 odłamków - maczuga; 6, 4, 5+patyk - bez zmian).
- `minecraft:damage` dodaje się do 1 pkt ciosu gracza (wpisujemy obrażenia − 1). Broń z `minecraft:durability` sama traci wytrzymałość przy uderzeniu, bez skryptu. Test obrażeń: żelazny golem (100 pkt życia) ginie od 100/obrażenia ciosów (maczuga 5 pkt - 20 ciosów).

## Ogłuszenie maczugą (2026-10-12)
- Przy ciosie maczugą z szansą 20% (`SZANSA_OGLUSZENIA`) cel dostaje spowolnienie i osłabienie na najwyższym poziomie (`amplifier: 255`) na 1 s (`CZAS_OGLUSZENIA` = 20 ticków). Każdy cios zapisuje w logu linię `[maczuga] cel=... obrazenia=... ogluszenie=tak/nie` (`console.warn` trafia do dziennika zawartości).
- Dlaczego 20% / 1 s: mob przyjmuje najwyżej ~2 ciosy na sekundę, a słabe moby giną od kilku ciosów - dłuższy czas nic im nie robi, wyższa szansa tak (zombie, 4 ciosy: 10% - 34% walk z ogłuszeniem, 20% - 59%).
- Nieudana próba: `entityHitEntity` zachodzi przy każdym kliknięciu, także gdy mob chwilowo nie przyjmuje obrażeń. Szybkie klikanie dało 61 linii przy golemie, który pada od 20 ciosów - szansa zależała od tempa klikania. Poprawka: `entityHurt` (zachodzi tylko, gdy cel stracił życie). Test: 20/20 linii z `obrazenia=5`, 5 ogłuszeń, 0 linii przy uderzaniu stołu, 0 błędów.

## Ikona maczugi (2026-10-12)
- Własne tekstury przedmiotów leżą w `dodatek/RP/textures/items/`, a w `item_texture.json` podaje się ścieżkę bez `.png` (`textures/items/maczuga_pryzmarynowa`). Gra wczytała ją od razu, 0 błędów w logu.
- Ikonę 16x16 rysuje skrypt `narzedzia/ikona_maczugi.py` (Python + Pillow): trzonek po przekątnej, ośmiokątna głowica z obrysem i cieniem, 5 kolców. Poprawki ikony - zmiana skryptu i ponowne uruchomienie.
- Maczuga w logu zadaje zombie i huskowi 4,92 pkt zamiast 5 - to ich naturalny pancerz. 7,38 pkt to cios krytyczny (w trakcie spadania po skoku, ×1,5).

## Proca (2026-10-15)
- Przedmiot `osm:proca`: `minecraft:shooter` z pustą listą amunicji + `minecraft:use_modifiers` (`use_duration` 3600 s, spowolnienie 0,35). Strzelacz z gry przyjmuje tylko amunicję ze składnikiem `minecraft:projectile`, a bruk go nie ma - dlatego gra sama nic nie wystrzeliwuje, a strzelacz służy wyłącznie do naciągania (wiki Bedrock: strzelacz da się naciągać bez amunicji, MCPE-228331).
- Strzał robi skrypt `scripts/proca.js` (podłączony w `main.js`): `itemStartUse` zapamiętuje tick, `itemReleaseUse` liczy siłę jak w łuku `(t² + 2t) / 3` (t w sekundach, pełny naciąg 1 s, poniżej 0,1 brak strzału), zabiera 1 bruk z ekwipunku, tworzy pocisk `osm:kamien_z_procy` i wystrzeliwuje go (`shoot`) z prędkością siła × 2,34. W trybie kreatywnym bez bruku i bez zużycia. Wytrzymałość 1000 zużywa skrypt (gra zużywa strzelacz tylko przy własnym strzale).
- Zasięg 2/3 łuku: symulacja lotu (grawitacja 0,05, opór 0,99 na tick, najlepszy kąt): łuk 3,0 bloku/tick - 117 bloków; 2,34 bloku/tick - 78 bloków = 2/3. Założenie „łuk = 3,0” (wartość z wersji Java) sprawdza w grze pomiar `[pomiar]` w logu.
- Obrażenia liczy gra: pocisk ma `impact_damage` skopiowane ze strzały gracza z gry (`damage` 1, `power_multiplier` 0,97) - obrażenia rosną z prędkością. Bez trafień krytycznych. Wygląd pocisku: wzór śnieżki z gry (płaski obrazek zwrócony do kamery) z teksturą bruku.
- Wzory z gry: pliki gry leżą w `data/resource_packs/vanilla/__brarchive` i `data/behavior_packs/vanilla/__brarchive`; tekst JSON da się z nich wyciągnąć skryptem (szukanie `"identifier":"minecraft:..."`).
- Przybliżenie (zasada 1): proca naciąga się także bez bruku, tylko nie strzela (łuk bez strzał się nie naciąga). Pominięte (zasada 2): obrazek procy zmieniający się w 3 krokach przy naciąganiu - patrz `todo.md`.
- Ikona: `narzedzia/ikona_procy.py` (Y z ramionami jako lustrzane odbicie względem przekątnej rączki).
- Test przepisów skryptem: `narzedzia/test_przepisow.mjs` + `narzedzia/proby_przepisow.json` - 8/8.

## Sztylet - efekty (2026-10-15)
- Obrażenia 4 (`minecraft:damage` 3), wytrzymałość 500. Rzut wymaga przytrzymania prawego przycisku, więc sztylet ma ten sam strzelacz bez amunicji co proca (+ `minecraft:use_animation` `spear` - uniesiona ręka jak przy trójzębie). Skutek uboczny: gra nie zużywa strzelacza przy ciosach, więc zużycie przy ciosie robi skrypt.
- Wspólny moduł `scripts/wspolne.js`: `czasUzycia` (ticki przytrzymania przycisku), `zuzyj` / `zuzyjWReku` (1 punkt wytrzymałości, pęknięcie z dźwiękiem), `wystrzel` (pocisk z oczu gracza w kierunku patrzenia). Proca przerobiona na ten moduł.
- Cios od tyłu (`sztylet.js`): atakujący jest za plecami, gdy leży w tylnej połowie płaszczyzny względem obrotu ciała celu (`getRotation().y`). Wtedy skrypt wywołuje `applyDamage(zadane obrażenia)` z rodzajem `override` - 4 + 4 = 8 (poprawione po teście 1, patrz niżej). Do sprawdzenia w grze: linia `[sztylet] ... zycie=` (golem 100 pkt: z przodu -4, od tyłu -8 na cios). Cios krytyczny od tyłu też jest podwojony.
- Rzut: po co najmniej 10 tickach (0,5 s) przytrzymania. Pocisk `osm:rzucony_sztylet` (wzór: rzucony trójząb z gry) ma stałe 5 pkt obrażeń, prędkość 1,06 bloku/tick = zasięg 20 bloków (ta sama symulacja co proca). Po trafieniu skrypt usuwa pocisk i upuszcza w tym miejscu zapamiętany sztylet (z wytrzymałością pomniejszoną o 1, jak trójząb). W trybie kreatywnym sztylet zostaje w ręku.
- Przybliżenie (zasada 1): rzucony sztylet nie wbija się, tylko spada jako przedmiot do podniesienia. Sztylet w locie po ponownym wczytaniu świata przepada (pamięć skryptu się zeruje).
- Obrót w locie: własna animacja `animation.osm.rzucony_sztylet.lot` - płaski obrazek zwrócony do kamery (jak `animation.actor.billboard`) obracany 3 razy na sekundę.
- Pominięte (zasada 2): szybkość ataku 2,5 na sekundę - patrz `todo.md`.
- Ikona: `narzedzia/ikona_sztyletu.py` (ostrze 3 piksele: ciemny grzbiet, stal, jasna krawędź; poprzeczka prostopadła; rączka z gałką).

## Poprawki po teście 1 - proca (2026-10-15)
- `shoot()` nadaje pociskowi prędkość ok. 1,92 raza większą niż podana: 50 strzałów z pełnym naciągiem, pomiar tick po wystrzale, od 1,90 do 1,97. Kamień leciał 4,47 zamiast 2,34, rzucony sztylet też za szybko. Poprawka: `wystrzel` dzieli prędkość przez `MNOZNIK_SHOOT` = 1,92.
- Kamień był widoczny, leciał i zużywał bruk, ale w logu 0 zranień moba w 62 strzałach. Przyczyna nieznana. Diagnoza: kamień nie znika już sam przy trafieniu (`stick_in_ground` zamiast `remove_on_hit`), tylko usuwa go skrypt po wpisie `[proca] trafienie=mob/blok` - log pokaże, czy kamień w ogóle trafia moby.
- Brak pomiaru łuku (0 linii `[pomiar] minecraft:arrow`) - założenie „łuk = 3,0” wciąż niesprawdzone.

## Poprawki po teście 1 - sztylet (2026-10-15)
- Tył rozpoznawany dobrze (potwierdzone w grze), ale golem tracił 12 na cios od tyłu (9/9 ciosów: 88, 76 … 4, 0). `applyDamage` działa mimo chwilowej nietykalności celu - założenie „gra zadaje tylko różnicę” było błędne. Poprawka: dodatkowo `applyDamage(zadane obrażenia)`, czyli 4 + 4 = 8.
- Wpis `[sztylet] trafienie=mob/blok` przy każdym trafieniu rzuconego sztyletu.

## Wyniki testu po poprawkach 1 (log 2026-10-15, po 17:57)
- Prędkość kamienia z procy po dzieleniu przez 1,92: 16/16 pomiarów od 2,31 do 2,35 (cel 2,34).
- Sztylet od tyłu: −8 na cios (szkielet 20 → 12 → 4 → 0, zombie −7,87 przez naturalny pancerz).
- Kamień trafia moby (7 wpisów `[proca] trafienie=minecraft:zombie`), ale 0 wpisów o zranieniu. Pola `impact_damage` są takie jak w strzale gracza z gry (`minecraft:player_arrow`: `damage` 1, `power_multiplier` 0,97). Przyczyna nadal nieznana (`todo.md`). Rzucony sztylet trafił zombie 3 razy - log nie mówi, czy zranił.
- Łuk: nadal 0 pomiarów `[pomiar] minecraft:arrow`.

## Granat (2026-10-19)
- Przedmiot `osm:granat` bez komponentów użycia (stos 16 jak śnieżka). Rzut robi skrypt `scripts/granat.js` przy zdarzeniu `itemUse`: pocisk `osm:rzucony_granat` z prędkością 1,06 (zasięg 20 bloków, ta sama symulacja i grawitacja 0,05 co rzucony sztylet). W trybie przetrwania ubywa 1 granat ze stosu.
- Pocisk nie ma `impact_damage` - całe obrażenia liczy skrypt. Przy trafieniu (moba albo bloku) skrypt usuwa granat i robi wybuch: `getEntities` w promieniu 7 bloków (zapas, bo wyszukiwanie mierzy do stóp), potem odległość do najbliższego punktu ciała (pionowy odcinek od stóp do głowy). Obrażenia `50 × (1 − d / 5)` przez `applyDamage` z rodzajem `entityExplosion`, przypisane rzucającemu. Pomijane: gracze, leżące przedmioty, kulki doświadczenia i postacie bez życia. Bloki nietknięte, bo nie ma wybuchu z gry.
- Wygląd wybuchu z cząsteczek gry (nazwy odczytane z `particles.brarchive`): błysk `minecraft:large_explosion` ×1, dym `minecraft:basic_smoke_particle` ×10, czerwone iskry `minecraft:redstone_torch_dust_particle` ×15. Dźwięk `random.break` (pęknięcie narzędzia).
- Przybliżenie (zasada 1): pancerz moba zmniejsza obrażenia (rodzaj obrażeń wybuchowych), więc zombie dostanie trochę mniej niż 50 × (1 − d / 5).
- Nazwy funkcji sprawdzone skryptem na typach `@minecraft/server` 2.10.0 (paczka npm w brudnopisie, poza repo).
- Ikona: `narzedzia/ikona_granatu.py` (kula o średnicy 11 pikseli z obrysem i cieniem, czerwony pasek, połysk, zawleczka, lont z iskrą).
