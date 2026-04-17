
import os
import shutil
import json
import re

def update_skill_lists(base_path):
    directives_path = os.path.join(base_path, 'directives')
    full_list_path = os.path.join(base_path, 'skill_list_full.txt')
    ascii_list_path = os.path.join(base_path, 'skill_list_ascii.txt')
    
    if not os.path.exists(directives_path):
        return
        
    all_files = []
    for root, dirs, files in os.walk(directives_path):
        for file in files:
            all_files.append(os.path.join(root, file))
    
    all_files.sort()
    
    with open(full_list_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(all_files))
        
    with open(ascii_list_path, 'w', encoding='ascii', errors='replace') as f:
        f.write('\n'.join(all_files))

def import_skills():
    # Adjusted source paths
    root_source = r"C:\Users\soare\Downloads\skills\skills"
    skills_source_dir = os.path.join(root_source, "skills")
    index_source_path = os.path.join(root_source, "skills_index_lite.txt")
    
    targets = [
        r"c:\Users\soare\.gemini\antigravity\scratch",
        r"c:\Users\soare\.gemini\antigravity\Duplicado"
    ]
    
    new_skills = []
    if os.path.exists(index_source_path):
        with open(index_source_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#'):
                    match = re.match(r'^\[(.*?)\]:\s*(.*)$', line)
                    if match:
                        skill_id = match.group(1).strip()
                        desc = match.group(2).strip()
                        new_skills.append((skill_id, desc))
    
    print(f"Encontradas {len(new_skills)} skills no índice.")
    
    for target_base in targets:
        print(f"\nProcessando destino: {target_base}")
        target_dir = os.path.join(target_base, "directives")
        index_file = os.path.join(target_base, "skills_index.txt")
        
        if not os.path.exists(target_dir):
            os.makedirs(target_dir)
            
        existing = set(os.listdir(target_dir))
        
        imported_count = 0
        new_entries = []
        
        for skill_id, desc in new_skills:
            if skill_id not in existing:
                src_path = os.path.join(skills_source_dir, skill_id)
                dst_path = os.path.join(target_dir, skill_id)
                
                if os.path.exists(src_path):
                    try:
                        if os.path.isdir(src_path):
                            shutil.copytree(src_path, dst_path)
                        else:
                            shutil.copy2(src_path, dst_path)
                        
                        new_entries.append(f"- {skill_id}: {desc}")
                        imported_count += 1
                    except Exception as e:
                        print(f"Erro ao copiar {skill_id}: {e}")
            
        print(f"Importadas {imported_count} novas skills para {target_base}.")
        
        if new_entries:
            with open(index_file, 'a', encoding='utf-8') as f:
                f.write(f"\n\n### CATEGORIA: IMPORTADAS DOS DOWNLOADS ({len(new_entries)} items)\n")
                f.write('\n'.join(new_entries))
                f.write('\n')
        
        update_skill_lists(target_base)
        print(f"Listas de arquivos atualizadas para {target_base}.")

if __name__ == "__main__":
    import_skills()
