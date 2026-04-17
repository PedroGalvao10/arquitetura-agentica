import time
import asyncio
import logging
from functools import wraps
from typing import Callable, Any, TypeVar, Coroutine, Union, AsyncGenerator

# Configuração de logger (segue o padrão do sistema)
logger = logging.getLogger(__name__)

T = TypeVar("T")

def should_retry(exception: Exception) -> bool:
    """
    Verifica se a exceção é de um tipo que deve ser retentado (erros transientes).
    """
    error_msg = str(exception).upper()
    retryable_codes = [
        '503', 
        '429', 
        'UNAVAILABLE', 
        'MODEL_CAPACITY_EXHAUSTED', 
        'TIMEOUT', 
        'RATE_LIMIT',
        'OVERLOAD'
    ]
    return any(code in error_msg for code in retryable_codes)

def retry_with_backoff(max_retries: int = 5, initial_delay: float = 2.0, backoff_factor: float = 2.0):
    """
    Decorator síncrono para retry com exponential backoff.
    Utilizado para funções que fazem chamadas HTTP/API síncronas.
    """
    def decorator(func: Callable[..., T]) -> Callable[..., T]:
        @wraps(func)
        def wrapper(*args, **kwargs) -> T:
            retries = 0
            delay = initial_delay
            
            while True:
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    retries += 1
                    if retries > max_retries or not should_retry(e):
                        logger.error(f"❌ Falha persistente ou crítica após {retries} tentativas: {e}")
                        raise e
                    
                    logger.warning(
                        f"⚠️ Erro de API (Tentativa {retries}/{max_retries}): {e}. "
                        f"Retentando em {delay}s..."
                    )
                    time.sleep(delay)
                    delay *= backoff_factor
        return wrapper
    return decorator

def async_retry_with_backoff(max_retries: int = 5, initial_delay: float = 2.0, backoff_factor: float = 2.0):
    """
    Decorator assíncrono para retry com exponential backoff.
    Utilizado para funções 'async def' que fazem chamadas de API (não-geradores).
    """
    def decorator(func: Callable[..., Coroutine[Any, Any, T]]) -> Callable[..., Coroutine[Any, Any, T]]:
        @wraps(func)
        async def wrapper(*args, **kwargs) -> T:
            retries = 0
            delay = initial_delay
            
            while True:
                try:
                    return await func(*args, **kwargs)
                except Exception as e:
                    retries += 1
                    if retries > max_retries or not should_retry(e):
                        logger.error(f"❌ Falha assíncrona persistente ou crítica após {retries} tentativas: {e}")
                        raise e
                    
                    logger.warning(
                        f"⚠️ Erro de API Assíncrona (Tentativa {retries}/{max_retries}): {e}. "
                        f"Retentando em {delay}s..."
                    )
                    await asyncio.sleep(delay)
                    delay *= backoff_factor
        return wrapper
    return decorator

def async_generator_retry_with_backoff(max_retries: int = 5, initial_delay: float = 2.0, backoff_factor: float = 2.0):
    """
    Decorator para Geradores Assíncronos (AsyncGenerator) com retry e exponential backoff.
    Ideal para funções de streaming de LLM.
    """
    def decorator(func: Callable[..., AsyncGenerator[Any, None]]) -> Callable[..., AsyncGenerator[Any, None]]:
        @wraps(func)
        async def wrapper(*args, **kwargs) -> AsyncGenerator[Any, None]:
            retries = 0
            delay = initial_delay
            
            while True:
                try:
                    # Tenta iterar sobre o gerador
                    async for item in func(*args, **kwargs):
                        yield item
                    return # Sucesso finaliza a iteração
                except Exception as e:
                    retries += 1
                    if retries > max_retries or not should_retry(e):
                        logger.error(f"❌ Falha no streaming persistente após {retries} tentativas: {e}")
                        raise e
                    
                    logger.warning(
                        f"⚠️ Erro no Streaming (Tentativa {retries}/{max_retries}): {e}. "
                        f"Retentando em {delay}s..."
                    )
                    await asyncio.sleep(delay)
                    delay *= backoff_factor
        return wrapper
    return decorator
