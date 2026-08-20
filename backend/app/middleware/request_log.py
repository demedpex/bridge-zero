"""요청 로깅 — 본문은 절대 남기지 않는다. (R1)

로그에 남기는 것: 요청 ID · 메서드 · 경로 · 상태코드 · 소요시간.
쿼리스트링도 남기지 않는다. API는 전부 POST 본문으로 받으므로 URL에 값이 실릴 일이 없지만,
누가 나중에 GET을 붙이더라도 값이 새지 않게 경로에서 잘라낸다.
"""

from __future__ import annotations

import logging
import time
import uuid

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

logger = logging.getLogger("bridgezero.access")


class RequestLogMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        request_id = uuid.uuid4().hex[:12]
        started = time.perf_counter()

        # request.url.path 만 쓴다. request.url 전체에는 쿼리스트링이 붙는다.
        path = request.url.path
        method = request.method

        try:
            response = await call_next(request)
        except Exception:
            elapsed_ms = (time.perf_counter() - started) * 1000
            # 예외 본문이 아니라 위치만 남긴다.
            logger.exception(
                "request_id=%s method=%s path=%s status=500 elapsed_ms=%.1f",
                request_id,
                method,
                path,
                elapsed_ms,
            )
            raise

        elapsed_ms = (time.perf_counter() - started) * 1000
        logger.info(
            "request_id=%s method=%s path=%s status=%d elapsed_ms=%.1f",
            request_id,
            method,
            path,
            response.status_code,
            elapsed_ms,
        )
        response.headers["X-Request-Id"] = request_id
        return response
