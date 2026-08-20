"""검증 규칙 — 실패하면 422 와 해요체 문구, 되돌아갈 단계를 준다."""

from __future__ import annotations

import pytest


def _errors(response) -> list[dict]:
    return response.json()["errors"]


@pytest.mark.parametrize(
    ("patch", "expected_message", "expected_step"),
    [
        ({"care_exit_ym": "2999-01"}, "보호가 끝난 시점을 다시 확인해 주세요", 2),
        ({"allowance_received_count": 61}, "0에서 60 사이로 입력해 주세요", 3),
        ({"allowance_received_count": -1}, "0에서 60 사이로 입력해 주세요", 3),
        ({"settlement_balance": -1}, "0원 이상으로 입력해 주세요", 6),
        ({"region_code": "110"}, "사는 곳을 골라 주세요", 7),
        ({"monthly_income": -1}, "0원 이상으로 입력해 주세요", 9),
        ({"fixed_expense": -1}, "0원 이상으로 입력해 주세요", 10),
    ],
)
def test_field_rules(client, valid_profile, patch, expected_message, expected_step):
    response = client.post("/api/v1/calc/clock", json={"profile": {**valid_profile, **patch}})

    assert response.status_code == 422
    errors = _errors(response)
    assert any(e["message"] == expected_message and e["step"] == expected_step for e in errors), errors


def test_scheduled_requires_expected_exit_ym(client):
    profile = {"care_exit_type": "SCHEDULED"}
    response = client.post("/api/v1/calc/clock", json={"profile": profile})

    assert response.status_code == 422
    errors = _errors(response)
    assert any(e["message"] == "보호가 끝나는 예정일을 골라 주세요" and e["step"] == 1 for e in errors), errors


def test_expected_exit_ym_must_be_future(client):
    profile = {"care_exit_type": "SCHEDULED", "expected_exit_ym": "2001-01"}
    response = client.post("/api/v1/calc/clock", json={"profile": profile})

    assert response.status_code == 422
    assert any(e["message"] == "예정일은 오늘 이후로 골라 주세요" for e in _errors(response))


def test_other_types_require_care_exit_ym(client):
    profile = {"care_exit_type": "EXTENDED"}
    response = client.post("/api/v1/calc/clock", json={"profile": profile})

    assert response.status_code == 422
    errors = _errors(response)
    assert any(e["message"] == "보호가 끝난 시점을 골라 주세요" and e["step"] == 2 for e in errors), errors


def test_bad_ym_format(client, valid_profile):
    response = client.post("/api/v1/calc/clock", json={"profile": {**valid_profile, "care_exit_ym": "2024/03"}})

    assert response.status_code == 422
    assert any(e["message"] == "연월을 다시 골라 주세요" for e in _errors(response))


def test_error_messages_are_haeyo_style(client, valid_profile):
    """화면에 그대로 나가는 문구는 전부 해요체로 끝난다."""
    response = client.post("/api/v1/calc/clock", json={"profile": {**valid_profile, "region_code": "abc"}})

    for error in _errors(response):
        assert error["message"].endswith(("어요", "세요", "예요", "에요")), error


def test_get_is_not_allowed(client):
    """쿼리스트링으로 값을 받는 경로를 만들지 않는다."""
    assert client.get("/api/v1/calc/clock").status_code == 405
