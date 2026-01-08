//Siddhant Gaikwad - 08/01/2025
//Coding Task Solution

function solution(D) {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; 
  const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Initialize result with all days set to null
  const result = {};
  dayOrder.forEach(day => result[day] = null);
  
  // Aggregate values by day of week
  const daySums = {};
  const dayCounts = {};
  
  for (const dateStr in D) {
    const date = new Date(dateStr);
    const dayIndex = date.getDay(); // 0 = Sunday, 6 = Saturday
    const dayName = dayNames[dayIndex];
    
    if (!daySums[dayName]) {
      daySums[dayName] = 0;
      dayCounts[dayName] = 0;
    }
    
    daySums[dayName] += D[dateStr];
    dayCounts[dayName]++;
  }
  
  // Fill in known values
  for (const day in daySums) {
    result[day] = daySums[day];
  }
  
  //I need to handle circular interpolation (Sun wraps to Mon)
  const filledDays = dayOrder.filter(day => result[day] !== null);
  
  // If all days are filled, return result
  if (filledDays.length === 7) {
    return result; 
  }
  
  // Find missing days and interpolate
  for (let i = 0; i < dayOrder.length; i++) {
    const currentDay = dayOrder[i];
    
    if (result[currentDay] === null) {
      let prevIdx = i - 1;
      let steps = 0;
      while (result[dayOrder[(prevIdx + 7) % 7]] === null && steps < 7) {
        prevIdx--;
        steps++;
      }
      prevIdx = (prevIdx + 7) % 7;
      
      let nextIdx = i + 1;
      steps = 0;
      while (result[dayOrder[nextIdx % 7]] === null && steps < 7) {
        nextIdx++;
        steps++;
      }
      nextIdx = nextIdx % 7;
      
      const prevValue = result[dayOrder[prevIdx]];
      const nextValue = result[dayOrder[nextIdx]];
      

      let distFromPrev = (i - prevIdx + 7) % 7;
      let distToNext = (nextIdx - i + 7) % 7;
      
      if (distFromPrev + distToNext > 7) {
        distFromPrev = 7 - distToNext;
      }
      
      const totalDist = distFromPrev + distToNext;
      
      result[currentDay] = Math.round(
        prevValue + ((nextValue - prevValue) * distFromPrev) / totalDist
      );
    }
  }
  
  return result;
}
//---------------------------------------------------------------------------------//
// Unit Tests
// function to run unit tests
function runTests() {
  console.log('Running Unit Tests...........\n');
  
  let passed = 0;
  let failed = 0;
  
  function assertEqual(actual, expected, testName) {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    
    if (actualStr === expectedStr) {
      console.log(`✓ PASS: ${testName}`);
      passed++;
    } else {
      console.log(`✗ FAIL: ${testName}`);
      console.log(`  Expected: ${expectedStr}`);
      console.log(`  Actual:   ${actualStr}`);
      failed++;
    }
  }
  
  // Test 1: Basic example 
  const test1Input = {
    '2020-01-01': 4,
    '2020-01-02': 4,
    '2020-01-03': 6,
    '2020-01-04': 8,
    '2020-01-05': 2,
    '2020-01-06': -6,
    '2020-01-07': 2,
    '2020-01-08': -2
  };
  const test1Expected = {
    Mon: -6,
    Tue: 2,
    Wed: 2,
    Thu: 4,
    Fri: 6,
    Sat: 8,
    Sun: 2
  };
  assertEqual(solution(test1Input), test1Expected, 'Test 1: Basic aggregation');
  
  // Test 2: Interpolation example 
  const test2Input = {
    '2020-01-01': 6,
    '2020-01-04': 12,
    '2020-01-05': 14,
    '2020-01-06': 2,
    '2020-01-07': 4
  };
  const test2Expected = {
    Mon: 2,
    Tue: 4,
    Wed: 6,
    Thu: 8,
    Fri: 10,
    Sat: 12,
    Sun: 14
  };
  assertEqual(solution(test2Input), test2Expected, 'Test 2: Linear interpolation');
  
  // Test 3: Multiple dates on same day
  const test3Input = {
    '2020-01-06': 10,  // Monday
    '2020-01-13': 5,   // Monday
    '2020-01-07': 8,   // Tuesday
    '2020-01-08': 6,   // Wednesday
    '2020-01-09': 4,   // Thursday
    '2020-01-10': 2,   // Friday
    '2020-01-11': 1,   // Saturday
    '2020-01-05': 3    // Sunday
  };
  const test3Expected = {
    Mon: 15,  // 10 + 5
    Tue: 8,
    Wed: 6,
    Thu: 4,
    Fri: 2,
    Sat: 1,
    Sun: 3
  };
  assertEqual(solution(test3Input), test3Expected, 'Test 3: Multiple dates on same day');
  
  // Test 4: Negative values
  const test4Input = {
    '2020-01-06': -10,  // Monday
    '2020-01-07': -5,   // Tuesday
    '2020-01-08': 0,    // Wednesday
    '2020-01-09': 5,    // Thursday
    '2020-01-10': 10,   // Friday
    '2020-01-11': 15,   // Saturday
    '2020-01-12': 20    // Sunday
  };
  const test4Expected = {
    Mon: -10,
    Tue: -5,
    Wed: 0,
    Thu: 5,
    Fri: 10,
    Sat: 15,
    Sun: 20
  };
  assertEqual(solution(test4Input), test4Expected, 'Test 4: Negative values');
  
  // Test 5: Single missing day in middle
  const test5Input = {
    '2020-01-06': 10,  // Monday
    '2020-01-07': 20,  // Tuesday
    // Wednesday missing
    '2020-01-09': 40,  // Thursday
    '2020-01-10': 50,  // Friday
    '2020-01-11': 60,  // Saturday
    '2020-01-12': 70   // Sunday
  };
  const test5Expected = {
    Mon: 10,
    Tue: 20,
    Wed: 30,  // (20 + 40) / 2
    Thu: 40,
    Fri: 50,
    Sat: 60,
    Sun: 70
  };
  assertEqual(solution(test5Input), test5Expected, 'Test 5: Single missing day interpolation');
  
  // Test 6: Only Monday and Sunday (minimum requirement)
  const test6Input = {
    '2020-01-06': 0,   // Monday
    '2020-01-12': 60   // Sunday
  };
  const test6Expected = {
    Mon: 0,
    Tue: 10,
    Wed: 20,
    Thu: 30,
    Fri: 40,
    Sat: 50,
    Sun: 60
  };
  assertEqual(solution(test6Input), test6Expected, 'Test 6: Only Mon & Sun with interpolation');
  
  console.log(`\n${'='.repeat(40)}`);
  console.log(`Total: ${passed + failed} | Passed: ${passed} | Failed: ${failed}`);
  console.log('='.repeat(40));
}

// Run tests
runTests();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = solution;
}