"""엔진 주입 지점.

실제 엔진이 오면 아래 한 줄만 바꿔 끼운다.
"""

from __future__ import annotations

from app.domain.clock.interface import ClockEngine
from app.domain.clock.stub import StubClockEngine


def get_clock_engine() -> ClockEngine:
    # TODO(engine): 실제 구현이 오면 이 한 줄을 교체한다.
    return StubClockEngine()
