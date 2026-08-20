"""엔진 경계.

계산은 엔진 담당자의 몫이다. 여기서는 호출 규약만 정의한다.
"""

from __future__ import annotations

from typing import Protocol

from app.schemas.clock import BenefitClock
from app.schemas.profile import UserProfile


class ClockEngine(Protocol):
    def compute(self, profile: UserProfile) -> BenefitClock: ...
