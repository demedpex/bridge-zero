"""R1 — 요청 본문이 로그에 남지 않는 것을 확인한다."""

from __future__ import annotations

import logging

SENTINELS = ["1234567", "7654321", "987654", "11000", "2024-03", "MATURITY"]


def test_request_body_is_not_logged(client, valid_profile, caplog):
    with caplog.at_level(logging.DEBUG):
        response = client.post("/api/v1/calc/clock", json={"profile": valid_profile})

    assert response.status_code == 200

    logged = caplog.text
    # 로그가 실제로 찍혔는지 먼저 확인한다 (테스트가 헛돌지 않게)
    assert "path=/api/v1/calc/clock" in logged
    assert "status=200" in logged

    for sentinel in SENTINELS:
        assert sentinel not in logged, f"입력값 '{sentinel}' 이 로그에 남았어요"


def test_validation_error_body_is_not_logged(client, valid_profile, caplog):
    broken = {**valid_profile, "allowance_received_count": 999}

    with caplog.at_level(logging.DEBUG):
        response = client.post("/api/v1/calc/clock", json={"profile": broken})

    assert response.status_code == 422

    logged = caplog.text
    assert "status=422" in logged
    for sentinel in [*SENTINELS, "999"]:
        assert sentinel not in logged, f"입력값 '{sentinel}' 이 로그에 남았어요"


def test_error_response_does_not_echo_input(client, valid_profile):
    """422 응답에도 사용자가 보낸 값을 담지 않는다."""
    broken = {**valid_profile, "settlement_balance": -50000}
    response = client.post("/api/v1/calc/clock", json={"profile": broken})

    assert response.status_code == 422
    assert "-50000" not in response.text
    assert "50000" not in response.text


def test_no_cookie_is_set(client, valid_profile):
    """세션·쿠키를 만들지 않는다."""
    response = client.post("/api/v1/calc/clock", json={"profile": valid_profile})
    assert "set-cookie" not in {k.lower() for k in response.headers}
