/// <reference types="@sveltejs/kit" />

type Reading = {
	value: number;
	timestamp: Date;
	unit: string;
};

type AQ_Reading = {
	pm10: number;
	pm25: number;
	timestamp: Date;
	unit: string;
};
