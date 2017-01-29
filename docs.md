# Arhitektura

## Platno (jedinstvenik)

Platno vodi računa o veličini ekrana. Podrazumevano je to veličina scene.

## Scena (klasa)

Kada dodamo predmet sceni, Scena na njemu poziva sledeće metode:
* proveriGranice()
* update()
* render()
Animaciju scene zaustavljamo na stop(), što zaleđuje animaciju. Čitavu scenu okončavamo na end().
