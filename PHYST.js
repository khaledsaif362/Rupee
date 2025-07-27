let symbolsFromFile = [];

document.getElementById('datFile').addEventListener('change', function(event) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const lines = e.target.result.split('\n');
    symbolsFromFile = lines.map(line => {
      const cols = line.split(',');
      return cols[1]?.trim().toUpperCase(); // 2nd column = symbol
    }).filter(Boolean);
    alert("DAT file loaded with " + symbolsFromFile.length + " symbols.");
  };
  reader.readAsText(event.target.files[0]);
});

function calculate() {
  const symbol = document.getElementById("symbol").value.trim().toUpperCase();
  const ltp = parseFloat(document.getElementById("ltp").value);
  const qty = parseInt(document.getElementById("qty").value);
  const strike = parseFloat(document.getElementById("strike").value);
  const varPercent = parseFloat(document.querySelector('input[name="day"]:checked').value);
  const optionType = document.querySelector('input[name="optionType"]:checked').value;

  if (!symbol || isNaN(ltp) || isNaN(qty) || isNaN(strike)) {
    alert("Please fill all fields correctly.");
    return;
  }

  if (!symbolsFromFile.includes(symbol)) {
    alert("Symbol not found in uploaded file.");
    return;
  }

  let physicalMargin = "no physical margin";
  if ((optionType === "CE" && ltp > strike) || (optionType === "PE" && ltp < strike)) {
    physicalMargin = ((ltp * qty * varPercent) / 100).toFixed(2);
  }

  const tableRow = `<tr>
    <td>${symbol}</td>
    <td>${qty}</td>
    <td>${varPercent}%</td>
    <td>${physicalMargin}</td>
  </tr>`;

  document.getElementById("outputBody").innerHTML = tableRow;
}