# contracts

프론트(TypeScript)와 백엔드(Python)가 공유하는 데이터 계약이다.
**엔진 담당자와 합의된 필드명이므로 임의로 바꾸지 않는다.**

| 계약 | Python | TypeScript |
|---|---|---|
| `UserProfile` | `backend/app/schemas/profile.py` | `frontend/src/types/profile.ts` |
| `Scenario` | `backend/app/schemas/profile.py` | `frontend/src/types/profile.ts` |
| `BenefitClock` | `backend/app/schemas/clock.py` | `frontend/src/types/clock.ts` |

## TODO — 확정되지 않은 것

- **`BenefitClock`의 실제 필드 구성이 미확정이다.**
  이 저장소에는 스캐폴딩된 `contracts/` 정의가 없었다.
  현재는 스텁 응답을 주고받을 수 있는 최소 형태(`remaining_count`, `engine`)로만 두었다.
  엔진 담당자에게서 정식 정의를 받으면 `clock.py` / `clock.ts` 를 그대로 교체한다.
- `region_code` 는 시·도 2자리 + `"000"` 형태만 쓴다. 시·군·구 목록 데이터가 아직 없다.
- `education_status` / `employment_status` 의 코드값은 프론트 상수 파일에 두었다.
  서버(또는 정책 데이터)에서 내려주는 방식으로 바꿀 수 있게 분리해 두었다.
