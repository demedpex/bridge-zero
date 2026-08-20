"""UserProfile — 엔진 담당자와 합의된 입력 계약.

※ 필드명을 바꾸지 마라. contracts/README.md 참고.
※ 이 파일에서 회차·금액·날짜를 계산하지 않는다. 형식 검증만 한다.
"""

from __future__ import annotations

import re
from datetime import date
from typing import Literal

from pydantic import BaseModel, Field, field_validator, model_validator

CareExitType = Literal["MATURITY", "EXTENDED", "EARLY", "SCHEDULED"]
IncomeType = Literal["WAGE", "DAILY", "FREELANCE", "NONE"]

_YM_PATTERN = re.compile(r"^\d{4}-(0[1-9]|1[0-2])$")
_REGION_PATTERN = re.compile(r"^\d{5}$")


def _to_ym_tuple(value: str) -> tuple[int, int]:
    year, month = value.split("-")
    return int(year), int(month)


def _current_ym() -> tuple[int, int]:
    today = date.today()
    return today.year, today.month


class Scenario(BaseModel):
    """이번 화면에서는 받지 않고 기본값 0으로 둔다."""

    income_delta: int = 0
    income_gap_months: int = 0


class UserProfile(BaseModel):
    # 보호종료
    care_exit_type: CareExitType
    care_exit_ym: str | None = None
    expected_exit_ym: str | None = None

    # 자립수당
    allowance_applied_ym: str | None = None
    allowance_received_count: int | None = Field(default=None, ge=0, le=60)
    allowance_suspended_months: int = Field(default=0, ge=0)

    # 목돈
    settlement_balance: int | None = Field(default=None, ge=0)

    # 거주
    region_code: str | None = None
    residence_since_ym: str | None = None

    # 소득
    monthly_income: int = Field(default=0, ge=0)
    income_type: IncomeType = "NONE"
    fixed_expense: int = Field(default=0, ge=0)

    # 자격 판정용
    education_status: str | None = None
    employment_status: str | None = None
    held_programs: list[int] = Field(default_factory=list)

    # 시나리오
    scenario: Scenario = Field(default_factory=Scenario)

    @field_validator("care_exit_ym", "expected_exit_ym", "allowance_applied_ym", "residence_since_ym")
    @classmethod
    def _check_ym_format(cls, value: str | None) -> str | None:
        if value is None:
            return None
        if not _YM_PATTERN.match(value):
            raise ValueError("연월을 다시 골라 주세요")
        return value

    @field_validator("region_code")
    @classmethod
    def _check_region(cls, value: str | None) -> str | None:
        if value is None:
            return None
        if not _REGION_PATTERN.match(value):
            raise ValueError("사는 곳을 골라 주세요")
        return value

    @model_validator(mode="after")
    def _check_dates_and_required(self) -> "UserProfile":
        now = _current_ym()

        if self.care_exit_ym is not None and _to_ym_tuple(self.care_exit_ym) > now:
            raise ValueError("보호가 끝난 시점을 다시 확인해 주세요")

        if self.expected_exit_ym is not None and _to_ym_tuple(self.expected_exit_ym) < now:
            raise ValueError("예정일은 오늘 이후로 골라 주세요")

        if self.residence_since_ym is not None and _to_ym_tuple(self.residence_since_ym) > now:
            raise ValueError("지금 사는 곳에 살기 시작한 때를 다시 확인해 주세요")

        if self.allowance_applied_ym is not None and _to_ym_tuple(self.allowance_applied_ym) > now:
            raise ValueError("자립수당을 신청한 때를 다시 확인해 주세요")

        if self.care_exit_type == "SCHEDULED":
            if self.expected_exit_ym is None:
                raise ValueError("보호가 끝나는 예정일을 골라 주세요")
        elif self.care_exit_ym is None:
            raise ValueError("보호가 끝난 시점을 골라 주세요")

        return self
