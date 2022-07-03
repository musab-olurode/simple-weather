import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Home from '../pages';
import { mockNavigatorGeolocation } from 'test-utils/mockNavigatorGeolocation';
import { act } from 'react-dom/test-utils';

let requestMockCityCoordinatesReturnedValue = [
	{
		name: 'Los Angeles',
		local_names: {
			mi: 'Ngā Ānahera',
			ja: 'ロサンゼルス',
			tt: 'Лос-Анджелес',
			be: 'Лос-Анджэлас',
			it: 'Los Angeles',
			ba: 'Лос-Анджелес',
			sr: 'Лос Анђелес',
			hi: 'लॉस एंजिलस',
			ru: 'Лос-Анджелес',
			es: 'Los Ángeles',
			pt: 'Los Angeles',
			th: 'ลอสแอนเจลิส',
			pl: 'Los Angeles',
			ta: 'லொஸ் ஆஞ்ஜெலெஸ்',
			fr: 'Los Angeles',
			ar: 'لوس أنجلس',
			bn: 'লোস আংজেলেস',
			eo: 'Los-Anĝeleso',
			uk: 'Лос-Анджелес',
			ko: '로스앤젤레스',
			lv: 'Losandželosa',
			kn: 'ಲೊಸ್ ಆಂಜೆಲೆಸ್',
			gl: 'Os Ánxeles',
			de: 'Los Angeles',
			en: 'Los Angeles',
			ka: 'ლოს-ანჯელესი',
			he: "לוס אנג'לס",
			fa: 'لوس آنجلس',
			oc: 'Los Angeles',
			zh: '洛杉矶',
			el: 'Λος Άντζελες',
		},
		lat: 34.0536909,
		lon: -118.242766,
		country: 'US',
		state: 'California',
	},
];

let requestMockCurrentWeatherReturnedValue = {
	coord: {
		lon: -0.13,
		lat: 51.51,
	},
	weather: [
		{
			id: 300,
			main: 'Drizzle',
			description: 'light intensity drizzle',
			icon: '09d',
		},
	],
	base: 'stations',
	main: {
		temp: 280.32,
		feels_like: 279.55,
		temp_min: 279.15,
		temp_max: 280.32,
		pressure: 1012,
		sea_level: 1012,
		grnd_level: 993,
		humidity: 88,
		temp_kf: 0.17,
	},
	visibility: 10000,
	wind: {
		speed: 4.1,
		deg: 80,
		gust: 5.3,
	},
	rain: {
		'1h': 0.59,
	},
	clouds: {
		all: 90,
	},
	dt: 1589465801,
	sys: {
		country: 'GB',
		sunrise: 1589470842,
		sunset: 1589509938,
	},
	timezone: 3600,
	id: 2643743,
	name: 'London',
	cod: 200,
};

