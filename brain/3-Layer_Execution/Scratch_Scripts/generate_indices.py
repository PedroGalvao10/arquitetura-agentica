import os

dir_path = r"C:\Users\soare\.gemini\antigravity\Duplicado\execution"
files = [os.path.join(dir_path, f) for f in os.listdir(dir_path) if f.endswith('.md')]
files.sort()

ascii_list_path = r"C:\Users\soare\.gemini\antigravity\Duplicado\skill_list_ascii.txt"
full_list_path = r"C:\Users\soare\.gemini\antigravity\Duplicado\skill_list_full.txt"

with open(ascii_list_path, 'w', encoding='utf-8') as f:
    for file in files:
        f.write(file + '\n')

with open(full_list_path, 'w', encoding='utf-8') as f:
    for file in files:
        f.write(file + '\n')

print(f"Indices updated with {len(files)} files.")
