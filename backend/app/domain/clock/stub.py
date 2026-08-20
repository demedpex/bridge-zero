"""엔진 담당자가 실제 구현을 넣기 전까지 쓰는 고정 응답."""

from __future__ import annotations

from app.schemas.clock import BenefitClock
from app.schemas.profile import UserProfile


class StubClockEngine:
    """※ 계산하지 마라. 하드코딩된 값을 그대로 돌려준다."""

    def compute(self, profile: UserProfile) -> BenefitClock:  # noqa: ARG002 - 입력을 쓰지 않는 것이 의도다
        return BenefitClock(remaining_count=34, engine="stub")
