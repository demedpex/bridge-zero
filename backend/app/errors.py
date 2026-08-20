"""검증 실패를 화면에 그대로 띄울 수 있는 형태로 바꾼다.

- 문구는 전부 해요체로 쓴다. 화면에 그대로 노출된다.
- **사용자가 보낸 값은 응답에 담지 않는다.** Pydantic 기본 오류에는 `input` 이 들어 있는데
  그대로 흘리면 민감한 입력이 프록시·로그를 타고 밖으로 나갈 수 있다. (R1)
"""

from __future__ import annotations

from fastapi import Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

# 필드 → (화면 문구, 되돌아갈 단계)
FIELD_RULES: dict[str, tuple[str, int]] = {
    "care_exit_type": ("보호가 어떻게 끝났는지 골라 주세요", 2),
    "care_exit_ym": ("보호가 끝난 시점을 다시 확인해 주세요", 2),
    "expected_exit_ym": ("예정일은 오늘 이후로 골라 주세요", 1),
    "allowance_received_count": ("0에서 60 사이로 입력해 주세요", 3),
    "allowance_applied_ym": ("자립수당을 신청한 때를 다시 확인해 주세요", 4),
    "allowance_suspended_months": ("0개월 이상으로 입력해 주세요", 5),
    "settlement_balance": ("0원 이상으로 입력해 주세요", 6),
    "region_code": ("사는 곳을 골라 주세요", 7),
    "residence_since_ym": ("지금 사는 곳에 살기 시작한 때를 다시 확인해 주세요", 8),
    "monthly_income": ("0원 이상으로 입력해 주세요", 9),
    "income_type": ("수입 형태를 골라 주세요", 9),
    "fixed_expense": ("0원 이상으로 입력해 주세요", 10),
    "education_status": ("학력을 골라 주세요", 11),
    "employment_status": ("일하는 상태를 골라 주세요", 11),
    "held_programs": ("이미 받고 있는 지원을 다시 확인해 주세요", 11),
    "scenario": ("입력한 값을 다시 확인해 주세요", 12),
}

# 모델 전체 검증에서 올라온 문구 → 되돌아갈 단계
MODEL_MESSAGE_STEPS: dict[str, int] = {
    "보호가 끝난 시점을 다시 확인해 주세요": 2,
    "보호가 끝난 시점을 골라 주세요": 2,
    "예정일은 오늘 이후로 골라 주세요": 1,
    "보호가 끝나는 예정일을 골라 주세요": 1,
    "자립수당을 신청한 때를 다시 확인해 주세요": 4,
    "지금 사는 곳에 살기 시작한 때를 다시 확인해 주세요": 8,
}

FALLBACK_MESSAGE = "입력한 값을 다시 확인해 주세요"
FALLBACK_STEP = 12

_VALUE_ERROR_PREFIX = "Value error, "


def _field_name(location: tuple[object, ...]) -> str | None:
    """`("body", "profile", "care_exit_ym")` 에서 필드명만 꺼낸다."""
    for part in reversed(location):
        if isinstance(part, str) and part not in ("body", "profile"):
            return part
    return None


def _is_our_message(message: str) -> bool:
    """우리가 직접 띄운 해요체 문구인지. Pydantic 기본 문구는 전부 영문이다."""
    return not message.isascii()


def to_field_errors(raw_errors: list[dict]) -> list[dict]:
    """Pydantic 오류 목록 → 화면용 오류 목록. 입력값은 절대 담지 않는다."""
    seen: set[tuple[str | None, str]] = set()
    result: list[dict] = []

    for raw in raw_errors:
        field = _field_name(tuple(raw.get("loc", ())))
        message = str(raw.get("msg", ""))
        if message.startswith(_VALUE_ERROR_PREFIX):
            message = message[len(_VALUE_ERROR_PREFIX) :]

        rule = FIELD_RULES.get(field or "")
        if rule is not None:
            default_message, step = rule
            if not _is_our_message(message):
                message = default_message
        elif _is_our_message(message):
            step = MODEL_MESSAGE_STEPS.get(message, FALLBACK_STEP)
        else:
            message, step = FALLBACK_MESSAGE, FALLBACK_STEP

        key = (field, message)
        if key in seen:
            continue
        seen.add(key)
        result.append({"field": field, "message": message, "step": step})

    return result


async def validation_exception_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"errors": to_field_errors(exc.errors())},
    )
