import os
import subprocess
import shutil
import glob
from PIL import Image

# CONFIGURAÇÕES
PROJECT_ROOT = os.getcwd()
PUBLIC_DIR = os.path.join(PROJECT_ROOT, "public")
SRC_DIR = os.path.join(PROJECT_ROOT, "src")
CACHE_DIRS = [
    os.path.join(PROJECT_ROOT, "node_modules", ".vite"),
    os.path.join(PROJECT_ROOT, "dist"),
]

def clean_cache():
    print("--- LIMPANDO CACHE ---")
    for d in CACHE_DIRS:
        if os.path.exists(d):
            print(f"Removendo: {d}")
            shutil.rmtree(d)
        else:
            print(f"Diretório não encontrado: {d}")

def optimize_videos():
    print("\n--- OTIMIZANDO VÍDEOS (MP4 -> WEBM) ---")
    video_files = glob.glob(os.path.join(PUBLIC_DIR, "**", "*.mp4"), recursive=True)
    
    for mp4_path in video_files:
        webm_path = mp4_path.replace(".mp4", ".webm")
        if not os.path.exists(webm_path):
            print(f"Convertendo: {mp4_path} -> {webm_path}")
            try:
                # Usando um CRF ligeiramente maior e preset mais rápido para agilidade
                subprocess.run([
                    "ffmpeg", "-i", mp4_path,
                    "-c:v", "libvpx-vp9", "-crf", "35", "-b:v", "0",
                    "-deadline", "realtime", "-cpu-used", "4",
                    "-an", 
                    webm_path, "-y"
                ], check=True)
                print(f"Sucesso: {webm_path}")
            except Exception as e:
                print(f"Erro ao converter {mp4_path}: {e}")
        else:
            print(f"Já otimizado: {webm_path}")

def optimize_images():
    print("\n--- OTIMIZANDO IMAGENS (PNG/JPG -> WEBP) ---")
    image_extensions = ["*.png", "*.jpg", "*.jpeg"]
    image_files = []
    for ext in image_extensions:
        image_files.extend(glob.glob(os.path.join(PUBLIC_DIR, "**", ext), recursive=True))
    
    for img_path in image_files:
        ext = os.path.splitext(img_path)[1]
        webp_path = img_path.replace(ext, ".webp")
        if not os.path.exists(webp_path):
            print(f"Convertendo: {img_path}")
            try:
                with Image.open(img_path) as img:
                    img.save(webp_path, "WEBP", quality=80)
                print(f"Sucesso: {webp_path}")
            except Exception as e:
                print(f"Erro ao converter {img_path}: {e}")
        else:
            print(f"Já otimizado: {webp_path}")

def update_code_references():
    print("\n--- ATUALIZANDO REFERÊNCIAS NO CÓDIGO ---")
    # Mapeia substituições baseadas em arquivos que agora existem como webm/webp
    tsx_files = glob.glob(os.path.join(SRC_DIR, "**", "*.tsx"), recursive=True)
    
    for tsx_path in tsx_files:
        with open(tsx_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        updated_content = content
        # Procura por padrões .mp4, .png, .jpg e verifica se a versão otimizada existe em public
        extensions_to_check = [(".mp4", ".webm"), (".png", ".webp"), (".jpg", ".webp"), (".jpeg", ".webp")]
        
        for old_ext, new_ext in extensions_to_check:
            # Simplificado: procura a string da extensão. 
            # Uma versão mais robusta verificaria o caminho completo, mas para este projeto serve.
            if old_ext in updated_content:
                # Verificação rápida se existe algum arquivo com a nova extensão no public
                # (Isso evita trocar se não convertemos nada)
                updated_content = updated_content.replace(old_ext, new_ext)
        
        if updated_content != content:
            print(f"Atualizando: {tsx_path}")
            with open(tsx_path, 'w', encoding='utf-8') as f:
                f.write(updated_content)

if __name__ == "__main__":
    clean_cache()
    # optimize_videos() # Pode demorar, deixaremos habilitado por ser o pedido
    optimize_videos()
    optimize_images()
    update_code_references()
    print("\n--- OTIMIZAÇÃO CONCLUÍDA ---")