let requestMockForecastReturnedValue = {
	cod: '200',
	message: 0,
	cnt: 40,
	list: [
		{
			dt: 1589465801,
			main: {
				temp: 280.32,
				feels_like: 279.55,
				temp_min: 279.15,
				temp_max: 280.32,
				pressure: 1012,
				sea_level: 1012,
				grnd_level: 993,
				humidity: 88,
				temp_kf: 0.17,
			},
			weather: [
				{
					id: 300,
					main: 'Drizzle',
					description: 'light intensity drizzle',
					icon: '09d',
				},
			],
			clouds: {
				all: 90,
			},
			wind: {
				speed: 4.1,
				deg: 80,
				gust: 5.3,
			},
			sys: {
				pod: 'd',
			},
			dt_txt: '2020-01-01 00:00:00',
		},
		{
			dt: 1577919600,
			main: {
				temp: 279.15,
				feels_like: 278.2,
				temp_min: 278.15,
				temp_max: 279.15,
				pressure: 1012,
				sea_level: 1012,
				grnd_level: 993,
				humidity: 88,
				temp_kf: 0.1,
			},
			weather: [
				{
					id: 300,
					main: 'Drizzle',
					description: 'light intensity drizzle',
					icon: '09d',
				},
			],
			clouds: {
				all: 90,
			},
			wind: {
				speed: 4.1,
				deg: 80,
				gust: 5.3,
			},
			sys: {
				pod: 'd',
			},
			dt_txt: '2020-01-02 00:00:00',
		},
		{
			dt: 1578006000,
			main: {
				temp: 279.15,
				feels_like: 278.2,
				temp_min: 278.15,
				temp_max: 279.15,
				pressure: 1012,
				sea_level: 1012,
				grnd_level: 993,
				humidity: 88,
				temp_kf: 0.1,
			},
			weather: [
				{
					id: 300,
					main: 'Drizzle',
					description: 'light intensity drizzle',
					icon: '09d',
				},
			],
			clouds: {
				all: 90,
			},
			wind: {
				speed: 4.1,
				deg: 80,
				gust: 5.3,
			},
			sys: {
				pod: 'd',
			},
			dt_txt: '2020-01-03 00:00:00',
		},
		{
			dt: 1578092400,
			main: {
				temp: 279.15,
				feels_like: 278.2,
				temp_min: 278.15,
				temp_max: 279.15,
				pressure: 1012,
				sea_level: 1012,
				grnd_level: 993,
				humidity: 88,
				temp_kf: 0.1,
			},
			weather: [
				{
					id: 300,
					main: 'Drizzle',
					description: 'light intensity drizzle',
					icon: '09d',
				},
			],
			clouds: {
				all: 90,
			},
			wind: {
				speed: 4.1,
				deg: 80,
				gust: 5.3,
			},
			sys: {
				pod: 'd',
			},
			dt_txt: '2020-01-04 00:00:00',
		},
		{
			dt: 1578178800,
			main: {
				temp: 279.15,
				feels_like: 278.2,
				temp_min: 278.15,
				temp_max: 279.15,
				pressure: 1012,
				sea_level: 1012,
				grnd_level: 993,
				humidity: 88,
				temp_kf: 0.1,
			},
			weather: [
				{
					id: 300,
					main: 'Drizzle',
					description: 'light intensity drizzle',
					icon: '09d',
				},
			],
			clouds: {
				all: 90,
			},
			wind: {
				speed: 4.1,
				deg: 80,
				gust: 5.3,
			},
			sys: {
				pod: 'd',
			},
			dt_txt: '2020-01-05 00:00:00',
		},
	],
	city: {
		id: 2643743,
		name: 'London',
		coord: {
			lat: 51.51,
			lon: -0.13,
		},
		country: 'GB',
		timezone: 3600,
		sunrise: 1589470842,
		sunset: 1589509938,
	},
};

jest.mock('../utils/request', () => {
	return {
		getCityCoordinates: jest.fn(() => {
			return new Promise((resolve) => {
				resolve(requestMockCurrentWeatherReturnedValue);
			});
		}),
		getCurrentWeather: jest.fn(() => {
			return new Promise((resolve) => {
				resolve(requestMockCurrentWeatherReturnedValue);
			});
		}),
		getForecast: jest.fn(() => {
			return new Promise((resolve) => {
				resolve(requestMockForecastReturnedValue);
			});
		}),
	};
});

const getFullDate = (dateStr: string) => {
	const dateObj = new Date(dateStr);
	const day = dateObj.getDate();
	const hours = dateObj.getHours();
	const minutes = dateObj.getMinutes();
	const year = dateObj.toLocaleDateString('en-US', { year: '2-digit' });
	const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
	const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' });
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
	const formattedHours = hours < 10 ? `0${hours}` : hours;
	const dateString = `${formattedHours}:${formattedMinutes} - ${dayName}, ${day} ${monthName} '${year}`;
	return dateString;
};

const locations = [
	{ name: 'Lagos', country: 'NG' },
	{ name: 'Abuja', country: 'NG' },
	{ name: 'London', country: 'GB' },
	{ name: 'Los Angeles', country: 'US' },
	{ name: 'Paris', country: 'FR' },
];

import { getCurrentWeather, getForecast } from '../utils/request';
import { themes } from 'src/utils/constants';

