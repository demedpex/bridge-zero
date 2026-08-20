from __future__ import annotations

import pytest
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture()
def client() -> TestClient:
    return TestClient(app)


@pytest.fixture()
def valid_profile() -> dict:
    """정상 입력 한 벌. 값은 로깅 테스트에서 표식으로도 쓰이므로 눈에 띄는 숫자를 쓴다."""
    return {
        "care_exit_type": "MATURITY",
        "care_exit_ym": "2024-03",
        "expected_exit_ym": None,
        "allowance_applied_ym": "2024-04",
        "allowance_received_count": 26,
        "allowance_suspended_months": 0,
        "settlement_balance": 1234567,
        "region_code": "11000",
        "residence_since_ym": "2024-05",
        "monthly_income": 7654321,
        "income_type": "WAGE",
        "fixed_expense": 987654,
        "education_status": "HIGH_SCHOOL_GRADUATED",
        "employment_status": "EMPLOYED",
        "held_programs": [],
        "scenario": {"income_delta": 0, "income_gap_months": 0},
    }
