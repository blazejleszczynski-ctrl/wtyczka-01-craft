# przepisy.md

Przepisy i efekty przedmiotów ze Stołu wojownika. Stół działa jak skrzynia 9x3: układasz składniki i uderzasz stół, żeby wykraftować przedmiot. Liczy się, co leży w skrzyni (rodzaj i liczba), a nie gdzie. Siatka 5×5 to ilustracja przepisu, nie wymóg ułożenia.

Jak używać:
- Każdy przedmiot ma osobny blok `## Nazwa` z tymi samymi polami.
- Siatka to zawsze 5 wierszy po 5 pól, pola oddzielone spacją, `.` = puste pole. Każdy przepis musi mieć inny zestaw składników niż pozostałe (rodzaj i liczba).
- Znaki w siatce muszą być w legendzie. Po 9 kolejne składniki dostają litery A, B, C…
- `?` = jeszcze nie ustalone.
- Status: pomysł / ustalony / w grze.

## Legenda składników

| Znak | Składnik          | Nazwa w grze                                              |
|------|-------------------|-----------------------------------------------------------|
| 1    | patyk             | minecraft:stick                                           |
| 2    | żelazo            | minecraft:iron_ingot                                      |
| 3    | kula ognia        | minecraft:fire_charge                                     |
| 4    | zielony barwnik   | minecraft:green_dye                                       |
| 5    | strzała           | minecraft:arrow                                           |
| 6    | proch strzelniczy | minecraft:gunpowder                                       |
| 7    | pryzmaryn         | minecraft:prismarine_shard (odłamek)                      |
| 8    | szkło             | minecraft:glass                                           |
| 9    | nić               | minecraft:string                                          |

## Artefakt 2
- id: osm:artefakt_2
- rodzaj: ubiór na głowę
- ile sztuk daje przepis: ?
- przepis:
```
. 1 . 1 .
1 8 1 8 1
. 1 . 1 .
. . . . .
. . . . .
```
- efekt: pokazuje nad mobami nazwę moba, pasek życia z kresek i efekty, które mają na sobie (np. trucizna)
- liczby: działa cały czas, nie zużywa się
- wygląd: ? (na szkicu przypomina okulary)
- uwaga: wyświetlanie pasków wymaga skryptu JavaScript, do sprawdzenia w dokumentacji
- status: pomysł

## Granat
- id: osm:granat
- rodzaj: broń rzucana
- ile sztuk daje przepis: 4
- przepis:
```
. . 2 . .
. . 6 . .
2 6 3 6 2
. . 6 . .
. . 2 . .
```
- efekt: rzucany granat wybucha od razu po trafieniu (w moba, blok lub ziemię), leci maksymalnie 20 bloków. Rani tylko moby, nie niszczy bloków. Moby w promieniu 5 bloków od wybuchu tracą życie, im bliżej, tym więcej. Wygląd wybuchu: błysk, trochę dymu i czerwone cząsteczki. Dźwięk: jak pękające narzędzie (dźwięk zniszczenia narzędzia w grze).
- liczby: zasięg rzutu 20 bloków, promień wybuchu 5 bloków, maksymalne obrażenia 25 serduszek (50 pkt) dla moba stojącego na granacie; spadek obrażeń z odległością: liniowo do 0 na krawędzi promienia (założenie do potwierdzenia)
- wygląd: okrągła ciemnoszara metalowa kula, trochę większa niż śnieżka. Na górze mała zawleczka z jasnego żelaza i czerwony lont z iskrą, na boku czerwony pasek, w lewym górnym rogu jasny połysk. Rysunek 16×16 - do zrobienia.
- uwaga: rzut, wybuch bez niszczenia bloków i obrażenia zależne od odległości wymagają skryptu JavaScript, do sprawdzenia w dokumentacji.
- status: pomysł

## Proca
- id: osm:proca
- rodzaj: broń dystansowa
- ile sztuk daje przepis: 1
- przepis:
```
. . . . .
. 1 9 1 .
. . 1 . .
. . 1 . .
. . . . .
```
- efekt: strzela brukiem. Trzeba naciągać (przytrzymać prawy przycisk) jak w łuku. Obrażenia zależą od prędkości pocisku, tak jak przy strzale z łuku. Zużywa amunicję (bruk).
- liczby: zasięg o jedną trzecią krótszy niż łuk (czyli 2/3 zasięgu łuku); wytrzymałość 1000; amunicja: bruk (minecraft:cobblestone)
- wygląd: brązowa drewniana litera Y ustawiona ukośnie (rączka w dolnym lewym rogu, rozwidlenie w prawym górnym). Między końcami rozwidlenia dwie jasne linie z nici, pośrodku szara kieszeń na kamień. Przy naciąganiu obrazek zmienia się w trzech krokach: nić coraz bardziej rozciągnięta, w kieszeni widać szary bruk. Rysunek 16×16 - do zrobienia.
- uwaga: pocisk-kamień z własną prędkością i obrażeniami może wymagać skryptu JavaScript, do sprawdzenia w dokumentacji.
- status: pomysł

