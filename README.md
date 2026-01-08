Hey there! I am Siddhant. This is Submission of interesting problem that i solve - aggregating date-based data by day of the week with smart interpolation for missing days.


# What does it do?
Ever had a dataset with dates and values, and wanted to see the pattern by day of the week? That's exactly what this does. Plus, if you're missing data for certain days, it'll fill in the gaps intelligently using interpolation.
->> The Problem
Given a bunch of dates with values, I needed to:

Group them by day of week (Monday through Sunday)
Sum up values that fall on the same day
Fill in missing days using the average of surrounding days

Sounds simple, but the edge cases (like wrapping from Sunday to Monday) made it fun to solve.
Quick Start


# Clone the repo
git clone https://github.com/SiddhantVgaikwad/TaskSubmission

# Run the tests
node solution.js
That's it! You should see all tests passing.
->>> Example Usage
const solution = require('./solution.js');

// Your data with some dates
const data = {
  '2020-01-01': 4,
  '2020-01-02': 4,
  '2020-01-03': 6,
  '2020-01-04': 8,
  '2020-01-05': 2,
  '2020-01-06': -6,
  '2020-01-07': 2,
  '2020-01-08': -2
};

const result = solution(data);
console.log(result);
// Output: { Mon: -6, Tue: 2, Wed: 2, Thu: 4, Fri: 6, Sat: 8, Sun: 2 }
How It Works
The algorithm does three main things:

Parses dates - Converts YYYY-MM-DD strings to day names
Aggregates values - Sums up values for each day of the week
Interpolates gaps - Uses linear interpolation to fill missing days

The tricky part was handling the circular nature of weeks (Sunday wraps back to Monday). I used modulo arithmetic to keep everything smooth.
Test Cases
I've included 6 different test cases covering:

# Basic aggregation
Linear interpolation for missing days
Multiple dates on the same day
Negative values
Edge cases with minimal data

Run node solution.js to see them all pass.
