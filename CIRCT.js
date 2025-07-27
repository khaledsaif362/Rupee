function calculate() {
      const close = parseFloat(document.getElementById('close').value);
      const lower = parseFloat(document.getElementById('lowerCkt').value);
      const upper = parseFloat(document.getElementById('upperCkt').value);
      const ltp = parseFloat(document.getElementById('ltp').value);
      const blockPct = parseFloat(document.getElementById('blockPct').value);
      const unblockPct = parseFloat(document.getElementById('unblockPct').value);

      if (isNaN(close) || isNaN(lower) || isNaN(upper) || isNaN(ltp)) {
        document.getElementById('output').innerHTML = "<span class='blocked'>Please enter all valid values.</span>";
        return;
      }

      // Thresholds
      const downBlock = close - ((close - lower) * blockPct / 100);
      const upBlock = close - ((close - upper) * blockPct / 100);
      const downUnblock = close - ((close - lower) * unblockPct / 100);
      const upUnblock = close - ((close - upper) * unblockPct / 100);

      let status = "", explanation = "";

      if (ltp <= downBlock) {
        status = "<span class='blocked'>Buy Order Blocked</span>";
        explanation = `LTP ₹${ltp} is below buy block threshold (₹${downBlock.toFixed(2)}). New buy orders are blocked.`;
      } 
      else if (ltp >= upBlock) {
        status = "<span class='blocked'>Sell Order Blocked</span>";
        explanation = `LTP ₹${ltp} is above sell block threshold (₹${upBlock.toFixed(2)}). New sell orders are blocked.`;
      } 
      else if (ltp >= downUnblock && ltp <= upUnblock) {
        status = "<span class='unblocked'>Order Unblocked</span>";
        explanation = `LTP ₹${ltp} is within unblock range (₹${downUnblock.toFixed(2)} - ₹${upUnblock.toFixed(2)}). Order entry allowed.`;
      } 
      else {
        status = "<span class='unblocked'>Order Not Blocked</span>";
        explanation = `LTP ₹${ltp} is outside block zone but not yet in unblock range. Order entry allowed.`;
      }

      document.getElementById('output').innerHTML = `
        <span class="label">Status:</span> ${status}<br>
        <span class="label">Explanation:</span> ${explanation}<br><br>
        <span class="label">Buy Block Threshold (≤):</span> <span class="range">₹${downBlock.toFixed(2)}</span><br>
        <span class="label">Buy Unblock Threshold (≥):</span> <span class="range">₹${downUnblock.toFixed(2)}</span><br>
        <span class="label">Sell Block Threshold (≥):</span> <span class="range">₹${upBlock.toFixed(2)}</span><br>
        <span class="label">Sell Unblock Threshold (≤):</span> <span class="range">₹${upUnblock.toFixed(2)}</span>
      `;
    }