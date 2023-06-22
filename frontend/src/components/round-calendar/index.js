import './style.scss';


const degToRad = (deg) => {
    return deg * Math.PI / 180;
}

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

const describeArc = (x, y, radius, startAngle, endAngle) => {

    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}

const LETTERS_OFFSET_DEG = 3;

const TOTAL_DEG = 360;

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august',
    'september', 'october', 'november', 'december'];
const MONTHS_COUNT = 12;
export const RoundCalendar = () => {

    const degPerMonth = TOTAL_DEG / MONTHS_COUNT - 2;

    const lettersInAMonth = 14;

    const renderLetterLine = (letter, degStep, letterMoveX, isReversed) => {
        const transformStyle = `rotate(${degStep}deg) translate(0, ${letterMoveX}px)`;
        return <div className={'round-calendar-line'}
                    style={{transform: transformStyle}}>
            <div className={`round-calendar-line-month-letter ${isReversed ? 'reversed' : ''}`}>
                {letter}
            </div>
        </div>
    }
    const renderMonthLetters = () => {
        return MONTHS.map((month, monthIndex) => {
                {
                    const isReversed = 3 <monthIndex && monthIndex < 9;
                    const monthLetters = isReversed ? month.split('').reverse() : month.split('');
                    return monthLetters.map((letter, letterIdx) => {
                        const degStep = (monthIndex) * degPerMonth + ((letterIdx) * degPerMonth / lettersInAMonth) + LETTERS_OFFSET_DEG;
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
        for (let i = 0; i < MONTHS_COUNT; i++) {
            const isOdd = i % 2 === 0;
            const move = isOdd ? 0 : 15;
            lines.push(<path
                d={`${describeArc(400, 400, 372 + move, i * degPerMonth, i * degPerMonth + degPerMonth)}`}
                fill="none"
                stroke="#aca89b"
                strokeWidth="1"/>)
        }
        return lines;
    }

    const renderBlueLine = (radius) => {
        return <>
            <path
            d={`${describeArc(400, 400, radius , 0, degPerMonth * (MONTHS_COUNT))}`}
            fill="none"
            stroke="#b8dad4"
            strokeDasharray={`${degToRad(degPerMonth) * radius}`}
            strokeWidth="30"
            strokeLinecap="round"
            />
            <path
                d={`${describeArc(400, 400, radius , 0, 10)}`}
                fill="none"
                stroke="#d6e7df"
                strokeDashoffset={`${degToRad(degPerMonth) * radius}`}
                strokeWidth="30"
                strokeLinecap="round"
            />
            <path
                d={`${describeArc(400, 400, radius , 0, degPerMonth * (MONTHS_COUNT))}`}
                fill="none"
                stroke="#d6e7df"
                strokeDashoffset={`${degToRad(degPerMonth) * radius}`}
                strokeDasharray={`${degToRad(degPerMonth) * radius}`}
                strokeWidth="30"
                // strokeLinecap="round"
            />
        </>
    }

    const renderSvgBackground = () => {
        return <svg width="800" height="800">
            {renderMonthUnderlines()}
            {renderBlueLine(320)}
            {renderBlueLine(280)}
            {renderBlueLine(240)}
            {renderBlueLine(200)}
        </svg>;
    }


    return (
        <div>
            <h1>Round Calendar</h1>
            <div className={'round-calendar-container'}>
                <div className="round-calendar">
                    <div className="round-calendar-gradient-bg"></div>
                    {renderSvgBackground()}
                    {renderMonthLetters()}
                </div>
            </div>
        </div>
    );
}