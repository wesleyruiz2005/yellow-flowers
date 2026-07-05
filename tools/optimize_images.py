"""
Convierte las imágenes de assets/images/ a formato AVIF para reducir su peso.

Uso (desde la raíz del proyecto):
    py tools/optimize_images.py

Requiere Pillow con soporte AVIF (Pillow >= 11.3 o pillow-avif-plugin).
"""

import os
from PIL import Image

CARPETA = "assets/images"
EXTENSIONES = (".png", ".jpg", ".jpeg")
CALIDAD = 60  # 0-100. 50-65 suele ser buen equilibrio calidad/peso.


def convertir():
    total_antes = 0
    total_despues = 0

    for nombre in sorted(os.listdir(CARPETA)):
        if not nombre.lower().endswith(EXTENSIONES):
            continue

        origen = os.path.join(CARPETA, nombre)
        base, _ = os.path.splitext(nombre)
        destino = os.path.join(CARPETA, base + ".avif")

        with Image.open(origen) as img:
            img.save(destino, format="AVIF", quality=CALIDAD)

        antes = os.path.getsize(origen)
        despues = os.path.getsize(destino)
        total_antes += antes
        total_despues += despues

        print(f"{nombre:>8}  {antes/1024:8.1f} KB  ->  "
              f"{base + '.avif':>8}  {despues/1024:8.1f} KB  "
              f"({100 * despues / antes:.0f}%)")

    if total_antes:
        print("-" * 60)
        print(f"Total: {total_antes/1024/1024:.2f} MB  ->  "
              f"{total_despues/1024/1024:.2f} MB  "
              f"({100 * total_despues / total_antes:.0f}%)")


if __name__ == "__main__":
    convertir()
