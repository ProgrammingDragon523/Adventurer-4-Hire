export function getJobDuration(start, end) {
    const startMonthNum = new Date(start).getMonth() + 1;
    const startYears = start.split(" ")[1]

    const endMonthNum = new Date(end).getMonth() + 1;
    const endYears = end.split(" ")[1]

    let yearsExp = 0
    let monthExp = 0

    if (startMonthNum === endMonthNum) {
        yearsExp = endYears - startYears
    }
    else if (startMonthNum > endMonthNum) {
        yearsExp = endYears - startYears - 1
        monthExp = 12 - (startMonthNum - endMonthNum)
    }
    else {
        yearsExp = endYears - startYears
        monthExp = endMonthNum - startMonthNum
    }

    return {
        monthExp: monthExp,
        yearsExp: yearsExp
    }
}