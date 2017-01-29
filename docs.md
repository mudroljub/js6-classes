# Arhitektura

## Core (klase)

### Scena

Kada dodamo predmet sceni, Scena na njemu poziva sledeće metode:
* proveriGranice()
* update()
* render()
Animaciju scene zaustavljamo na stop(), što zaleđuje animaciju. Čitavu scenu okončavamo na end().

## Input/Output (singletoni)

### platno

Platno vodi računa o veličini ekrana. Podrazumevano je to veličina scene.

### mish

Mish vodi računa o svemu što se tiče kursora, njegovoj poziciji, izgledu, itd.