## Sztylet
- id: osm:sztylet
- rodzaj: broń wręcz
- ile sztuk daje przepis: 1
- przepis:
```
. . . . .
. . . . .
. . 2 . .
. . 1 . .
. . . . .
```
- efekt: krótka broń. Uderzenie z przodu zadaje 4 pkt, uderzenie od tyłu 8 pkt. Atakuje szybciej niż miecz. Można nim rzucać: trzeba się przymierzyć (przytrzymać prawy przycisk), trwa to tyle co naciąg kuszy z szybkim ładowaniem III (ok. 0,5 s).
- liczby: obrażenia 4 pkt (2 serduszka), od tyłu 8 pkt (4 serduszka); wytrzymałość 500; czas przymierzania do rzutu ok. 0,5 s; szybkość ataku 2,5 uderzenia na sekundę (miecz ok. 1,7; obniżone z 3, żeby sztylet w ręku zadawał ok. 10 pkt na sekundę, tyle co żelazny miecz); rzucony: 5 pkt, zasięg 20 bloków, po rzucie wbija się i można go podnieść jak trójząb
- wygląd: krótkie ostrze ze stalowo-szarych pikseli, ukośnie jak miecz w ekwipunku, ok. 2/3 długości miecza; jaśniejsza krawędź tnąca, ciemniejszy grzbiet; prosta rączka z brązowego drewna, przy ostrzu mała poprzeczka. W rzucie obraca się w powietrzu. Rysunek 16×16 - do zrobienia.
- uwaga: atak od tyłu, rzut i szybkość ataku mogą wymagać skryptu JavaScript, do sprawdzenia w dokumentacji.
- status: pomysł

## Artefakt
- id: osm:artefakt
- rodzaj: ?
- ile sztuk daje przepis: ?
- przepis:
```
. . 4 . .
. 3 2 3 .
. . 2 . .
. 2 1 2 .
. . 1 . .
```
- efekt: miecz. Zwykły atak: 5% szans, że trafiony mob dostanie truciznę na 5 s. Atak specjalny (prawy przycisk myszy): gracz leci 3 bloki do przodu; jeśli trafi moba, ten dostaje truciznę II na 15 s; wszystkie moby w promieniu 5 bloków tracą 7,5 serduszka, a te trafione rykoszetem (inne niż bezpośrednio trafiony) dostają truciznę I na 5 s. Środek promienia: trafiony mob, a gdy gracz nikogo nie trafi - miejsce lądowania. Do ataku specjalnego błysk i zielone cząsteczki.
- liczby: obrażenia jak żelazny miecz (6 pkt); szansa na truciznę 5%, trucizna 5 s; atak specjalny: przerwa 30 s, lot 3 bloki, promień 5 bloków, 7,5 serduszka (15 pkt), trucizna II 15 s (trafiony mob), trucizna I 5 s (rykoszet); wytrzymałość 1561 (jak diamentowy miecz)
- wygląd: miecz zielony od trucizny (rysunek 16×16 - do zrobienia)
- uwaga: lot, przerwa 30 s, obrażenia obszarowe i cząsteczki wymagają skryptu JavaScript, do sprawdzenia w dokumentacji.
- status: pomysł

## Strzała wybuchowa
- id: osm:strzala_wybuchowa
- rodzaj: amunicja
- ile sztuk daje przepis: 2
- przepis:
```
. . 6 . .
. . 6 . .
6 6 5 6 6
. . 6 . .
. . 6 . .
```
- efekt: strzała, która po trafieniu wybucha z siłą o jedną trzecią niższą niż TNT. Leci tak samo jak zwykła strzała (strzela się z łuku). Wybuch niszczy bloki i rani wszystkich (moby, graczy, także strzelającego), tak samo jak TNT.
- liczby: siła wybuchu ok. 2,67 (TNT ma 4, czyli 2/3 tej wartości); obrażenia i promień wynikają z siły wybuchu
- wygląd: zwykła strzała ukośnie (drewniany trzonek, pióra z tyłu), ale grot bardziej szary, a na trzonku kilka szarych punkcików (proch). Zamiast zwykłego grotu mała ciemnoszara kulka z prochu z czerwonym lontem i jasnożółtą iskrą. Rysunek 16×16 - do zrobienia. Opcjonalnie (skrypt): w locie smuga czerwonych iskier.
- uwaga: strzała z własnym wybuchem po trafieniu może wymagać skryptu JavaScript, do sprawdzenia w dokumentacji.
- status: pomysł

## Maczuga z pryzmarynu
- id: osm:maczuga_pryzmarynowa
- rodzaj: broń wręcz
- ile sztuk daje przepis: 1
- przepis:
```
. . . . 7
. . . 7 .
. . 7 . .
. 7 . . .
7 . . . .
```
- efekt: broń wręcz. Zadaje 5 pkt obrażeń, a trafiony mob ma 10% szans na ogłuszenie na 1 sekundę (nie może się ruszać ani atakować).
- liczby: obrażenia 5 pkt (2,5 serduszka); szansa na ogłuszenie 10%, czas 1 s; wytrzymałość 800
- wygląd: ukośna maczuga. Dolny koniec to cienka ciemnozielona rączka, górny to gruba ciężka głowica z kilku turkusowych odłamków pryzmarynu połączonych jak kryształ, z jasnymi niebieskawymi krawędziami dającymi połysk. Rysunek 16×16 - do zrobienia.
- uwaga: ogłuszenie można zrobić bez skryptu efektami gry (np. bardzo silne spowolnienie), do sprawdzenia w dokumentacji; losowanie szansy 10% najpewniej wymaga skryptu JavaScript.
- status: pomysł
