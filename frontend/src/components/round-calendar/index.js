import './style.scss';
import {
    CALENDAR_RADIUS,
    DEG_PER_MONTH,
    LETTERS_IN_A_MONTH,
    LETTERS_OFFSET_DEG,
    MONTHS,
    MONTHS_COUNT,
} from "./constants";
import {degToRad, describeArc} from "./utils";
import moment from "moment";


export const RoundCalendar = () => {

    const renderLetterLine = (letter, degStep, letterMoveX, isReversed) => {
        const transformStyle = `rotate(${degStep}deg) translate(0, ${letterMoveX}px)`;
        return <div className={'round-calendar-month-letter-line'}
                    style={{
                        transform: transformStyle,
                        height: `${CALENDAR_RADIUS}px`,
                    }}>
            <div className={`round-calendar-month-letter-line__letter ${isReversed ? 'reversed' : ''}`}>
                {letter}
            </div>
        </div>
    }
    const renderMonthLetters = () => {
        return MONTHS.map((month, monthIndex) => {
                {
                    const isReversed = 3 < monthIndex && monthIndex < 9;
                    const monthLetters = isReversed ? month.split('').reverse() : month.split('');
                    return monthLetters.map((letter, letterIdx) => {
                        const degStep = (monthIndex) * DEG_PER_MONTH + ((letterIdx) * DEG_PER_MONTH / LETTERS_IN_A_MONTH) + LETTERS_OFFSET_DEG;
                        const isOdd = monthIndex % 2 === 0;
                        const move = isOdd ? 0 : -15;
                        return renderLetterLine(letter, degStep, move, isReversed)
                    })
                }

            }
        )
    }

    const renderMonthUnderlines = () => {
        const lines = [];
        const shift = 15;

        for (let i = 0; i < MONTHS_COUNT; i++) {
            const isOdd = i % 2 === 0;
            const move = isOdd ? shift : 0;
            lines.push(<path
                d={`${describeArc(CALENDAR_RADIUS / 2, CALENDAR_RADIUS / 2, CALENDAR_RADIUS / 2 - move - shift, i * DEG_PER_MONTH, i * DEG_PER_MONTH + DEG_PER_MONTH)}`}
                fill="none"
                stroke="#aca89b"
                strokeWidth="1"/>)
        }
        return lines;
    }

    const renderBlueLine = (radius) => {
        return <>
            <path
                d={`${describeArc(CALENDAR_RADIUS / 2, CALENDAR_RADIUS / 2, radius, 0, DEG_PER_MONTH * (MONTHS_COUNT))}`}
                fill="none"
                stroke="#b8dad4"
                strokeDasharray={`${degToRad(DEG_PER_MONTH) * radius}`}
                strokeWidth="30"
                strokeLinecap="round"
            />
            <path
                d={`${describeArc(CALENDAR_RADIUS / 2, CALENDAR_RADIUS / 2, radius, 0, 10)}`}
                fill="none"
                stroke="#d6e7df"
                strokeDashoffset={`${degToRad(DEG_PER_MONTH) * radius}`}
                strokeWidth="30"
                strokeLinecap="round"
            />
            <path
                d={`${describeArc(CALENDAR_RADIUS / 2, CALENDAR_RADIUS / 2, radius, 0, DEG_PER_MONTH * (MONTHS_COUNT))}`}
                fill="none"
                stroke="#d6e7df"
                strokeDashoffset={`${degToRad(DEG_PER_MONTH) * radius}`}
                strokeDasharray={`${degToRad(DEG_PER_MONTH) * radius}`}
                strokeWidth="30"
                // strokeLinecap="round"
            />
        </>
    }

    const renderDayLines = () => {
        return <path
            d={`${describeArc(CALENDAR_RADIUS / 2, CALENDAR_RADIUS / 2, CALENDAR_RADIUS * 0.36, 0, DEG_PER_MONTH * (MONTHS_COUNT))}`}
            fill="none"
            stroke="red"
            strokeDasharray={`1 3`}
            strokeWidth="240"
        />
    }


    const renderSvgBackground = () => {

        const radius1 = CALENDAR_RADIUS * 0.4;
        const radius2 = CALENDAR_RADIUS * 0.36;
        const radius3 = CALENDAR_RADIUS * 0.32;
        const radius4 = CALENDAR_RADIUS * 0.28;

        return <svg width={CALENDAR_RADIUS} height={CALENDAR_RADIUS}>
            {renderMonthUnderlines()}
            {renderBlueLine(radius1)}
            {renderBlueLine(radius2)}
            {renderBlueLine(radius3)}
            {renderBlueLine(radius4)}
            {renderDayLines()}
        </svg>;
    }


    const renderMonthDays = () => {
        const days = [];
        for (let i = 0; i < MONTHS_COUNT; i++) {
            // const isOdd = false;
            const isOdd = i % 2 === 0;
            const move = isOdd ? 0 : -15;
            const monthDays = [];
            const daysCount = moment().month( i ).daysInMonth();
            for (let j = 0; j < daysCount; j++) {
                const degStep = (i) * DEG_PER_MONTH + ((j) * DEG_PER_MONTH / daysCount);
                const dayDeg = degStep + j * (DEG_PER_MONTH / daysCount);
                const dayMove = isOdd ? 0 : -15;
                const dayRadius = move + dayMove;
                monthDays.push(<div className={'round-calendar-day-line'}
                                    style={{
                                        transform: `rotate(${degStep}deg)`,
                                        height: `${CALENDAR_RADIUS * 0.9}px`,
                                        top: `${CALENDAR_RADIUS * 0.05}px`,
                                        // borderLeft: j % 2 === 0 ? '1px solid #aca89b' : '',
                                    }}>
                    <div className={`round-calendar-day-line__letter ${isOdd ? 'reversed' : ''}`} style={{
                        width: (degToRad(360/365) * (CALENDAR_RADIUS/2 * 0.9)),
                        transform: `rotate(${270}deg)`,
                    }}>
                        {j + 1}
                    </div>
                </div>)
            }
            days.push(monthDays);
        }
        return days;
    }

    return (
        <div>
            <h1>Round Calendar</h1>
            <div className={'round-calendar-container'}>
                <div className={'round-calendar-container-content'}>
                    <div className="round-calendar" style={{
                        width: `${CALENDAR_RADIUS}px`,
                        paddingBottom: `${CALENDAR_RADIUS}px`,
                        transform: 'scale(1)',
                    }}>
                        <div className="round-calendar__gradient-bg"></div>
                        {renderSvgBackground()}
                        {renderMonthLetters()}
                        {renderMonthDays()}
                    </div>
                </div>
            </div>
        </div>
    );
}