import urllib.request
import re

req = urllib.request.Request('https://tenor.com/search/dancing-dog-gifs', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')
urls = re.findall(r'https://media\.tenor\.com/[^\"\'\s]+\.gif', html)

urls = list(set(urls))[:3]
for i, url in enumerate(urls):
    urllib.request.urlretrieve(url, f'w:/PROJECT/PAGE/BeginPlayGames.github.io/assets/dog{i+1}.gif')

print(f'Downloaded {len(urls)} gifs')
