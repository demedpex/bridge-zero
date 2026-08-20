# 브릿지 제로

자립준비청년을 위한 금융 계획 서비스. 이 저장소에는 **온보딩 입력 화면과 엔진에 넘기는 지점까지**가 들어 있다.

## 절대 규칙

### R1. 사용자 데이터를 서버에 저장하지 않는다

- 사용자 정보를 담는 테이블·파일·전역변수·캐시를 만들지 않는다 (DB·ORM 없음)
- 로그인·세션·쿠키·JWT를 만들지 않는다 (그래서 CORS 도 `allow_credentials=False`)
- 입력값은 브라우저에만 둔다. 저장은 `sessionStorage` 까지만. **`localStorage` 금지**
- API 는 POST 로 받는다. 쿼리스트링 금지 — URL 은 액세스 로그에 남는다
- 요청 본문을 로깅하지 않는다. 로그에 남기는 것은 요청 ID·엔드포인트·소요시간·상태코드뿐
  → `backend/app/middleware/request_log.py`, 테스트 `backend/tests/test_no_body_logging.py`
- 422 응답에도 사용자가 보낸 값을 담지 않는다 → `backend/app/errors.py`

### R2. 입력란을 만들지 않는 항목

이름 · 연락처 · 이메일 · 생년월일 · 시설명 · 보호 사유 · 가족 관계 · 상세 주소

### R3. 계산하지 않는다

회차·소득 환산·자격 판정·순서 최적화는 전부 **엔진 담당자의 몫**이다.
프론트도 백엔드도 값을 받아 형식을 맞춰 넘기기만 한다.

- 엔진 경계: `backend/app/domain/clock/interface.py`
- 지금 붙어 있는 것: `stub.py` (고정 응답). 교체 지점은 `provider.py` 한 줄

## 문구 규칙 (토스 UX 가이드)

출처: https://developers-apps-in-toss.toss.im/design/consumer-ux-guide

- 모든 문구는 **해요체**. 버튼·안내·에러 전부 (에러 문구는 화면에 그대로 나간다)
- 능동형 · 긍정형 · 과도한 경어 금지 · 동사에서 `~시` 빼기
- 다이얼로그 왼쪽 버튼은 "닫기" (["취소"는 쓰지 않는다])
- CTA 는 무슨 일이 일어나는지 알 수 있게 — "확인" ✕ / "다음", "계산하기" ○
- 진입 차단 바텀시트·이탈 유도 없음. **모든 화면에 뒤로가기가 있다**
- 동정을 유발하는 문구·일러스트를 쓰지 않는다

### TDS 를 쓰지 않는다

토스 디자인 시스템은 앱인토스 서비스 범위 안에서만 쓸 수 있다.
이 서비스는 앱인토스 밖이므로 **패키지 설치·코드 복사 금지**.
같은 역할의 자체 컴포넌트를 `frontend/src/components/ui/` 에 직접 만들어 두었다.

### 그림

- 파일 이미지 대신 **인라인 SVG** 로 그린다 (`frontend/src/components/ui/Illustration.tsx`).
  라이트·다크에서 같은 색 토큰을 쓰고, 확대해도 깨지지 않는다. 색은 CSS 클래스로 준다 —
  SVG 속성에 `var()` 를 직접 넣으면 브라우저마다 해석이 갈린다
- **한 화면에 하나만.** 아이콘은 24~40px. 아이콘·이모지를 두 개 이상 나란히 놓지 않는다
- 사람·표정·동정을 부르는 그림을 그리지 않는다. 장식용 효과도 넣지 않는다

### 우리가 정한 값

폰트 크기·여백·버튼 높이·라운드·브랜드 컬러는 위 가이드에 기준이 없다.
**토스 규칙이라고 표기하지 말 것.** `frontend/src/constants/design.ts` 와
`frontend/src/styles/global.css` 에 우리 값으로 둔다.

## 구조

```
contracts/          공유 데이터 계약 문서
frontend/           React + TypeScript + Vite + Zustand
  src/types/        UserProfile · BenefitClock (백엔드와 필드명이 같아야 한다)
  src/constants/    선택지 코드값 · 시도 코드 · 우리가 정한 치수
  src/store/        입력 초안(sessionStorage) · 요청 상태
  src/components/ui 자체 UI 컴포넌트
  src/steps/        단계 화면 0~13
backend/            FastAPI + Pydantic v2 (DB 없음)
  app/schemas/      UserProfile · BenefitClock
  app/domain/clock/ 엔진 경계 (interface · stub · provider)
  app/middleware/   본문을 남기지 않는 요청 로깅
  tests/
```

## 실행

```bash
# 백엔드
cd backend && .venv/Scripts/python.exe -m uvicorn app.main:app --port 8000

# 프론트 (다른 터미널)
cd frontend && npm run dev     # http://localhost:5173, /api 는 :8000 으로 프록시

# 테스트
cd backend && .venv/Scripts/python.exe -m pytest
cd frontend && npm run typecheck
```

## 이번 작업 범위 밖

결과 화면(타임라인·자격 카드·순서 비교) · 정책 데이터 조회 · 수집기 · LLM · 검색 · 계산 로직
