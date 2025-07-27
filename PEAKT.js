function calculate() {
      const input1 = parseFloat(document.getElementById("input1").value) || 0;
      const input2 = parseFloat(document.getElementById("input2").value) || 0;
      const input3 = parseFloat(document.getElementById("input3").value) || 0;
      const input4 = parseFloat(document.getElementById("input4").value) || 0;

      const multiply = input2 * input3 * 0.2;
      const amount = input1 - multiply;
      const availBuyback = input4 - amount;
      const qtybuy = availBuyback / input3;

      
      document.getElementById("output3").innerText = "AVAIL FOR BUYBACK: ₹" + availBuyback.toFixed(2);
      document.getElementById("output6").innerText = "QTY FOR BUYBACK: " + qtybuy.toFixed(2);
    }