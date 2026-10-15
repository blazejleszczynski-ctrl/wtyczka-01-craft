# zlecenie.md

Zlecenie dla agenta na pracę samodzielną (one-shot), ustalone z użytkownikiem 2026-10-15. Agent dokańcza dodatek bez pytania użytkownika, a użytkownik jest testerem.

Jak używać: agent czyta ten plik na starcie i wraca do niego, gdy nie wie, co dalej. Zmiany w zleceniu ustala tylko użytkownik.

## Start
- Przeczytaj w całości: `plan.md`, `przepisy.md`, `notes.md`, `progress.md`, `todo.md`, `dodatek/BP/scripts/main.js`.
- Stan przed startem jest oznaczony tagiem git `przed-one-shot` (powrót: `git reset --hard przed-one-shot`).
- Gra i log: patrz `plan.md`, sekcja „Jeden komputer”. Log gry czytasz sam z `%AppData%\Minecraft Bedrock\logs\ContentLog*.txt`.

## Zawieszone zasady z CLAUDE.md
Na czas tego zlecenia NIE pytasz o zgodę przed zmianą plików, poleceniami w terminalu, commitem ani pushem.
Nadal obowiązuje: osobny commit na przedmiot, komentarz na początku pliku i krótkie komentarze w kodzie, wpisy w `notes.md` i `progress.md`, opis commita bez stopki „Co-Authored-By”, bez sztucznego łamania wierszy, bez zbędnych bibliotek, jedna funkcja z parametrami zamiast kilku różniących się danymi, sprawdzanie skryptem wszystkich przypadków.

## Kolejność (7 punktów)
1. Proca (plan pierwszego commita: `progress.md`, wpis 2026-10-12 sesja 5; potem naciąganie i strzelanie brukiem).
2. Sztylet - efekty (atak od tyłu, szybkość ataku, rzut) i ikona.
3. Granat.
4. Strzała wybuchowa.
5. Artefakt (miecz z trucizną i atakiem specjalnym).
6. Artefakt 2 (okulary, tylko ikona; paski życia nad mobami).
7. Etap 1b: okno stołu 27 pól i polska nazwa stołu (`pl_PL.lang`).

Opis, liczby i wygląd każdego przedmiotu: `przepisy.md`.

## Zasady samodzielnych decyzji (3)
1. Gra nie pozwala zrobić czegoś dokładnie - zrób najbliższe przybliżenie i zapisz różnicę w `notes.md`.
2. Czegoś nie da się zrobić wcale - pomiń tę część efektu, zapisz w `todo.md` i idź dalej.
3. Nie zmieniaj liczb ani składników z `przepisy.md`. Wyjątek: dwa przepisy w praktyce się gryzą - zapisz problem w `todo.md`.

## Kiedy przedmiot jest gotowy (6 warunków)
1. Przepis działa w stole (logika sprawdzona skryptem, w grze sprawdza użytkownik).
2. Efekty zrobione według `przepisy.md` (z wyjątkami z zasad 1-2).
3. Ikona 16×16 narysowana skryptem w `narzedzia/` (wzór: `narzedzia/ikona_maczugi.py`).
4. 0 błędów w logu gry po ostatnim wczytaniu świata przez użytkownika.
5. Lista prób w `testy.md`, wpisy w `notes.md` i `progress.md`, status w `przepisy.md` zmieniony na „w grze”.
6. Osobny commit na przedmiot i push na GitHub.

## Rytm testów
Po każdych 2 punktach z kolejności (1-2, 3-4, 5-6, 7) agent kończy pracę i pisze „gotowe do testu”. Użytkownik testuje w grze, wpisuje wyniki do `testy.md` i pisze „dalej”. Agent zaczyna od przeczytania wyników i logu gry, poprawia błędy, potem idzie do następnej pary.
