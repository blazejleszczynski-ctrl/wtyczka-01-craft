# Rysuje ikonę granatu 16x16 (ciemnoszara kula z zawleczką, lontem z iskrą i czerwonym paskiem) i powiększenie 256x256.
# Użycie: python narzedzia/ikona_granatu.py dodatek/RP/textures/items/granat.png podglad.png
import sys
from PIL import Image

wyjscie, podglad = sys.argv[1], sys.argv[2]
K = (25, 25, 30, 255)     # obrys
M = (70, 72, 78, 255)     # metal kuli
C = (50, 52, 58, 255)     # cień kuli (prawy dół)
L = (150, 155, 165, 255)  # połysk
Z = (200, 205, 210, 255)  # zawleczka z jasnego żelaza
R = (190, 30, 30, 255)    # czerwony pasek i lont
I = (255, 230, 90, 255)   # iskra

img = Image.new("RGBA", (16, 16), (0, 0, 0, 0))
px = img.load()

# Kula: środek (7.5, 9.5), promień 5.5 (11 pikseli średnicy - trochę więcej niż śnieżka); obrys na brzegu, cień w prawym dolnym rogu
for x in range(16):
    for y in range(16):
        d = ((x - 7.5) ** 2 + (y - 9.5) ** 2) ** 0.5
        if d <= 4.6:
            px[x, y] = C if (x - 7.5) + (y - 9.5) > 3 else M
        elif d <= 5.6:
            px[x, y] = K

# Czerwony pasek na boku: poziomo przez środek kuli (tylko wnętrze, bez obrysu)
for x in range(16):
    if px[x, 10] in (M, C):
        px[x, 10] = R

# Połysk w lewym górnym rogu
for p in [(5, 7), (6, 7), (5, 8)]:
    px[p] = L

# Szyjka z zawleczką: jasne żelazo nad kulą, kółko zawleczki z lewej
for p in [(7, 3), (8, 3), (5, 2), (6, 2), (5, 1)]:
    px[p] = Z

# Lont: czerwony, w górę w prawo; iskra na końcu
for p in [(9, 2), (10, 1)]:
    px[p] = R
px[11, 0] = I
px[12, 1] = I

img.save(wyjscie)
img.resize((256, 256), Image.NEAREST).save(podglad)

# Sprawdzenie: rozmiar, liczba pikseli rysunku, przezroczystość tła
spr = Image.open(wyjscie)
widoczne = sum(1 for a in spr.getchannel("A").getdata() if a > 0)
print("rozmiar:", spr.size, "tryb:", spr.mode, "pikseli rysunku:", widoczne, "przezroczystych:", 256 - widoczne)
