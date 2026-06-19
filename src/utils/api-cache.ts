const CACHE_PREFIX = 'coinpulse-api-cache:';

type CacheEntry<T> = {
	data: T;
	expiresAt: number;
	updatedAt?: number;
};

type CachedJsonOptions = {
	ttlMs: number;
	useStaleOnError?: boolean;
};

export type CacheMetadata = {
	expiresAt: number;
	isStale: boolean;
	updatedAt: number | null;
};

const inFlightRequests = new Map<string, Promise<unknown>>();

export class ApiRequestError extends Error {
	status: number;

	constructor(status: number, message: string) {
		super(message);
		this.name = 'ApiRequestError';
		this.status = status;
	}
}

const getCacheKey = (url: string) => `${CACHE_PREFIX}${url}`;

const readCache = <T>(url: string): CacheEntry<T> | null => {
	try {
		const cachedValue = window.localStorage.getItem(getCacheKey(url));

		if (!cachedValue) {
			return null;
		}

		return JSON.parse(cachedValue) as CacheEntry<T>;
	} catch {
		return null;
	}
};

const writeCache = <T>(url: string, entry: CacheEntry<T>) => {
	try {
		window.localStorage.setItem(getCacheKey(url), JSON.stringify(entry));
	} catch {
		// Cache writes can fail in private browsing or storage pressure. The API call still succeeded.
	}
};

export const getCachedData = <T>(url: string): T | null => {
	return readCache<T>(url)?.data ?? null;
};

export const getCacheMetadata = (url: string): CacheMetadata | null => {
	const cachedEntry = readCache<unknown>(url);

	if (!cachedEntry) {
		return null;
	}

	return {
		expiresAt: cachedEntry.expiresAt,
		isStale: cachedEntry.expiresAt <= Date.now(),
		updatedAt: cachedEntry.updatedAt ?? null,
	};
};

export const getCachedJson = async <T>(
	url: string,
	{ ttlMs, useStaleOnError = true }: CachedJsonOptions,
): Promise<T> => {
	const now = Date.now();
	const cachedEntry = readCache<T>(url);

	if (cachedEntry && cachedEntry.expiresAt > now) {
		if (!cachedEntry.updatedAt) {
			writeCache(url, {
				...cachedEntry,
				updatedAt: cachedEntry.expiresAt - ttlMs,
			});
		}

		return cachedEntry.data;
	}

	const cacheKey = getCacheKey(url);
	const existingRequest = inFlightRequests.get(cacheKey) as Promise<T> | undefined;

	if (existingRequest) {
		return existingRequest;
	}

	const request = fetch(url)
		.then(async (response) => {
			if (!response.ok) {
				throw new ApiRequestError(response.status, response.statusText);
			}

			const data = (await response.json()) as T;
			const updatedAt = Date.now();
			writeCache(url, {
				data,
				expiresAt: updatedAt + ttlMs,
				updatedAt,
			});

			return data;
		})
		.catch((error) => {
			if (useStaleOnError && cachedEntry) {
				return cachedEntry.data;
			}

			throw error;
		})
		.finally(() => {
			inFlightRequests.delete(cacheKey);
		});

	inFlightRequests.set(cacheKey, request);

	return request;
};
