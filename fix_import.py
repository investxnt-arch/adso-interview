with open('app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace("@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap');", "")
with open('app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')
