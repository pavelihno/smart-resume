const DEFAULT_LOCALE = 'en-US';

const normalizeLocale = (locale) => {
	if (typeof locale !== 'string' || locale.trim().length === 0) {
		return DEFAULT_LOCALE;
	}
	return locale.trim();
};

const getMonthLabel = (year, month, style = 'short', locale = DEFAULT_LOCALE) => {
	const date = new Date(Date.UTC(year, Math.max(0, Math.min(11, month - 1)), 1));
	const formatter = new Intl.DateTimeFormat(normalizeLocale(locale), {
		month: style === 'long' ? 'long' : 'short',
		timeZone: 'UTC',
	});
	return formatter.format(date).replace(/\.$/, '');
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

export const formatDayMonthYear = (value, { monthStyle = 'long', locale = DEFAULT_LOCALE } = {}) => {
	const parts = getDateParts(value);
	if (!parts) {
		return '';
	}
	const monthLabel = getMonthLabel(parts.year, parts.month, monthStyle, locale);
	return `${parts.day} ${monthLabel} ${parts.year}`;
};

export const formatMonthYear = (value, { monthStyle = 'short', includeYear = true, locale = DEFAULT_LOCALE } = {}) => {
	const parts = getDateParts(value);
	if (!parts) {
		return '';
	}
	const monthLabel = getMonthLabel(parts.year, parts.month, monthStyle, locale);
	return includeYear ? `${monthLabel} ${parts.year}` : monthLabel;
};
