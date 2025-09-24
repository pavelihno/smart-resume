const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const getMonthLabel = (month, style = 'short') => {
	const collection = style === 'long' ? MONTHS_LONG : MONTHS_SHORT;
	return collection[Math.max(0, Math.min(collection.length - 1, month - 1))];
};

export const parseDateValue = (value) => {
	if (!value) {
		return null;
	}
	if (value instanceof Date) {
		return new Date(value.getTime());
	}
	const parsed = new Date(value);
	return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export const getDateParts = (value) => {
	const date = parseDateValue(value);
	if (!date) {
		return null;
	}
	const [year, month, day] = date.toISOString().split('T')[0].split('-').map(Number);
	return { year, month, day };
};

export const formatDayMonthYear = (value, { monthStyle = 'long' } = {}) => {
	const parts = getDateParts(value);
	if (!parts) {
		return '';
	}
	const monthLabel = getMonthLabel(parts.month, monthStyle);
	return `${parts.day} ${monthLabel} ${parts.year}`;
};

export const formatMonthYear = (value, { monthStyle = 'short', includeYear = true } = {}) => {
	const parts = getDateParts(value);
	if (!parts) {
		return '';
	}
	const monthLabel = getMonthLabel(parts.month, monthStyle);
	return includeYear ? `${monthLabel} ${parts.year}` : monthLabel;
};
