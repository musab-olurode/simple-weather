/* eslint-disable @next/next/no-img-element */
// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

jest.mock('next/image', () => ({
	__esModule: true,
	default: (props) => {
		// eslint-disable-next-line jsx-a11y/alt-text
		return <img {...props} />;
	},
}));

const mockGeolocation = {
	getCurrentPosition: jest.fn(),
	watchPosition: jest.fn(),
};

global.navigator.geolocation = mockGeolocation;
