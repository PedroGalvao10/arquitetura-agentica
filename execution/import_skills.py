
import os
import re
import shutil

def sanitize_content(content):
    # Substituições básicas para conformidade com o agente local
    # Mantendo a regra de entregar respostas em pt-BR (já que as skills parecem estar em pt-BR)
    
    # Substituindo Claude por Antigravity
    content = re.sub(r'\bClaude\b', 'Antigravity', content, flags=re.IGNORECASE)
    content = re.sub(r'\bClaude Code\b', 'Antigravity', content, flags=re.IGNORECASE)
    content = re.sub(r'\bAnthropic\b', 'IA', content, flags=re.IGNORECASE)
    
    # Garantindo que o cabeçalho frontmatter (se existir) não quebre
    return content

def import_skills():
    base_src = r"c:\Users\soare\antigravity\scratch\temp_skills"
    base_dest = r"c:\Users\soare\.gemini\antigravity\scratch\directives"
    
    if not os.path.exists(base_src):
        # Ajuste de caminho se o Cwd estiver diferente
        base_src = "temp_skills"
        base_dest = "directives"

    skills_folders = [f for f in os.listdir(base_src) if os.path.isdir(os.path.join(base_src, f))]
    imported_list = []

    for folder in skills_folders:
        src_path = os.path.join(base_src, folder)
        # O arquivo SKILL.md costuma estar um nível abaixo em uma pasta com nome similar
        subdirs = [d for d in os.listdir(src_path) if os.path.isdir(os.path.join(src_path, d))]
        
        target_name = folder.replace('.skill', '')
        dest_path = os.path.join(base_dest, target_name)
        os.makedirs(dest_path, exist_ok=True)
        
        for subdir in subdirs:
            skill_md_path = os.path.join(src_path, subdir, "SKILL.md")
            if os.path.exists(skill_md_path):
                with open(skill_md_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                sanitized = sanitize_content(content)
                
                # Salvamos como README.md ou o nome da skill.md para conformidade
                with open(os.path.join(dest_path, "README.md"), 'w', encoding='utf-8') as f:
                    f.write(sanitized)
                
                # Copiar referências se existirem
                ref_path = os.path.join(src_path, subdir, "references")
                if os.path.exists(ref_path):
                    shutil.copytree(ref_path, os.path.join(dest_path, "references"), dirs_exist_ok=True)
                
                imported_list.append(target_name)
                print(f"Importada: {target_name}")

    return imported_list

def update_index(imported_list):
    index_path = r"c:\Users\soare\.gemini\antigravity\scratch\skills_index.txt"
    if not os.path.exists(index_path):
        index_path = "skills_index.txt"
        
    with open(index_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Encontrar a categoria de Marketing/Social (ou criar uma se não existir)
    # Essas novas skills parecem ser de marketing digital/instagram
    
    new_entries = [f"- {name}: Skill para {name.replace('-', ' ')}\n" for name in imported_list]
    
    # Inserir no final ou em uma seção específica
    # Vamos adicionar uma seção "MARKETING & SOCIAL MEDIA" se não houver
    has_marketing = any("MARKETING" in line for line in lines)
    
    if not has_marketing:
        lines.append("\n## MARKETING & SOCIAL MEDIA\n")
    
    # Adicionar as novas skills (evitando duplicatas se rodado duas vezes)
    existing_skills = "".join(lines)
    for entry in new_entries:
        if entry.strip() not in existing_skills:
            lines.append(entry)
            
    with open(index_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("skills_index.txt atualizado.")

if __name__ == "__main__":
    imported = import_skills()
    if imported:
        update_index(imported)
