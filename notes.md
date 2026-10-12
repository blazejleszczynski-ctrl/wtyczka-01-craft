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