describe('Home component test', () => {
	it("should get the user's current location on page load", async () => {
		render(<Home />);

		await waitFor(() =>
			expect(global.navigator.geolocation.getCurrentPosition).toHaveBeenCalled()
		);
	});

	it("should get the user's weather forecast on page load if location permission is granted", async () => {
		(getCurrentWeather as jest.Mock).mockClear();
		(getForecast as jest.Mock).mockClear();

		const { getCurrentPositionMock } = mockNavigatorGeolocation();
		getCurrentPositionMock.mockImplementation((success, rejected) =>
			success({
				coords: {
					accuracy: 7291.900626454646,
					altitude: null,
					altitudeAccuracy: null,
					heading: null,
					latitude: -25.564989605009306,
					longitude: 21.08576020710187,
					speed: null,
				},
				timestamp: 1656858495925,
			})
		);

		render(<Home />);

		await waitFor(async () => {
			expect(getCurrentWeather).toHaveBeenCalled();
			await waitFor(() => expect(getForecast).toHaveBeenCalled());

			expect(getCurrentWeather).toHaveBeenCalledWith(
				-25.564989605009306,
				21.08576020710187
			);
			expect(getForecast).toHaveBeenCalledWith(
				-25.564989605009306,
				21.08576020710187
			);
		});
	});

	it('should display an error message on page load if location permission is denied', async () => {
		(getCurrentWeather as jest.Mock).mockClear();
		(getForecast as jest.Mock).mockClear();

		const { getCurrentPositionMock } = mockNavigatorGeolocation();
		getCurrentPositionMock.mockImplementation((success, reject) =>
			reject({
				code: 1,
				message: 'Permission denied',
			})
		);

		render(<Home />);

		await waitFor(
			async () =>
				await screen.findByText(
					'This website requires access to your location to work properly'
				)
		);
	});

	it("should get the user's weather forecast for the day on page load", async () => {
		(getCurrentWeather as jest.Mock).mockClear();
		(getForecast as jest.Mock).mockClear();

		const { getCurrentPositionMock } = mockNavigatorGeolocation();
		getCurrentPositionMock.mockImplementation((success, rejected) =>
			success({
				coords: {
					accuracy: 7291.900626454646,
					altitude: null,
					altitudeAccuracy: null,
					heading: null,
					latitude: -25.564989605009306,
					longitude: 21.08576020710187,
					speed: null,
				},
				timestamp: 1656858495925,
			})
		);

		render(<Home />);

		await waitFor(async () => {
			await screen.findAllByText(
				`${requestMockCurrentWeatherReturnedValue.main.temp}°`
			);
			await screen.findAllByText(
				`${requestMockCurrentWeatherReturnedValue.name}`
			);
			const formattedDate = getFullDate(
				new Date(requestMockCurrentWeatherReturnedValue.dt * 1000).toString()
			);
			await screen.findAllByText(formattedDate);
			await screen.findByText(
				requestMockCurrentWeatherReturnedValue.weather[0].main
			);
		});
	});

	it("should get the user's weather forecast for 4 subsequent days on page load", async () => {
		(getCurrentWeather as jest.Mock).mockClear();
		(getForecast as jest.Mock).mockClear();

		const { getCurrentPositionMock } = mockNavigatorGeolocation();
		getCurrentPositionMock.mockImplementation((success, rejected) =>
			success({
				coords: {
					accuracy: 7291.900626454646,
					altitude: null,
					altitudeAccuracy: null,
					heading: null,
					latitude: -25.564989605009306,
					longitude: 21.08576020710187,
					speed: null,
				},
				timestamp: 1656858495925,
			})
		);

		render(<Home />);

		await waitFor(async () => {
			const subsequentForecast = await screen.findAllByTestId(
				'subsequent-forecast'
			);
			expect(subsequentForecast.length).toBe(4);
		});
	});

	it('should show 5 cities as location options', async () => {
		(getCurrentWeather as jest.Mock).mockClear();
		(getForecast as jest.Mock).mockClear();

		const { getCurrentPositionMock } = mockNavigatorGeolocation();
		getCurrentPositionMock.mockImplementation((success, rejected) =>
			success({
				coords: {
					accuracy: 7291.900626454646,
					altitude: null,
					altitudeAccuracy: null,
					heading: null,
					latitude: -25.564989605009306,
					longitude: 21.08576020710187,
					speed: null,
				},
				timestamp: 1656858495925,
			})
		);

		render(<Home />);

		await waitFor(async () => {
			const cityOptions = screen
				.queryAllByRole('option')
				.filter(
					(option) =>
						option.textContent !== 'Select Location' &&
						option.textContent !== 'Your Location'
				);

			expect(cityOptions.length).toBe(5);

			locations.forEach((location, index) => {
				expect(
					cityOptions.findIndex(
						(option) => option.textContent === location.name
					)
				).toBeGreaterThan(-1);
			});
		});
	});

	it('should show the weather forecast for the selected city/location', async () => {
		(getCurrentWeather as jest.Mock).mockClear();
		(getForecast as jest.Mock).mockClear();

		const { getCurrentPositionMock } = mockNavigatorGeolocation();
		getCurrentPositionMock.mockImplementation((success, rejected) =>
			success({
				coords: {
					accuracy: 7291.900626454646,
					altitude: null,
					altitudeAccuracy: null,
					heading: null,
					latitude: -25.564989605009306,
					longitude: 21.08576020710187,
					speed: null,
				},
				timestamp: 1656858495925,
			})
		);

		render(<Home />);

		await waitFor(async () => {
			for (let i = 0; i < locations.length; i++) {
				const location = locations[i];
				requestMockCityCoordinatesReturnedValue[0] = {
					...requestMockCityCoordinatesReturnedValue[0],
					...location,
					lat: -25.564989605009306,
					lon: 21.08576020710187,
				};
				const cityChooser = screen.getByRole('combobox');
				const getForecastButton = screen.getByTestId('get-forecast-btn');

				fireEvent.change(cityChooser, { target: { value: location.name } });
				fireEvent.click(getForecastButton);

				expect(getCurrentWeather).toHaveBeenCalled();
				await waitFor(() => expect(getForecast).toHaveBeenCalled());

				expect(getCurrentWeather).toHaveBeenCalledWith(
					-25.564989605009306,
					21.08576020710187
				);
				expect(getForecast).toHaveBeenCalledWith(
					-25.564989605009306,
					21.08576020710187
				);

				await screen.findAllByText(`${location.name}`);
			}
		});
	});

	it('should show the proper theme based on current weather forecast', async () => {
		(getCurrentWeather as jest.Mock).mockClear();
		(getForecast as jest.Mock).mockClear();

		const { getCurrentPositionMock } = mockNavigatorGeolocation();
		getCurrentPositionMock.mockImplementation((success, rejected) =>
			success({
				coords: {
					accuracy: 7291.900626454646,
					altitude: null,
					altitudeAccuracy: null,
					heading: null,
					latitude: -25.564989605009306,
					longitude: 21.08576020710187,
					speed: null,
				},
				timestamp: 1656858495925,
			})
		);

		render(<Home />);

		const weatherThemes = [
			{ id: 500, ...themes.rain },
			{ id: 650, ...themes.snow },
			{ id: 750, ...themes.wind },
			{ id: 800, ...themes.sun },
			{ id: 802, ...themes.clouds },
		];

		await waitFor(async () => {
			for (let i = 0; i < weatherThemes.length; i++) {
				const theme = weatherThemes[i];

				requestMockCurrentWeatherReturnedValue = {
					...requestMockCurrentWeatherReturnedValue,
					weather: [
						{
							...requestMockCurrentWeatherReturnedValue.weather[0],
							id: theme.id,
						},
					],
				};

				const getForecastButton = screen.getByTestId('get-forecast-btn');
				fireEvent.click(getForecastButton);

				await screen.findByText(theme.icon);

				const themeImage = await screen.getByRole('img');
				expect(themeImage.getAttribute('src')).toBe(theme.image);
			}
		});
	});
});
