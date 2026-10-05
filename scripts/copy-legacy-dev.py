from pathlib import Path
import re, shutil, json
source=Path('.legacy-source')
paths=["chitransh-color-lab.html","fashion-flavour-didwana.html","madan-mohan-resort.html","anchor-harshita-shekhawat.html","rajasthan/didwana-kuchaman/didwana/photographers-films/chitransh-color-lab/index.html","rajasthan/didwana-kuchaman/didwana/wedding-rental-dresses/fashion-flavour/index.html","rajasthan/didwana-kuchaman/didwana/wedding-venues/madan-mohan-resort/index.html","fashion-flavour-01.webp","fashion-flavour-02.webp","fashion-flavour-03.webp","fashion-flavour-04.webp","fashion-flavour-05.webp","madan_mohan_05.webp","AAAA.mp4","madan_mohan_06.webp","madan_mohan_04.webp","madan_mohan_01.webp","madan_mohan_02.webp","madan_mohan_03.webp","madan_mohan_07.webp","madan_mohan_08.webp","madan_mohan_09.webp","harshita-06.webp","harshita-01.webp","harshita-02.webp","harshita-03.webp","harshita-04.webp","harshita-05.webp","harshita-07.webp","harshita-08.webp","hosting-01-poster.webp","hosting-01.mp4","hosting-02-poster.webp","hosting-02.mp4","hosting-03-poster.webp","hosting-03.mp4","hosting-04-poster.webp","hosting-04.mp4","hosting-05-poster.webp","hosting-05.mp4","hosting-06-poster.webp","hosting-06.mp4","hosting-07-poster.webp","hosting-07.mp4","hosting-08-poster.webp","hosting-08.mp4","hosting-09-poster.webp","hosting-09.mp4"]
html_paths=set(["chitransh-color-lab.html","fashion-flavour-didwana.html","madan-mohan-resort.html","anchor-harshita-shekhawat.html","rajasthan/didwana-kuchaman/didwana/photographers-films/chitransh-color-lab/index.html","rajasthan/didwana-kuchaman/didwana/wedding-rental-dresses/fashion-flavour/index.html","rajasthan/didwana-kuchaman/didwana/wedding-venues/madan-mohan-resort/index.html"])
base='https://chitranshcolorlab.github.io/rajasthan-wedding-guide-dev'
report=[]
for name in paths:
    src=source/name
    if not src.is_file(): raise RuntimeError('Missing pinned legacy asset: '+name)
    dst=Path(name)
    dst.parent.mkdir(parents=True,exist_ok=True)
    if name in html_paths:
        text=src.read_text()
        text=text.replace('https://rajasthanweddingguide.com',base)
        text=re.sub(r'((?:href|src|poster)=["\'])/(?!/)',r'\1/rajasthan-wedding-guide-dev/',text)
        text=text.replace('location.replace("/rajasthan/', 'location.replace("/rajasthan-wedding-guide-dev/rajasthan/')
        text=re.sub(r'<meta[^>]*name=["\']robots["\'][^>]*>', '', text, flags=re.I)
        text=re.sub(r'(<head[^>]*>)',r'\1<meta name="robots" content="noindex,nofollow">',text,count=1,flags=re.I)
        dst.write_text(text)
    else: shutil.copyfile(src,dst)
    report.append({'path':name,'bytes':dst.stat().st_size})
Path('qa/legacy-copy-manifest.json').write_text(json.dumps({'productionSourceCommit':'75e87651d36d41ce7f53d7158e0a10e99f162eae','scope':'DEV copy only','files':report},indent=2)+'\n')
print('Copied',len(report),'pinned legacy files into DEV; production unchanged')
