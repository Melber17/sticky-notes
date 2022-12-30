export const formatCreatedDate = (date: Date, symbol = "/") => {
	let hours = date.getHours();
	const numberDays = formatSingleDigit(date.getDate());
	const numberMonths = formatSingleDigit(date.getMonth() + 1);
	const createdDateYear = date.getFullYear();
	const minutes = formatSingleDigit(date.getMinutes());
	const formateHours = hours >= 12 ? "PM" : "AM";

	hours = hours % 12;
	hours = hours ? hours : 12;
	const dateTime = hours + ":" + minutes + " " + formateHours;

	return numberMonths + symbol + numberDays + symbol + createdDateYear + "  " + dateTime;
};

const formatSingleDigit = (date: number) => {
	if (date < 10) {
		return `0${date}`;
	}

	return date;
};
