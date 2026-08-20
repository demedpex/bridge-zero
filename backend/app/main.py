"""브릿지 제로 API.

R1: 사용자 데이터를 서버에 저장하지 않는다.
    - DB·ORM 없음, 전역 캐시 없음
    - 로그인·세션·쿠키·JWT 없음 (그래서 CORS 도 credentials 를 허용하지 않는다)
    - 입력은 POST 본문으로만 받는다
    - 본문을 로깅하지 않는다 (app/middleware/request_log.py)
"""

from __future__ import annotations

import logging

from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.calc import router as calc_router
from app.errors import validation_exception_handler
from app.middleware.request_log import RequestLogMiddleware

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(name)s %(message)s")

# TODO(deploy): 배포 도메인이 정해지면 환경변수로 뺀다. 지금은 로컬 Vite 개발 서버만 허용한다.
ALLOWED_ORIGINS = ["http://localhost:5173", "http://127.0.0.1:5173"]

app = FastAPI(title="브릿지 제로 API", version="0.1.0")

app.add_middleware(RequestLogMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,  # 쿠키·세션을 쓰지 않는다
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["Content-Type"],
)

app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.include_router(calc_router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
