"""
============================================================
EVOLUTIONARY PROGRAMMING ENGINE (EP) v4 - OLLAMA PURO
============================================================
100% local. Prompts ultra-curtos para modelos 7B.
Timeout generoso (180s). Sem dependencia de cloud.
============================================================
"""

import requests
import json
import time
import os
import sys
import warnings
from datetime import datetime

warnings.filterwarnings("ignore")

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "qwen2.5-coder:7b"
OBSIDIAN_LOGS = r"C:\Users\soare\Desktop\Segundo_Cerebro_IA\Dev_Logs"

STRATEGIES = [
    "Be 30% shorter. Keep all key info.",
    "Add error handling steps.",
    "Reorder steps logically.",
]

def fp(msg):
    print(msg, flush=True)

def load_directive(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    # ULTRA curto para modelo 7B - max 500 chars
    if len(content) > 500:
        content = content[:500]
    fp(f"[OK] {os.path.basename(filepath)} ({len(content)} chars)")
    return content

def generate_mutation(original, strategy, mid):
    # Prompt minimalista para garantir resposta rapida
    prompt = f"""Improve this text. Strategy: {strategy}

{original}

Improved version:"""

    fp(f"  [M{mid}] Gerando...")
    try:
        t0 = time.time()
        resp = requests.post(OLLAMA_URL, json={
            "model": MODEL, "prompt": prompt, "stream": False,
            "options": {"temperature": 0.7, "num_predict": 256}
        }, timeout=180)
        dt = time.time() - t0

        if resp.status_code == 200:
            data = resp.json()
            out = data.get("response", "").strip()
            toks = data.get("eval_count", len(out.split()))
            fp(f"  [M{mid}] OK {dt:.0f}s ({toks} toks)")
            return {"id": mid, "content": out, "strategy": strategy,
                    "tokens": toks, "time": dt}
        fp(f"  [M{mid}] HTTP {resp.status_code}")
        return None
    except requests.exceptions.Timeout:
        fp(f"  [M{mid}] TIMEOUT 180s")
        return None
    except Exception as e:
        fp(f"  [M{mid}] Erro: {e}")
        return None

def evaluate(cand):
    prompt = f"Rate 0-100 on clarity and efficiency. Reply ONLY a number.\n\n{cand['content'][:300]}\n\nScore:"
    fp(f"  [F{cand['id']}] Avaliando...")
    try:
        resp = requests.post(OLLAMA_URL, json={
            "model": MODEL, "prompt": prompt, "stream": False,
            "options": {"temperature": 0.1, "num_predict": 5}
        }, timeout=60)
        if resp.status_code == 200:
            raw = resp.json().get("response", "50").strip()
            digits = "".join(c for c in raw if c.isdigit())
            score = max(0, min(100, int(digits) if digits else 50))
            fitness = 0.6 * score + 0.2 * max(0, 100 - cand["tokens"]/10) + 0.2 * max(0, 100 - cand["time"]*2)
            cand["quality"] = score
            cand["fitness"] = round(fitness, 2)
            fp(f"  [F{cand['id']}] Q={score} F={fitness:.1f}")
            return cand
    except Exception as e:
        fp(f"  [F{cand['id']}] Err: {e}")
    cand["fitness"] = 0
    cand["quality"] = 0
    return cand

def save_log(target, base_f, champ, results, ct):
    date = datetime.now().strftime("%Y-%m-%d")
    ts = datetime.now().strftime("%H:%M")
    delta = champ["fitness"] - base_f
    log = f"""---
type: evolution_log
date: {date}
status: {"improved" if delta > 0 else "plateau"}
---
# EP Log - {date} {ts}
## Alvo: `{os.path.basename(target)}`
| Metrica | Baseline | Campeao | Delta |
|---|---|---|---|
| Fitness | {base_f:.1f} | {champ['fitness']:.1f} | {delta:+.1f} |
| Quality | - | {champ.get('quality','-')} | - |
## Estrategia: {champ.get('strategy','N/A')}
## Candidatos: {len(results)} | Tempo: {ct:.0f}s
## Decisao: {"ATUALIZADA" if delta > 0 else "Mantida"}
"""
    os.makedirs(OBSIDIAN_LOGS, exist_ok=True)
    path = os.path.join(OBSIDIAN_LOGS, f"EP_Log_{date}.md")
    mode = "a" if os.path.exists(path) else "w"
    with open(path, mode, encoding="utf-8") as f:
        f.write(log + "\n---\n\n")
    fp(f"[LOG] {path}")

def main():
    fp("=" * 40)
    fp("  EP v4 - 100% LOCAL (Ollama)")
    fp("=" * 40)
    if len(sys.argv) < 2:
        fp("Uso: python evolutionary_engine.py <arquivo.md>")
        sys.exit(1)

    target = sys.argv[1]
    t0 = time.time()
    original = load_directive(target)

    fp("\n[1] Baseline...")
    base = {"id": 0, "content": original, "strategy": "BASE", "tokens": len(original.split()), "time": 0}
    base = evaluate(base)
    base_f = base.get("fitness", 50)
    fp(f"  Base F={base_f:.1f}")

    fp(f"\n[2] Gerando {len(STRATEGIES)} mutacoes...")
    pop = [m for s_i, s in enumerate(STRATEGIES) if (m := generate_mutation(original, s, s_i+1))]
    fp(f"  {len(pop)} OK")

    if not pop:
        fp("[!] Sem mutacoes. Fim.")
        sys.exit(1)

    fp(f"\n[3] Fitness...")
    evald = [e for c in pop if (e := evaluate(c)) and e.get("fitness", 0) > 0]

    if not evald:
        fp("[!] Sem avaliacao. Fim.")
        sys.exit(1)

    fp("\n[4] Selecao...")
    champ = max(evald, key=lambda x: x.get("fitness", 0))
    delta = champ["fitness"] - base_f
    fp(f"  Campeao: #{champ['id']} F={champ['fitness']:.1f} D={delta:+.1f}")

    if delta > 0:
        fp("\n[5] EVOLUIU!")
        bkp = target + f".bkp_{datetime.now().strftime('%Y%m%d_%H%M')}"
        with open(target, "r", encoding="utf-8") as f:
            orig = f.read()
        with open(bkp, "w", encoding="utf-8") as f:
            f.write(orig)
        with open(target, "w", encoding="utf-8") as f:
            f.write(champ["content"])
        fp(f"  Atualizado!")
    else:
        fp("\n[5] Estavel.")

    ct = time.time() - t0
    save_log(target, base_f, champ, evald, ct)
    fp(f"\n{'=' * 40}")
    fp(f"  CICLO: {ct:.0f}s | {'EVOLUIU' if delta > 0 else 'ESTAVEL'}")
    fp(f"{'=' * 40}")

if __name__ == "__main__":
    main()
