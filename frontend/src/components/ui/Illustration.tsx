/**
 * 화면에 쓰는 그림.
 *
 * - 파일 이미지 대신 인라인 SVG 로 그린다. 라이트·다크에서 같은 토큰을 쓰고, 확대해도 깨지지 않는다.
 * - 사람이나 표정을 그리지 않는다. 동정을 부르는 그림을 쓰지 않기로 했다.
 * - 한 화면에 하나만 쓴다. 장식용 효과를 넣지 않는다.
 */
import styles from './ui.module.css'

const COLUMNS = 4
const CELL = 36
const GAP = 8

/**
 * 시작 화면의 그림.
 * 달력 칸을 늘어놓고 앞쪽을 채워, "지원이 여기까지 남았다"를 형태로만 보여준다.
 */
export function SupportCalendarFigure() {
  const cells = Array.from({ length: 12 }, (_, index) => index)
  const filledUntil = 7
  const size = COLUMNS * CELL + (COLUMNS - 1) * GAP

  return (
    <div className={styles.figure}>
      <svg
        width={size}
        height={3 * CELL + 2 * GAP}
        viewBox={`0 0 ${size} ${3 * CELL + 2 * GAP}`}
        fill="none"
        role="img"
        aria-label="지원이 남은 기간을 달력 칸으로 나타낸 그림"
      >
        {cells.map((index) => {
          const x = (index % COLUMNS) * (CELL + GAP)
          const y = Math.floor(index / COLUMNS) * (CELL + GAP)
          const isFilled = index < filledUntil

          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={CELL}
              height={CELL}
              rx="10"
              className={isFilled ? styles.figCellFilled : styles.figCellEmpty}
            />
          )
        })}
      </svg>
    </div>
  )
}

/** 다 마쳤을 때 쓰는 표시. 아이콘 크기(24~40px) 안에서 그린다. */
export function DoneMark() {
  return (
    <div className={styles.figureSmall}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        role="img"
        aria-label="다 마쳤어요"
      >
        <circle cx="20" cy="20" r="19" className={styles.doneCircle} />
        <path
          d="M12 20.5l5.5 5.5L28 15"
          className={styles.doneCheck}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  )
}
