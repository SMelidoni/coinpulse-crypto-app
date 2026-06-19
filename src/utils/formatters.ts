type NullableNumber = number | null | undefined;

type ChangeClassNameOptions = {
	increaseClassName?: string;
	decreaseClassName?: string;
	neutralClassName?: string;
	zeroClassName?: string;
};

export const isValidNumber = (value: NullableNumber): value is number =>
	typeof value === 'number' && Number.isFinite(value);

export const formatCurrency = (
	value: NullableNumber,
	options?: Intl.NumberFormatOptions,
) => {
	if (!isValidNumber(value)) {
		return 'N/A';
	}

	return `£${value.toLocaleString('en-GB', options)}`;
};

export const formatPercentage = (value: NullableNumber) => {
	if (!isValidNumber(value)) {
		return 'N/A';
	}

	return `${value.toFixed(2)}%`;
};

export const getChangeClassName = (
	value: NullableNumber,
	{
		increaseClassName = 'increase',
		decreaseClassName = 'decrease',
		neutralClassName = 'neutral',
		zeroClassName = decreaseClassName,
	}: ChangeClassNameOptions = {},
) => {
	if (!isValidNumber(value)) {
		return neutralClassName;
	}

	if (value > 0) {
		return increaseClassName;
	}

	if (value < 0) {
		return decreaseClassName;
	}

	return zeroClassName;
};

export const formatCompactNumber = (value: NullableNumber) => {
	if (!isValidNumber(value)) {
		return 'N/A';
	}

	const absoluteValue = Math.abs(value);

	if (absoluteValue >= 1.0e12) return `${(value / 1.0e12).toFixed(2)}T`;
	if (absoluteValue >= 1.0e9) return `${(value / 1.0e9).toFixed(2)}B`;
	if (absoluteValue >= 1.0e6) return `${(value / 1.0e6).toFixed(2)}M`;
	if (absoluteValue >= 1.0e3) return `${(value / 1.0e3).toFixed(2)}K`;

	return value.toFixed(2);
};

export const formatCompactCurrency = (value: NullableNumber) => {
	const formattedValue = formatCompactNumber(value);

	return formattedValue === 'N/A' ? formattedValue : `£${formattedValue}`;
};

export const formatRelativeDateTime = (timestamp: NullableNumber) => {
	if (!isValidNumber(timestamp)) {
		return 'not available';
	}

	const date = new Date(timestamp);

	if (Number.isNaN(date.getTime())) {
		return 'not available';
	}

	const now = new Date();
	const yesterday = new Date(now);
	yesterday.setDate(now.getDate() - 1);

	const time = new Intl.DateTimeFormat(undefined, {
		hour: '2-digit',
		minute: '2-digit',
	}).format(date);

	if (date.toDateString() === now.toDateString()) {
		return `Today at ${time}`;
	}

	if (date.toDateString() === yesterday.toDateString()) {
		return `Yesterday at ${time}`;
	}

	return new Intl.DateTimeFormat(undefined, {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	}).format(date);
};
