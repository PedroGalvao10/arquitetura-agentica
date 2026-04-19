
import os
import re
import shutil
import subprocess

def sanitize_content(content):
    # Substituindo Claude por Antigravity e Anthropic por IA
    content = re.sub(r'\bClaude\b', 'Antigravity', content, flags=re.IGNORECASE)
    content = re.sub(r'\bClaude Code\b', 'Antigravity', content, flags=re.IGNORECASE)
    content = re.sub(r'\bAnthropic\b', 'IA', content, flags=re.IGNORECASE)
    return content

def extract_skill_files(src_dir, temp_extract_dir):
    os.makedirs(temp_extract_dir, exist_ok=True)
    skill_files = [f for f in os.listdir(src_dir) if f.endswith('.skill')]
    extract_paths = []
    
    for skill_file in skill_files:
        skill_path = os.path.join(src_dir, skill_file)
        target_temp_dir = os.path.join(temp_extract_dir, skill_file.replace('.skill', ''))
        os.makedirs(target_temp_dir, exist_ok=True)
        
        # Usando tar para extrair (funciona nativamente no Windows 10+)
        try:
            subprocess.run(['tar', '-xf', skill_path, '-C', target_temp_dir], check=True)
            extract_paths.append(target_temp_dir)
            print(f"Extraído: {skill_file}")
        except subprocess.CalledProcessError as e:
            print(f"Erro ao extrair {skill_file}: {e}")
            
    return extract_paths

def process_skills(extracted_dirs, dest_base):
    imported_list = []
    for skill_dir in extracted_dirs:
        # Procurar por SKILL.md de forma recursiva
        skill_md_found = None
        for root, dirs, files in os.walk(skill_dir):
            if "SKILL.md" in files:
                skill_md_found = os.path.join(root, "SKILL.md")
                break
        
        if skill_md_found:
            skill_name = os.path.basename(skill_dir)
            target_dir = os.path.join(dest_base, skill_name)
            os.makedirs(target_dir, exist_ok=True)
            
            with open(skill_md_found, 'r', encoding='utf-8') as f:
                content = f.read()
            
            sanitized = sanitize_content(content)
            
            with open(os.path.join(target_dir, "README.md"), 'w', encoding='utf-8') as f:
                f.write(sanitized)
                
            # Copiar pasta references se existir
            ref_path = os.path.join(os.path.dirname(skill_md_found), "references")
            if os.path.exists(ref_path):
                shutil.copytree(ref_path, os.path.join(target_dir, "references"), dirs_exist_ok=True)
                
            imported_list.append(skill_name)
            print(f"Processado: {skill_name}")
            
    return imported_list

def update_skills_index(index_path, imported_list):
    if not os.path.exists(index_path):
        print(f"Index não encontrado: {index_path}")
        return

    with open(index_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    has_marketing = any("MARKETING" in line.upper() for line in lines)
    if not has_marketing:
        lines.append("\n## MARKETING & SOCIAL MEDIA\n")
        
    existing_content = "".join(lines)
    added = False
    for name in imported_list:
        entry = f"- {name}: Skill para {name.replace('-', ' ')}\n"
        if entry.strip() not in existing_content:
            lines.append(entry)
            added = True
            
    if added:
        with open(index_path, 'w', encoding='utf-8') as f:
            f.writelines(lines)
        print(f"Index atualizado: {index_path}")

def main():
    src_dir = r"C:\Users\soare\Downloads\MINHAS SKILLS-20260416T163601Z-3-001\MINHAS SKILLS"
    temp_extract = "temp_skills_v2"
    scratch_directives = r"c:\Users\soare\.gemini\antigravity\scratch\directives"
    scratch_index = r"c:\Users\soare\.gemini\antigravity\scratch\skills_index.txt"
    duplicado_directives = r"C:\Users\soare\.gemini\antigravity\Duplicado\directives"
    duplicado_index = r"C:\Users\soare\.gemini\antigravity\Duplicado\skills_index.txt"
    
    # 1. Extrair
    extracted = extract_skill_files(src_dir, temp_extract)
    
    if not extracted:
        print("Nenhuma skill encontrada para extrair.")
        return
        
    # 2. Processar para Scratch
    imported = process_skills(extracted, scratch_directives)
    
    # 3. Processar para Duplicado
    process_skills(extracted, duplicado_directives)
    
    # 4. Atualizar Índices
    if imported:
        update_skills_index(scratch_index, imported)
        update_skills_index(duplicado_index, imported)
        
    # 5. Limpar temp
    # shutil.rmtree(temp_extract)
    print("Concluído!")

if __name__ == "__main__":
    main()
