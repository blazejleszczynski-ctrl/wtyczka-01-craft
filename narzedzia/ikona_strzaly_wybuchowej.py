# Rysuje ikonę strzały wybuchowej 16x16 (zwykła strzała ukośnie, szare punkciki prochu na trzonku, zamiast grotu kulka z prochu z lontem i iskrą) i powiększenie 256x256.
# Użycie: python narzedzia/ikona_strzaly_wybuchowej.py dodatek/RP/textures/items/strzala_wybuchowa.png podglad.png
import sys
from PIL import Image

wyjscie, podglad = sys.argv[1], sys.argv[2]
B = (122, 82, 48, 255)    # drewniany trzonek
b = (74, 47, 24, 255)     # cień trzonka
G = (110, 110, 115, 255)  # proch na trzonku
P = (235, 235, 235, 255)  # pióra
p = (180, 180, 180, 255)  # cień piór
K = (35, 35, 40, 255)     # obrys kulki
S = (75, 75, 82, 255)     # kulka z prochu (ciemnoszara)
R = (190, 30, 30, 255)    # czerwony lont
I = (255, 230, 90, 255)   # jasnożółta iskra

img = Image.new("RGBA", (16, 16), (0, 0, 0, 0))
px = img.load()

# Trzonek po przekątnej od piór (3,12) do kulki (10,5), cień pod spodem
for x in range(3, 11):
    px[x, 15 - x] = B
    px[x + 1, 15 - x] = b

# Proch na trzonku: kilka szarych punkcików
for p_ in [(6, 9), (8, 7)]:
    px[p_] = G

# Pióra z tyłu: dwa rzędy po bokach trzonka
for p_ in [(1, 12), (2, 11), (2, 13), (3, 14)]:
    px[p_] = P
for p_ in [(1, 13), (1, 14), (2, 14)]:
    px[p_] = p

# Kulka z prochu zamiast grotu: środek (11,4), obrys dookoła
for x in range(9, 14):
    for y in range(2, 7):
        d = ((x - 11) ** 2 + (y - 4) ** 2) ** 0.5
        if d <= 1.2:
            px[x, y] = S
        elif d <= 2.3:
            px[x, y] = K

# Lont w prawo w górę i iskra na końcu
px[13, 1] = R
px[14, 0] = I
px[15, 1] = I

img.save(wyjscie)
img.resize((256, 256), Image.NEAREST).save(podglad)

# Sprawdzenie: rozmiar, liczba pikseli rysunku, przezroczystość tła
spr = Image.open(wyjscie)
widoczne = sum(1 for a in spr.getchannel("A").getdata() if a > 0)
print("rozmiar:", spr.size, "tryb:", spr.mode, "pikseli rysunku:", widoczne, "przezroczystych:", 256 - widoczne)
