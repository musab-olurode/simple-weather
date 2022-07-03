import type { NextPage } from 'next';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { ErrorIcon } from '../components/icons/error';
import SearchIcon from '../components/icons/search';
import {
	CurrentWeather,
	Forecast,
	FormattedForecast,
} from '../interfaces/open-weather-map';
import {
	getCityCoordinates,
	getCurrentWeather,
	getForecast,
} from '../utils/request';
import { themes } from 'src/utils/constants';

const Home: NextPage = () => {
	const locations = [
		{ name: 'Lagos', country: 'NG' },
		{ name: 'Abuja', country: 'NG' },
		{ name: 'London', country: 'GB' },
		{ name: 'Los Angeles', country: 'US' },
		{ name: 'Paris', country: 'FR' },
	];
	const [errorMessage, setErrorMessage] = useState('');
	const [location, setLocation] = useState<{
		name?: string;
		lat?: number;
		lng?: number;
	}>({
		name: undefined,
		lat: undefined,
		lng: undefined,
	});
	const [selectedLocation, setSelectedLocation] = useState({
		city: '',
	});
	const [selectedDay, setSelectedDay] = useState({
		city: '-',
		weather: {
			id: 900,
			main: '',
			description: '',
			icon: '',
		},
		date: Date.now(),
		dateString: new Date(Date.now()).toString(),
		clouds: 0,
		humidity: 0,
		wind: 0,
		visibility: 0,
		pressure: 0,
		temperature: 0,
	});
	const [days, setDays] = useState([
		[
			{
				city: '-',
				weather: {
					id: 0,
					main: '',
					description: '',
					icon: '',
				},
				date: Date.now(),
				dateString: new Date(Date.now()).toString(),
				clouds: 0,
				humidity: 0,
				wind: 0,
				visibility: 0,
				pressure: 0,
				temperature: 0,
			},
		],
	]);
	const [loading, setLoading] = useState(false);

	const getFullDate = () => {
		const dateObj = new Date(selectedDay.dateString);
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

	const getShortDate = (date: number) => {
		const dateObj = new Date(date);
		const day = dateObj.getDate();
		const hours = dateObj.getHours();
		const minutes = dateObj.getMinutes();
		const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' });
		const year = dateObj.getFullYear();
		const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
		const formattedHours = hours < 10 ? `0${hours}` : hours;
		const dateString = `${day} ${monthName} ${year} - ${formattedHours}:${formattedMinutes}`;
		return dateString;
	};

	const getWeatherTheme = () => {
		let theme: { image: string; icon: string };
		if (selectedDay.weather.id < 600) {
			theme = themes.rain;
		} else if (selectedDay.weather.id < 700) {
			theme = themes.snow;
		} else if (selectedDay.weather.id < 800) {
			theme = themes.wind;
		} else if (selectedDay.weather.id == 800) {
			theme = themes.sun;
		} else if (selectedDay.weather.id <= 804) {
			theme = themes.clouds;
		} else {
			theme = themes.none;
		}
		return theme;
	};

	const groupForecastByDay = (forecast: Forecast): FormattedForecast[][] => {
		const actualForecast = forecast.list.filter(
			(day) => new Date(day.dt_txt).getDate() != new Date().getDate()
		);
		const groupedForecast = actualForecast.reduce((acc, day) => {
			const date = new Date(day.dt_txt).getDate();
			if (!acc.some((day) => new Date(day[0].date).getDate() === date)) {
				acc.push([
					{
						city: forecast.city.name,
						weather: day.weather[0],
						date: new Date(day.dt_txt).getTime(),
						dateString: new Date(day.dt_txt).toString(),
						clouds: day.clouds.all,
						humidity: day.main.humidity,
						wind: day.wind.speed,
						visibility: day.visibility,
						pressure: day.main.pressure,
						temperature: day.main.temp,
					},
				]);
			} else {
				const index = acc.findIndex(
					(day) => new Date(day[0].date).getDate() === date
				);
				acc[index].push({
					city: forecast.city.name,
					weather: day.weather[0],
					date: new Date(day.dt_txt).getTime(),
					dateString: new Date(day.dt_txt).toString(),
					clouds: day.clouds.all,
					humidity: day.main.humidity,
					wind: day.wind.speed,
					visibility: day.visibility,
					pressure: day.main.pressure,
					temperature: day.main.temp,
				});
			}
			return acc;
		}, [] as FormattedForecast[][]);
		// filter grouped forecast to only show the next 4 days
		return groupedForecast.filter((day, index) => index < 4);
	};

	const getWeatherForeCast = async (selectedCity?: string) => {
		setLoading(true);
		NProgress.start();
		try {
			let forecast: Forecast;
			let currentWeather: CurrentWeather;
			// check if the currently selected city needs its coordinates to be fetched
			const city = locations.find((loc) => loc.name === selectedCity);
			if (city) {
				const cityCoordinates = await getCityCoordinates(
					city.name.replace(/ /g, '-'),
					city.country
				);
				forecast = await getForecast(cityCoordinates.lat, cityCoordinates.lon);
				currentWeather = await getCurrentWeather(
					cityCoordinates.lat,
					cityCoordinates.lon
				);
			} else {
				// city is user location, check if the user has granted permission to access their location
				if (location.lat && location.lng) {
					forecast = await getForecast(location.lat, location.lng);
					currentWeather = await getCurrentWeather(location.lat, location.lng);
				} else {
					// user has not granted permission to access their location
					setErrorMessage(
						'This website requires access to your location to work properly'
					);
					setLoading(false);
					NProgress.done();
					setTimeout(() => {
						setErrorMessage('');
					}, 5000);
					return;
				}
			}
			handleWeatherData(currentWeather, forecast);
		} catch (error: any) {
			setLoading(false);
			NProgress.done();
			setErrorMessage(error.message);
			setTimeout(() => {
				setErrorMessage('');
			}, 5000);
		}
	};

	const onSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelectedLocation({ city: event.target.value });
	};

	const handleWeatherData = (
		currentWeather: CurrentWeather,
		forecast: Forecast
	) => {
		const groupedForecast = groupForecastByDay(forecast);
		setSelectedDay({
			city: selectedLocation.city || currentWeather.name,
			weather: currentWeather.weather[0],
			date: new Date(currentWeather.dt).getTime(),
			dateString: new Date(currentWeather.dt * 1000).toString(),
			clouds: currentWeather.clouds.all,
			humidity: currentWeather.main.humidity,
			wind: currentWeather.wind.speed,
			visibility: currentWeather.visibility,
			pressure: currentWeather.main.pressure,
			temperature: currentWeather.main.temp,
		});
		setDays(groupedForecast);
		setLoading(false);
		NProgress.done();
	};

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const currentWeather = await getCurrentWeather(
					position.coords.latitude,
					position.coords.longitude
				);
				const forecast = await getForecast(
					position.coords.latitude,
					position.coords.longitude
				);
				setLocation({
					name: forecast.city.name,
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
				handleWeatherData(currentWeather, forecast);
			},
			(error) => {
				let message: string;
				if (error.code === 1) {
					message =
						'This website requires access to your location to work properly';
				} else {
					message = error.message;
				}
				setErrorMessage(message);
				setTimeout(() => {
					setErrorMessage('');
				}, 5000);
			}
		);
	}, []);

	return (
		<div className='h-screen w-screen bg-gray-500 fixed overflow-auto'>
			{errorMessage && (
				<div className='alert alert-error shadow-lg absolute top-0 left-0 z-20 w-auto text-white'>
					<div>
						<ErrorIcon />
						<span>{errorMessage}</span>
					</div>
				</div>
			)}
			<div className='flex flex-col lg:flex-row absolute bg-transparent w-full lg:h-full text-white z-10'>
				<section className='w-full lg:w-8/12 h-full p-5 md:p-24 flex flex-col'>
					<p>simple.weather</p>
					<span className='text-9xl self-end md:hidden'>
						{selectedDay.temperature}°
					</span>
					<div className='mt-4 md:mt-auto flex items-end'>
						<span className='text-9xl self-end hidden md:block'>
							{selectedDay.temperature}°
							<div className='mr-10 hidden md:flex xl:hidden flex-col overflow-x-auto'>
								<span className='text-6xl mb-2'>{selectedDay.city}</span>
								<span className='text-2xl'>{getFullDate()}</span>
							</div>
						</span>
						<div className='mr-10 md:mx-10 md:hidden xl:flex flex flex-col overflow-x-auto'>
							<span className='text-6xl mb-2'>{selectedDay.city}</span>
							<span className='text-2xl'>{getFullDate()}</span>
						</div>
						<div>
							<span className='text-4xl'>{getWeatherTheme().icon}</span> <br />{' '}
							<div className='text-2xl'>{selectedDay.weather.main}</div>
						</div>
					</div>
				</section>
				<aside className='w-full lg:w-4/12 mt-7 md:mt-0 bg-gray-100 bg-opacity-[0.001] backdrop-blur-3xl flex flex-col flex-grow lg:flex-grow-0 overflow-hidden'>
					<div className='flex items-end pl-5 lg:pl-14'>
						<select
							className='select flex-grow pl-0 mr-10 text-gray-100 bg-transparent rounded-none border-x-0 border-t-0 border-gray-100 border-b-2 focus:outline-none disabled:bg-transparent disabled:hover:cursor-not-allowed'
							onChange={onSelectCity}
							disabled={loading}>
							<option className='text-black' disabled value={'-'}>
								Select Location
							</option>
							<option className='text-black' value={location.name}>
								Your Location
							</option>
							{locations.map((loc, index) => {
								return (
									<option
										className='text-black'
										value={loc.name}
										key={`location-${index}`}>
										{loc.name}
									</option>
								);
							})}
						</select>
						<button
							className='btn btn-ghost rounded-none p-10 flex place-content-center bg-gray-300 text-black no-animation hover:disabled:cursor-not-allowed'
							disabled={loading}
							data-testid='get-forecast-btn'
							onClick={() => getWeatherForeCast(selectedLocation.city)}>
							<SearchIcon />
						</button>
					</div>

					<div className='mt-20 px-5 lg:px-14 flex flex-col flex-grow overflow-hidden'>
						<p className='text-white border-b-white border-b-2'>
							Weather Forecast
						</p>

						<div className='my-2 carousel w-full'>
							{days.map((day, index) => (
								<div
									id={`slide${index + 1}`}
									data-testid='subsequent-forecast'
									className='carousel-item relative w-full flex-col h-full'
									key={index}>
									{day.map((forecast, forecastIndex) => {
										return (
											<div
												className='flex flex-col gap-y-7 w-full'
												key={forecastIndex}>
												<div className='flex justify-between transform mt-10'>
													{forecastIndex == 0 && (
														<a
															href={`#slide${
																index == 0 ? days.length : days.length - 1
															}`}
															className='btn btn-ghost btn-square rounded-none bg-gray-300 text-black'>
															❮
														</a>
													)}
													<div className='text-center mx-auto'>
														{getShortDate(forecast.date)}
													</div>
													{forecastIndex == 0 && (
														<a
															href={`#slide${
																index == days.length - 1 ? 1 : index + 2
															}`}
															className='btn btn-ghost btn-square rounded-none bg-gray-300 text-black'>
															❯
														</a>
													)}
												</div>
												<div className='flex justify-between'>
													Clouds <span>{forecast.clouds}%</span>
												</div>
												<div className='flex justify-between'>
													Humidity <span>{forecast.humidity}%</span>
												</div>
												<div className='flex justify-between'>
													Wind <span>{forecast.wind}m/s</span>
												</div>
												<div className='flex justify-between'>
													Visibility <span>{forecast.visibility}m</span>
												</div>
												<div className='flex justify-between'>
													Pressure <span>{forecast.pressure}hPa</span>
												</div>
												<div className='flex justify-between'>
													Temperature <span>{forecast.temperature}°c</span>
												</div>
											</div>
										);
									})}
								</div>
							))}
						</div>
					</div>
				</aside>
			</div>
			<div className='object-cover h-full w-full brightness-50 -z-10 fixed'>
				<Image
					src={getWeatherTheme().image}
					layout='fill'
					alt='pictorial representation of the current weather'
				/>
			</div>
		</div>
	);
};

export default Home;
