"""BenefitClock — 엔진이 돌려주는 결과 계약.

TODO(contracts): 정식 필드 구성이 아직 미확정이다.
    저장소에 `contracts/` 스캐폴딩이 없어서 스텁 응답을 주고받을 수 있는
    최소 형태로만 두었다. 엔진 담당자에게서 정의를 받으면 이 파일을 통째로 교체하고
    frontend/src/types/clock.ts 도 같은 모양으로 맞춘다.
"""

from __future__ import annotations

from pydantic import BaseModel


class BenefitClock(BaseModel):
    remaining_count: int
    """남은 자립수당 회차."""

    engine: str = "stub"
    """어떤 구현이 응답했는지. 실제 엔진이 붙으면 그 이름으로 바뀐다."""
