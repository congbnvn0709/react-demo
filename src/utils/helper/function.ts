export function formatDateDDMMYYYY(dateString: string) {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1; // Months are zero-based
    const year = dateObj.getFullYear();

    // Pad single-digit day/month with leading zero
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    // Return formatted date string
    return `${formattedDay}/${formattedMonth}/${year}`;
}
export function formatNumberWithCommas(number: number) {
    return number.toLocaleString();
}