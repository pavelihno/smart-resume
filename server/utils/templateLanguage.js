export const TEMPLATE_LANGUAGE_BY_SUFFIX = Object.freeze({
	en: 'en-US',
	ru: 'ru-RU',
});

export const DEFAULT_TEMPLATE_SUFFIX = 'en';
export const DEFAULT_TEMPLATE_NAME = `default_${DEFAULT_TEMPLATE_SUFFIX}`;

const LEGACY_TEMPLATE_ALIASES = Object.freeze({
	default: DEFAULT_TEMPLATE_NAME,
});

const getTemplateSuffix = (templateName = '') => {
	const normalized = String(templateName).trim().toLowerCase();
	if (!normalized) {
		return DEFAULT_TEMPLATE_SUFFIX;
	}
	const segments = normalized.split('_').filter(Boolean);
	if (segments.length === 0) {
		return DEFAULT_TEMPLATE_SUFFIX;
	}
	return segments[segments.length - 1];
};

export const resolveTemplateName = (templateName) => {
	const normalized = String(templateName ?? '').trim();
	if (!normalized) {
		return DEFAULT_TEMPLATE_NAME;
	}
	const alias = LEGACY_TEMPLATE_ALIASES[normalized.toLowerCase()];
	return alias || normalized;
};

export const getLocaleFromTemplateName = (templateName) => {
	const suffix = getTemplateSuffix(templateName);
	return TEMPLATE_LANGUAGE_BY_SUFFIX[suffix] || TEMPLATE_LANGUAGE_BY_SUFFIX[DEFAULT_TEMPLATE_SUFFIX];
};
