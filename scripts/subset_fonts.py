"""Subset the local original WOFF2 files to the site's characters.

Requires: python -m pip install fonttools brotli
The original fonts stay in the Git-ignored .local-src/fonts directory.
"""
from html import unescape
from pathlib import Path
import re
import json
from urllib.request import urlopen
from fontTools import subset

ROOT = Path(__file__).resolve().parent.parent
originals = ROOT / ".local-src/fonts"
originals.mkdir(parents=True, exist_ok=True)
# A fresh clone can recover the same original fonts without shipping them.
sources = json.loads((ROOT / "scripts/font-sources.json").read_text())
for name, url in sources.items():
    if not (originals / name).exists():
        (originals / name).write_bytes(urlopen(url, timeout=30).read())
pages = [ROOT / "index.html", ROOT / "blog.html", *sorted((ROOT / "posts").glob("*.html"))]
texts = []
for page in pages:
    html = page.read_text(encoding="utf-8")
    html = re.sub(r"<(script|style)\b[^>]*>.*?</\1>", "", html, flags=re.S)
    texts.append(unescape(re.sub(r"<[^>]+>", "", html)))
# CSS-generated labels and JS counters, plus printable ASCII for future text.
css = (ROOT / ".local-src/site.css").read_text(encoding="utf-8")
texts.extend(re.findall(r'content:\s*["\'](.*?)["\']', css))
characters = set("".join(texts)) | {chr(i) for i in range(32, 127)} | set("\u00a0\ufffd")
total_before = total_after = 0
for original in sorted(originals.glob("*-latin.woff2")):
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = ["*"]
    font = subset.load_font(str(original), options)
    worker = subset.Subsetter(options=options)
    worker.populate(unicodes={ord(c) for c in characters})
    worker.subset(font)
    # IBM's license reserves "Plex". Give modified subsets distinct internal
    # names; CSS aliases still select exactly the same glyphs and metrics.
    if original.name.startswith("ibm-plex-"):
        for record in font["name"].names:
            if record.nameID in {1, 3, 4, 6, 16, 21, 25}:
                name = record.toUnicode()
                name = name.replace("IBM Plex Sans", "NN Sans").replace("IBMPlexSans", "NNSans")
                name = name.replace("IBM Plex Mono", "NN Mono").replace("IBMPlexMono", "NNMono")
                record.string = name.encode(record.getEncoding())
    target = ROOT / "assets/fonts" / original.name
    subset.save_font(font, str(target), options)
    total_before += original.stat().st_size
    total_after += target.stat().st_size
    print(f"{original.name}: {original.stat().st_size:,} -> {target.stat().st_size:,} bytes")
print(f"Main fonts: {total_before:,} -> {total_after:,} bytes")
