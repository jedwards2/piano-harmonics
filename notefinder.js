var data = [
  { num: "88", frq: "4186.009" },
  { num: "87", frq: "3951.066" },
  { num: "86", frq: "3729.310" },
  { num: "85", frq: "3520.000" },
  { num: "84", frq: "3322.438" },
  { num: "83", frq: "3135.963" },
  { num: "82", frq: "2959.955" },
  { num: "81", frq: "2793.826" },
  { num: "80", frq: "2637.020" },
  { num: "79", frq: "2489.016" },
  { num: "78", frq: "2349.318" },
  { num: "77", frq: "2217.461" },
  { num: "76", frq: "2093.005" },
  { num: "75", frq: "1975.533" },
  { num: "74", frq: "1864.655" },
  { num: "73", frq: "1760.000" },
  { num: "72", frq: "1661.219" },
  { num: "71", frq: "1567.982" },
  { num: "70", frq: "1479.978" },
  { num: "69", frq: "1396.913" },
  { num: "68", frq: "1318.510" },
  { num: "67", frq: "1244.508" },
  { num: "66", frq: "1174.659" },
  { num: "65", frq: "1108.731" },
  { num: "64", frq: "1046.502" },
  { num: "63", frq: "987.7666" },
  { num: "62", frq: "932.3275" },
  { num: "61", frq: "880.0000" },
  { num: "60", frq: "830.6094" },
  { num: "59", frq: "783.9909" },
  { num: "58", frq: "739.9888" },
  { num: "57", frq: "698.4565" },
  { num: "56", frq: "659.2551" },
  { num: "55", frq: "622.2540" },
  { num: "54", frq: "587.3295" },
  { num: "53", frq: "554.3653" },
  { num: "52", frq: "523.2511" },
  { num: "51", frq: "493.8833" },
  { num: "50", frq: "466.1638" },
  { num: "49", frq: "440.0000" },
  { num: "48", frq: "415.3047" },
  { num: "47", frq: "391.9954" },
  { num: "46", frq: "369.9944" },
  { num: "45", frq: "349.2282" },
  { num: "44", frq: "329.6276" },
  { num: "43", frq: "311.1270" },
  { num: "42", frq: "293.6648" },
  { num: "41", frq: "277.1826" },
  { num: "40", frq: "261.6256" },
  { num: "39", frq: "246.9417" },
  { num: "38", frq: "233.0819" },
  { num: "37", frq: "220.0000" },
  { num: "36", frq: "207.6523" },
  { num: "35", frq: "195.9977" },
  { num: "34", frq: "184.9972" },
  { num: "33", frq: "174.6141" },
  { num: "32", frq: "164.8138" },
  { num: "31", frq: "155.5635" },
  { num: "30", frq: "146.8324" },
  { num: "29", frq: "138.5913" },
  { num: "28", frq: "130.8128" },
  { num: "27", frq: "123.4708" },
  { num: "26", frq: "116.5409" },
  { num: "25", frq: "110.0000" },
  { num: "24", frq: "103.8262" },
  { num: "23", frq: "97.99886" },
  { num: "22", frq: "92.49861" },
  { num: "21", frq: "87.30706" },
  { num: "20", frq: "82.40689" },
  { num: "19", frq: "77.78175" },
  { num: "18", frq: "73.41619" },
  { num: "17", frq: "69.29566" },
  { num: "16", frq: "65.40639" },
  { num: "15", frq: "61.73541" },
  { num: "14", frq: "58.27047" },
  { num: "13", frq: "55.00000" },
  { num: "12", frq: "51.91309" },
  { num: "11", frq: "48.99943" },
  { num: "10", frq: "46.24930" },
  { num: "9", frq: "43.65353" },
  { num: "8", frq: "41.20344" },
  { num: "7", frq: "38.89087" },
  { num: "6", frq: "36.70810" },
  { num: "5", frq: "34.64783" },
  { num: "4", frq: "32.70320" },
  { num: "3", frq: "30.86771" },
  { num: "2", frq: "29.13524" },
  { num: "1", frq: "27.50000" },
];

autowatch = 1;
inlets = 1;
outlets = 2;

function findNotes(num) {
  var exactNotes = [];
  var closeNotes = [];

  var frq = findFrq(num);
  // var undertones = generateUndertones(frq);
  var overtones = generateOvertones(frq);

  // var partials = undertones.concat(overtones);
  var partials = overtones;
  var i = 0;
  while (i < partials.length) {
    var q = 0;
    while (q < data.length) {
      //add to exact notes list
      if (checkIfExact(Number(data[q].frq), partials[i])) {
        exactNotes.push(data[q].num);
      }
      // add to around notes list
      // if (checkIfClose(Number(data[q].frq), partials[i])) {
      //   closeNotes.push(data[q].num);
      // }
      q += 1;
    }
    i += 1;
  }

  outlet(0, exactNotes);
  outlet(1, closeNotes);
}

function checkIfExact(data, partial) {
  var upperBound = partial * 1.009;
  var lowerBound = partial * 0.999;
  if (data < upperBound && data > lowerBound) {
    return true;
  } else {
    return false;
  }
}

function checkIfClose(data, partial) {
  var upperBound = partial * 1.05;
  var lowerBound = partial * 0.95;
  if (data < upperBound && data > lowerBound) {
    return true;
  } else {
    return false;
  }
}

function findFrq(number) {
  var frq = "";
  var i = 0;
  while (i < data.length) {
    if (data[i].num.toString() == number) {
      frq = data[i].frq;
    }
    i += 1;
  }
  return frq;
}

function generateOvertones(frq) {
  var partials = [];
  var partial = frq;
  var i = 2;

  while (partial < 4200) {
    newFrq = parseFloat(frq) * i;
    newFrq = parseFloat(newFrq.toFixed(5));
    partials.push(newFrq);
    partial = newFrq;
    i += 1;
  }
  return partials;
}

function generateUndertones(frq) {
  var partials = [];
  var partial = frq;
  var i = 2;

  while (partial > 15) {
    newFrq = parseFloat(frq) / i;
    newFrq = parseFloat(newFrq.toFixed(5));
    partials.unshift(newFrq);
    partial = newFrq;
    i += 1;
  }

  return partials;
}
