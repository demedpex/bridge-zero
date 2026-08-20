"""POST /api/v1/calc/clock — 입력을 검증해서 엔진에 넘긴다.

여기서 계산하지 않는다. 검증 → UserProfile → 엔진 호출 → 결과 그대로 반환.
"""

from __future__ import annotations

from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.domain.clock.interface import ClockEngine
from app.domain.clock.provider import get_clock_engine
from app.schemas.clock import BenefitClock
from app.schemas.profile import UserProfile

router = APIRouter(prefix="/api/v1/calc", tags=["calc"])


class ClockRequest(BaseModel):
    profile: UserProfile


@router.post("/clock", response_model=BenefitClock)
def compute_clock(
    payload: ClockRequest,
    engine: ClockEngine = Depends(get_clock_engine),
) -> BenefitClock:
    # 저장하지 않는다. 이 함수를 벗어나면 profile 은 어디에도 남지 않는다. (R1)
    return engine.compute(payload.profile)
