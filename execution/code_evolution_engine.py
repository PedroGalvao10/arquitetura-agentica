"""
============================================================
CODE EVOLUTION ENGINE (ADAS) v1 - OLLAMA PURO
============================================================
Motor de Programação Evolutiva aplicado a código-fonte.
Gera mutações, valida sintaxe via tsc/lint e aplica fitness.
============================================================
"""

import requests
import json
import time
import os
import sys
import warnings
import subprocess
import re
from datetime import datetime

warnings.filterwarnings("ignore")

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "qwen2.5-coder:7b"
OBSIDIAN_LOGS = r"C:\Users\soare\Desktop\Segundo_Cerebro_IA\Dev_Logs"

STRATEGIES = [
    "Refactor to be more performant (especially GPU/Canvas/Memory usage) and use modern clean-code patterns. If using shadowBlur in loops, find a faster alternative like Radial Gradients or pre-rendering.",
    "Add detailed TSDoc comments and improve readability. Keep exactly the same logic.",
    "Minimize lines without losing type safety or logic."
]

def fp(msg):
    print(msg, flush=True)

def load_code(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    fp(f"[OK] {os.path.basename(filepath)} ({len(content)} chars)")
    return content

def extract_code_block(text):
    """Extrai bloco de código se o LLM retornar em markdown tags."""
    match = re.search(r"```(?:typescript|js|ts|tsx)?\n(.*?)\n```", text, re.DOTALL)
    if match:
        return match.group(1).strip()
    # Se não tiver tag de código, assumir que a resposta inteira é código
    return text.strip()

def generate_mutation(original, strategy, mid):
    prompt = f"""You are an elite TypeScript React Developer.
Your goal is to apply this strategy: {strategy}

Do NOT output any explanations, markdown conversations or introductory text. 
Output ONLY the raw code inside a markdown block. Keep all imports.

Original Code:
```typescript
{original}
```
"""

    fp(f"  [M{mid}] Gerando mutação...")
    try:
        t0 = time.time()
        resp = requests.post(OLLAMA_URL, json={
            "model": MODEL, 
            "prompt": prompt, 
            "stream": False,
            "options": {"temperature": 0.5, "num_predict": 2048}
        }, timeout=300)
        dt = time.time() - t0

        if resp.status_code == 200:
            data = resp.json()
            raw_out = data.get("response", "").strip()
            clean_code = extract_code_block(raw_out)
            toks = data.get("eval_count", len(clean_code.split()))
            fp(f"  [M{mid}] OK {dt:.0f}s ({toks} toks)")
            return {"id": mid, "content": clean_code, "strategy": strategy, "time": dt}
        
        fp(f"  [M{mid}] HTTP {resp.status_code}")
        return None
    except Exception as e:
        fp(f"  [M{mid}] Erro: {e}")
        return None

def test_compilation(filepath, cand_content):
    """Testa se o código compila na pasta raiz do projeto via TypeScript."""
    backup_path = filepath + ".test_bkp"
    
    # Faz backup do original
    with open(filepath, "r", encoding="utf-8") as f:
        original = f.read()
    with open(backup_path, "w", encoding="utf-8") as f:
        f.write(original)
        
    try:
        # Escreve mutação
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(cand_content)
        
        # O cwd deve ser a pasta com tsconfig.json. Ex: C:\..\Agentic_OS_React
        # Encontra o tsconfig mais próximo
        cwd = os.path.dirname(filepath)
        while cwd and not os.path.exists(os.path.join(cwd, "tsconfig.json")):
            parent = os.path.dirname(cwd)
            if parent == cwd: break
            cwd = parent
            
        fp(f"  [F?] Rodando tsc validation em {cwd}...")
        
        # Testar compilação do arquivo específico não é simples com --noEmit (valida tudo).
        # Em vez disso podemos usar o npx tsc ou eslint (demora).
        # Vamos fazer um try simples de import do TS.
        # Devido ao custo de tempo, validaremos apenas via lint/TypeCheck básico do próprio TS.
        
        process = subprocess.run(
            ["npx", "tsc", "--noEmit"], 
            cwd=cwd, 
            stdout=subprocess.PIPE, 
            stderr=subprocess.PIPE,
            shell=True,
            timeout=30
        )
        
        # Restaura original
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(original)
            
        compiles = (process.returncode == 0)
        return compiles
        
    except Exception as e:
        fp(f"  [F?] Compilation Error Runtime: {e}")
        # Restaura original em caso de erro no processo de backup
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(original)
        return False
    finally:
        if os.path.exists(backup_path):
            os.remove(backup_path)

def evaluate(cand, orig_content, cwd_path):
    prompt = f"""Rate 0-100 how safe and clean this code mutation is compared to the original. Reply ONLY a number.
Original:
{orig_content[:500]}
Mutation:
{cand['content'][:500]}
Score:"""
    
    fp(f"  [F{cand['id']}] Avaliando...")
    try:
        # Físico: Compila?
        compiles = test_compilation(cwd_path, cand['content'])
        
        if not compiles:
            fp(f"  [F{cand['id']}] Falhou na Compilação TypeScript. F=0")
            cand["quality"] = 0
            cand["fitness"] = 0
            cand["compiles"] = False
            return cand
            
        cand["compiles"] = True
        
        # Estético: Avaliação do Local LLM Juiz
        resp = requests.post(OLLAMA_URL, json={
            "model": MODEL, "prompt": prompt, "stream": False,
            "options": {"temperature": 0.1, "num_predict": 5}
        }, timeout=60)
        
        if resp.status_code == 200:
            raw = resp.json().get("response", "50").strip()
            digits = "".join(c for c in raw if c.isdigit())
            score = max(0, min(100, int(digits) if digits else 50))
            
            # Penaliza levemente tempo de geração maior
            fitness = 0.8 * score + 0.2 * max(0, 100 - cand["time"]*2)
            
            cand["quality"] = score
            cand["fitness"] = round(fitness, 2)
            fp(f"  [F{cand['id']}] Q={score} F={fitness:.1f} (Compila: {compiles})")
            return cand
    except Exception as e:
        fp(f"  [F{cand['id']}] Err: {e}")
        
    cand["fitness"] = 0
    cand["quality"] = 0
    cand["compiles"] = False
    return cand

def save_log(target, base_f, champ, results, ct):
    date = datetime.now().strftime("%Y-%m-%d")
    ts = datetime.now().strftime("%H:%M")
    delta = champ["fitness"] - base_f
    log = f"""---
type: code_evolution_log
date: {date}
status: {"improved" if delta > 0 else "plateau"}
---
# Code ADAS Log - {date} {ts}
## Alvo: `{os.path.basename(target)}`
| Metrica | Baseline | Campeao | Delta | Compilation |
|---|---|---|---|---|
| Fitness | {base_f:.1f} | {champ['fitness']:.1f} | {delta:+.1f} | {champ.get('compiles', False)} |
| Quality | - | {champ.get('quality','-')} | - | - |

## Estrategia Vencedora: 
> {champ.get('strategy','N/A')}

## Mutacoes Totais: {len(results)} | Tempo Total: {ct:.0f}s
## Ação Final: {"CODIGO SUBSTITUIDO" if delta > 0 else "Base mantida"}
"""
    os.makedirs(OBSIDIAN_LOGS, exist_ok=True)
    path = os.path.join(OBSIDIAN_LOGS, f"Code_EP_Log_{date}.md")
    mode = "a" if os.path.exists(path) else "w"
    with open(path, mode, encoding="utf-8") as f:
        f.write(log + "\n---\n\n")
    fp(f"[LOG] {path}")

def main():
    fp("=" * 50)
    fp("  ADAS CODE EVOLUTION ENGINE v1")
    fp("=" * 50)
    if len(sys.argv) < 2:
        fp("Uso: python code_evolution_engine.py <arquivo.ts/tsx>")
        sys.exit(1)

    target_path = os.path.abspath(sys.argv[1])
    t0 = time.time()
    original = load_code(target_path)

    fp("\n[1] Avaliando Baseline via Juiz...")
    # Para o baseline daremos nota conservadora para facilitar ultrapassagem se compilar
    base = {"id": 0, "content": original, "strategy": "BASE", "compiles": True, "time": 0}
    # Assume que a baseline tem score de 70 de quality 
    base_f = 0.8 * 70.0 + 0.2 * 100.0  # F=76
    fp(f"  Base F={base_f:.1f}")

    fp(f"\n[2] Gerando {len(STRATEGIES)} mutacoes...")
    pop = [m for s_i, s in enumerate(STRATEGIES) if (m := generate_mutation(original, s, s_i+1))]
    fp(f"  {len(pop)} Mutações Físicas Geradas")

    if not pop:
        fp("[!] Nenhuma mutação foi gerada. Fim.")
        sys.exit(1)

    fp(f"\n[3] Fitness Compilation & Evaluation (Local Agent)...")
    evald = [e for c in pop if (e := evaluate(c, original, target_path)) and e.get("fitness", 0) > 0]

    if not evald:
        fp("[!] Nenhuma mutação passou no crivo TypeScript ou Qualidade. Feito de Segurança acionado.")
        sys.exit(1)

    fp("\n[4] Selecao do Sistema Agêntico...")
    champ = max(evald, key=lambda x: x.get("fitness", 0))
    delta = champ["fitness"] - base_f
    fp(f"  Campeao: #{champ['id']} F={champ['fitness']:.1f} D={delta:+.1f}")

    if delta > 0:
        fp("\n[5] EVOLUIU - APLICANDO NO CÓDIGO BÁSICO")
        bkp = target_path + f".bkp_{datetime.now().strftime('%Y%m%d_%H%M')}"
        with open(target_path, "r", encoding="utf-8") as f:
            orig = f.read()
        with open(bkp, "w", encoding="utf-8") as f:
            f.write(orig)
            
        with open(target_path, "w", encoding="utf-8") as f:
            f.write(champ["content"])
        fp(f"  Atualizado e Backup `{os.path.basename(bkp)}` criado!")
    else:
        fp("\n[5] Estabilidade - Baseline não superada.")

    ct = time.time() - t0
    save_log(target_path, base_f, champ, evald, ct)
    fp(f"\n{'=' * 50}")
    fp(f"  ADAS CICLO CONCLUIDO: {ct:.0f}s | {'EVOLUIU' if delta > 0 else 'TESTADO MANTIDO'}")
    fp(f"{'=' * 50}")

if __name__ == "__main__":
    main()
