#!/usr/bin/env node
import moment from "moment-timezone";
// Create a help string
const helpText = `Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.`;

// Get arguments from CMD
const args = minimist(process.argv.slice(2));

// Process options
if (args.h) {
    console.log(helpText);
    process.exit(0);
}

const lat = args.n || args.s * -1;
const long = args.e || args.w * -1;

const timezone = args.z || moment.tz.guess() ;

const day = args.d || 1;

const json = args.j;

// Make a request
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude='+lat+'&longitude='+long+'&timezone='+timezone+'&daily=precipitation_hours');

// Get the data from the request
const data = await response.json();

// If json only return json
if (json) {
    console.log(data);
    process.exit(0);
}

// Get what day to report for
const days = args.d 

// Check if need your galoshes
data.daily.precipitation_hours[day] > 0 ? conosole.log('You might need your galoshes ') : conosole.log('You will not need your galoshes  ');

// Report for given day
if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
}