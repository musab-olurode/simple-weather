export interface Forecast {
	cod: string;
	message: number;
	cnt: number;
	list: {
		dt: number;
		main: {
			temp: number;
			feels_like: number;
			temp_min: number;
			temp_max: number;
			pressure: number;
			sea_level: number;
			grnd_level: number;
			humidity: number;
			temp_kf: number;
		};
		weather: {
			id: number;
			main: string;
			description: string;
			icon: string;
		}[];
		clouds: {
			all: number;
		};
		wind: {
			speed: number;
			deg: number;
		};
		visibility: number;
		pop: number;
		sys: {
			pod: string;
		};
		dt_txt: string;
	}[];
	city: {
		id: number;
		name: string;
		coord: {
			lat: number;
			lon: number;
		};
		country: string;
		population: number;
		timezone: number;
		sunrise: number;
		sunset: number;
	};
}

export interface FormattedForecast {
	city: string;
	weather: {
		id: number;
		main: string;
		description: string;
		icon: string;
	};
	date: number;
	dateString: string;
	clouds: number;
	humidity: number;
	wind: number;
	visibility: number;
	pressure: number;
	temperature: number;
}

export interface CurrentWeather {
	coord: {
		lon: number;
		lat: number;
	};
	weather: {
		id: number;
		main: string;
		description: string;
		icon: string;
	}[];
	base: string;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		sea_level: number;
		grnd_level: number;
		humidity: number;
		temp_kf: number;
	};
	visibility: number;
	wind: {
		speed: number;
		deg: number;
		gust: number;
	};
	rain: {
		'1h': number;
	};
	clouds: {
		all: number;
	};
	dt: number;
	sys: {
		country: string;
		sunrise: number;
		sunset: number;
	};
	timezone: number;
	id: number;
	name: string;
	cod: number;
}
