# 브릿지 제로 — 온보딩 입력

자립준비청년이 "지원이 언제 끝나는지"를 확인할 수 있게, 필요한 값을 받아 계산 엔진에 넘긴다.
이 저장소에 들어 있는 것은 **입력 화면과 엔진 호출 지점까지**다. 계산은 별도 엔진 모듈이 한다.

## 처음 준비하기

필요한 것: Node.js 20+ · Python 3.11

```bash
# 프론트
cd frontend
npm install

# 백엔드
cd backend
py -3.11 -m venv .venv                       # Windows
.venv/Scripts/python.exe -m pip install -r requirements.txt
```

## 실행

터미널 두 개를 쓴다.

```bash
# 1) 백엔드 — http://127.0.0.1:8000
cd backend
.venv/Scripts/python.exe -m uvicorn app.main:app --port 8000

# 2) 프론트 — http://localhost:5173
cd frontend
npm run dev
```

브라우저에서 http://localhost:5173 을 열면 온보딩이 시작된다.
`/api` 요청은 Vite 개발 서버가 백엔드로 넘긴다.

## 테스트

```bash
cd backend && .venv/Scripts/python.exe -m pytest    # 22개
cd frontend && npm run typecheck
```

## API

```
POST /api/v1/calc/clock
Body: { "profile": UserProfile }
```

- 검증에 실패하면 `422` 와 함께 `{ "errors": [{ "field", "message", "step" }] }` 를 준다.
  `message` 는 화면에 그대로 띄우는 해요체 문구이고, `step` 은 되돌아갈 단계다.
- 지금은 스텁 엔진이 고정 응답(`{"remaining_count": 34, "engine": "stub"}`)을 돌려준다.

## 알아둘 것

- **사용자 데이터를 서버에 저장하지 않는다.** DB 없음, 로그인 없음, 요청 본문 로깅 없음.
  입력값은 브라우저 `sessionStorage` 에만 두고 탭을 닫으면 사라진다.
- 자세한 규칙과 구조는 [CLAUDE.md](CLAUDE.md), 데이터 계약은 [contracts/](contracts/) 에 있다.
