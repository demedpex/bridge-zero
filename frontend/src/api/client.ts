/**
 * 백엔드 호출.
 *
 * R1: 값은 전부 POST 본문에 싣는다. 쿼리스트링을 쓰지 않는다 — URL 은 액세스 로그에 남는다.
 */

import type { BenefitClock, FieldError } from '../types/clock'
import type { UserProfile } from '../types/profile'

export type ClockResult =
  | { ok: true; clock: BenefitClock }
  | { ok: false; errors: FieldError[] }

const NETWORK_ERROR: FieldError = {
  field: null,
  message: '연결이 잠깐 끊겼어요. 잠시 뒤에 다시 눌러 주세요',
  step: 12,
}

export async function requestClock(profile: UserProfile): Promise<ClockResult> {
  let response: Response
  try {
    response = await fetch('/api/v1/calc/clock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile }),
    })
  } catch {
    return { ok: false, errors: [NETWORK_ERROR] }
  }

  if (response.ok) {
    return { ok: true, clock: (await response.json()) as BenefitClock }
  }

  if (response.status === 422) {
    const body = (await response.json()) as { errors?: FieldError[] }
    return { ok: false, errors: body.errors?.length ? body.errors : [NETWORK_ERROR] }
  }

  return { ok: false, errors: [NETWORK_ERROR] }
}
