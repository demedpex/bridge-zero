import type { JSX } from 'react'

import { STEP, useOnboarding } from '../store/onboarding'
import { Step0Intro } from './Step0Intro'
import { Step10FixedExpense } from './Step10FixedExpense'
import { Step11Status } from './Step11Status'
import { Step12Review } from './Step12Review'
import { Step13Result } from './Step13Result'
import { Step1ExitStatus } from './Step1ExitStatus'
import { Step2ExitType } from './Step2ExitType'
import { Step3AllowanceCount } from './Step3AllowanceCount'
import { Step4AllowanceApplied } from './Step4AllowanceApplied'
import { Step5AllowanceSuspended } from './Step5AllowanceSuspended'
import { Step6Settlement } from './Step6Settlement'
import { Step7Region } from './Step7Region'
import { Step8ResidenceSince } from './Step8ResidenceSince'
import { Step9Income } from './Step9Income'

const SCREENS: Record<number, () => JSX.Element> = {
  [STEP.INTRO]: Step0Intro,
  [STEP.EXIT_STATUS]: Step1ExitStatus,
  [STEP.EXIT_TYPE]: Step2ExitType,
  [STEP.ALLOWANCE_COUNT]: Step3AllowanceCount,
  [STEP.ALLOWANCE_APPLIED]: Step4AllowanceApplied,
  [STEP.ALLOWANCE_SUSPENDED]: Step5AllowanceSuspended,
  [STEP.SETTLEMENT]: Step6Settlement,
  [STEP.REGION]: Step7Region,
  [STEP.RESIDENCE_SINCE]: Step8ResidenceSince,
  [STEP.INCOME]: Step9Income,
  [STEP.FIXED_EXPENSE]: Step10FixedExpense,
  [STEP.STATUS]: Step11Status,
  [STEP.REVIEW]: Step12Review,
  [STEP.RESULT]: Step13Result,
}

export function Onboarding() {
  const step = useOnboarding((state) => state.step)
  const Screen = SCREENS[step] ?? Step0Intro
  return <Screen />
}
