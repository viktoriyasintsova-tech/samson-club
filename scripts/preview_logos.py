"""Render both logos on the two backgrounds they will appear on so we can
visually verify colours and transparency."""
from PIL import Image

ROOT = "/Users/viktoriakomarova/Desktop/Сайт дзюдо/public/assets"
OUT = "/tmp"


def compose(path, bg_rgb, out_name):
    fg = Image.open(path).convert("RGBA")
    bg = Image.new("RGB", fg.size, bg_rgb)
    bg.paste(fg, mask=fg.split()[3])
    bg.save(f"{OUT}/{out_name}", quality=92)
    print(f"{out_name} written on bg={bg_rgb}")


compose(f"{ROOT}/logo.png", (5, 6, 14), "preview-logo-on-dark.png")
compose(f"{ROOT}/logo-dark.png", (244, 244, 242), "preview-logo-on-light.png")
