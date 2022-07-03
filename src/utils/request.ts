import { CurrentWeather, Forecast } from '../interfaces/open-weather-map';

const openWeatherMapBaseUrl = process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_BASE_URL;
const openWeatherMapAppId = process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_APP_ID;

export const request = async (path: string, options?: Partial<RequestInit>) => {
	const headers = {
		'Content-Type': 'application/json',
		...options?.headers,
	};

	const response = await fetch(
		`https://thingproxy.freeboard.io/fetch/${openWeatherMapBaseUrl}${path}`,
		{
			method: 'GET',
			...options,
			headers,
		}
	);

	const result = await response.json();

	return result;
};

export const getCityCoordinates = async (city: string, country: string) => {
	const result = await request(
		`/geo/1.0/direct?q=${city},country=${country}&appid=${openWeatherMapAppId}`
	);

	return result[0];
};

export const getCurrentWeather = async (
	lat: number,
	lng: number
): Promise<CurrentWeather> => {
	const result = await request(
		`/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${openWeatherMapAppId}&units=metric`
	);

	return result;
};

export const getForecast = async (
	lat: number,
	lng: number
): Promise<Forecast> => {
	const result = await request(
		`/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${openWeatherMapAppId}&units=metric`
	);

	return result;
};
