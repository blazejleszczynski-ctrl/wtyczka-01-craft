# notes.md

Szczegółowe wyjaśnienia napisanych funkcji, podjętych decyzji oraz udanych i nieudanych prób.

Jak używać: po napisaniu i przetestowaniu większej części kodu dopisujemy sekcję: co zrobiliśmy, dlaczego tak, co nie zadziałało.

## Dodatek Bedrock - budowa (2026-10-11)
- Dwie paczki: BP (zachowanie: bloki, przedmioty, przepisy) i RP (wygląd: tekstury, nazwy). BP w `manifest.json` ma zależność od UUID nagłówka RP, więc gra włącza RP razem z BP.
- Przedrostek nazw: `osm`. Stół: `osm:stol`, tag przepisów: `osm_stol` (przepis z `"tags": ["osm_stol"]` działa tylko na naszym stole).
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
