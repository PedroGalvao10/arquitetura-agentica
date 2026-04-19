import os
import subprocess
from PIL import Image

def convert_to_webp(directory):
    print(f"Otimizando imagens em {directory}...")
    for filename in os.listdir(directory):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            base_name = os.path.splitext(filename)[0]
            webp_path = os.path.join(directory, base_name + '.webp')
            img_path = os.path.join(directory, filename)
            
            if not os.path.exists(webp_path):
                try:
                    with Image.open(img_path) as img:
                        img.save(webp_path, 'WEBP', quality=85)
                    print(f"  Convertido: {filename} -> {base_name}.webp")
                except Exception as e:
                    print(f"  Erro ao converter {filename}: {e}")

def convert_to_webm(directory):
    print(f"Otimizando vídeos em {directory}...")
    for filename in os.listdir(directory):
        if filename.lower().endswith('.mp4'):
            base_name = os.path.splitext(filename)[0]
            webm_path = os.path.join(directory, base_name + '.webm')
            mp4_path = os.path.join(directory, filename)
            
            if not os.path.exists(webm_path):
                print(f"  Convertendo: {filename} -> {base_name}.webm (isso pode demorar)")
                # Configuração de alta compressão e qualidade (VP9)
                cmd = [
                    'ffmpeg', '-i', mp4_path,
                    '-c:v', 'libvpx-vp9', '-crf', '35', '-b:v', '0',
                    '-c:a', 'libopus', webm_path,
                    '-y' # Sobrescrever se existir
                ]
                try:
                    subprocess.run(cmd, check=True, capture_output=True)
                    print(f"  Sucesso: {base_name}.webm")
                except subprocess.CalledProcessError as e:
                    print(f"  Erro ao converter {filename}: {e.stderr.decode()}")

if __name__ == "__main__":
    base_dir = r"c:\Users\soare\.gemini\antigravity\scratch\site_mariana_react"
    
    # 1. Vídeos do Portal e outros
    convert_to_webm(os.path.join(base_dir, "public", "videos"))
    
    # 2. Vídeos na raiz da public
    convert_to_webm(os.path.join(base_dir, "public"))
    
    # 3. Imagens de Frutas e Ativos
    convert_to_webp(os.path.join(base_dir, "public", "fruits"))
    
    print("\nOtimização concluída!")
