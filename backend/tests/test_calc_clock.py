"""엔진 경계 — 스텁이 고정 응답을 돌려준다."""

from __future__ import annotations


def test_returns_stub_response(client, valid_profile):
    response = client.post("/api/v1/calc/clock", json={"profile": valid_profile})

    assert response.status_code == 200
    assert response.json() == {"remaining_count": 34, "engine": "stub"}


def test_stub_ignores_input(client, valid_profile):
    """스텁은 계산하지 않는다. 입력이 달라져도 같은 값이 나온다."""
    first = client.post("/api/v1/calc/clock", json={"profile": valid_profile}).json()

    other = {**valid_profile, "allowance_received_count": 0, "monthly_income": 0}
    second = client.post("/api/v1/calc/clock", json={"profile": other}).json()

    assert first == second


def test_scheduled_profile_is_accepted(client):
    profile = {
        "care_exit_type": "SCHEDULED",
        "expected_exit_ym": "2099-01",
        "allowance_received_count": None,
        "settlement_balance": None,
        "region_code": "26000",
    }
    response = client.post("/api/v1/calc/clock", json={"profile": profile})
    assert response.status_code == 200


def test_skipped_values_stay_null(client):
    """건너뛴 값은 null 그대로 받는다. 임의의 기본값을 채우지 않는다."""
    from app.schemas.profile import UserProfile

    profile = UserProfile(care_exit_type="MATURITY", care_exit_ym="2024-03")
    assert profile.allowance_received_count is None
    assert profile.settlement_balance is None
    assert profile.allowance_applied_ym is None
    assert profile.residence_since_ym is None
    assert profile.region_code is None


def test_health(client):
    assert client.get("/health").status_code == 200
