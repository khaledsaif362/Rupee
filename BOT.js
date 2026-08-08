function generateContent() {
      const type = document.getElementById("fileType").value;
      const baseCode = document.getElementById("baseCode").value.trim();
      const count = parseInt(document.getElementById("recordCount").value);
      const date = new Date().toISOString().split("T")[0].replace(/-/g, "");

      if (!baseCode || isNaN(count) || count < 1) {
        alert("Please enter a valid base code and record count.");
        return null;
      }

      const prefix = baseCode.replace(/[0-9]/g, '');
      const startNum = parseInt(baseCode.replace(/\D/g, ''));
      let header = '', filename = '', rows = [];

      for (let i = 0; i < count; i++) {
        const num = startNum + i;
        const code = `${prefix}${num}`;
        switch (type) {
          case 'client':header=`RUPEE|CLT|${date}`;filename='client.txt';
          rows.push(`${code}|TEST A|${code}|HO|123456||vsatish.iuy@gm.com|4TH CROSS|Mumbai||1234567890||IN123456|NSDL|IN12345671234567||BSOOS8595P|NI|HDFC123456|560016|HDFC BANK|CHAMARAJAPET|A|Y|Y||||E||||07/12/1985||Q106|R16|IN12345678901234|A|B|C|7|Y|A123456789012345|||`);break;
        

case 'bank':header=`RUPEE|CBM|${date}`;filename='Bank_Update.txt';
          rows.push(`01|${code}|HDFC|1234567890|Y|HDFC0001234|`);break;
        

case 'product':header=`RUPEE|PROD_ALW|${date}`;filename='Product_Allowed.txt';
          rows.push(`${code}|${code}|MIS|NRML|CNC|MTF|CO|BO|NORMAL`);break;


case 'exchange':header=`RUPEE|EXCH_ALW|${date}`;filename='Segment_Allowed.txt';
          [["NSE","111111111111"],["BSEEQ","1111111111111"],["CDS","111111111111"],
           ["NSEFO","111111111111"],["BCR","1111111111111"],["BSEFO","1111111111111"],
           ["MCX","111111111111"],["NSEMF","111111111111"],["BSEMF","1111111111111"],
           ["NCDX","111111111111"],["BSECOM","1111111111111"]]
          .forEach(([ex,loc])=>rows.push(`${code}||${ex}|||${loc}`));break;
        

case 'limit':header=`RUPEE|CAP_LMT|${date}`;filename='CAP_Limit.txt';
          rows.push(`${code}|2000000|||||10|20|20000|||||30000|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|||||||||||||||`);break;


case 'incr_limit':header=`RUPEE|INCR_CAP_LMT|${date}`;filename='Incr_CAP_Limit.txt';
          rows.push(`${code}|3000|||||500|100|||||||||||||||||||||||||||||||||||||`);break;


case 'comlimit':header=`RUPEE|COM_LMT|${date}`;filename='COM_Limit.txt';
          rows.push(`${code}|3000000|||||100|200|40000|||||60000|150|160|170|180|190|200|210|220|230|240|250|260|270|280|290|300|||||||||||||||`);break;


case 'incr_comlimit':header=`RUPEE|INCR_COM_LMT|${date}`;filename='Incr_COM_Limit.txt';
          rows.push(`${code}|4000|||||300|200|||||||||||||||||||||||||||||||||||||`);break;







case 'DP':header=`RUPEE|${type.toUpperCase()}_HLD|${date}`;filename=`${type}_Holding.txt`;
          rows.push(`${code}|INE001A01036|59|0|1|59|10|500.00`);break;


case 'ben':header=`RUPEE|${type.toUpperCase()}_HLD|${date}`;filename=`${type}_Holding.txt`;
          rows.push(`${code}|INE001A01036|59|0|1|59|10|500.00`);break;


case 'obb':header=`RUPEE|${type.toUpperCase()}_HLD|${date}`;filename=`${type}_Holding.txt`;
          rows.push(`${code}|INE001A01036|59|0|1|59|10|500.00`);break;


case 'mtf':header=`RUPEE|${type.toUpperCase()}_HLD|${date}`;filename=`${type}_Holding.txt`;
          rows.push(`${code}|INE001A01036|59|0|1|59|10|500.00`);break;


case 'mtf_T1':header=`RUPEE|${type.toUpperCase()}|${date}`;filename=`${type}_Holding.txt`;
          rows.push(`${code}|INE001A01036|59|0|1|59|10|500.00`);break;
  




case 'indp':header=`RUPEE|${type.toUpperCase()}_HLD|${date}`;filename=`${type}_Holding.txt`;
          rows.push(`${code}|INE488V01015|59|0|1|59|13|513.35|`);break;


case 'inben':header=`RUPEE|${type.toUpperCase()}_HLD|${date}`;filename=`${type}_Holding.txt`;
          rows.push(`${code}|INE488V01015|59|0|1|59|13|513.35|`);break;


case 'inobb':header=`RUPEE|${type.toUpperCase()}_HLD|${date}`;filename=`${type}_Holding.txt`;
          rows.push(`${code}|INE488V01015|59|0|1|59|13|513.35|`);break;


case 'inmtf':header=`RUPEE|${type.toUpperCase()}_HLD|${date}`;filename=`${type}_Holding.txt`;
          rows.push(`${code}|INE488V01015|59|0|1|59|13|513.35|`);break;

case 'inmtf_T1':header=`RUPEE|${type.toUpperCase()}|${date}`;filename=`${type}_Holding.txt`;
          rows.push(`${code}|INE488V01015|59|0|1|59|13|513.35|`);break;



case 'mtfps03':header=`RUPEE|${type.toUpperCase()}|${date}`;filename=`${type}_Position.txt`;
          rows.push(`${code}|nse_cm|SBIN|EQ|10|8000|0|0|MTF||5|4000`);break;

case 'bsemtfps03':header=`RUPEE|${type.toUpperCase()}|${date}`;filename=`${type}_Position.txt`;
          rows.push(`${code}|bse_cm|500209|EQ|10|20000|0|0|MTF||5|10000`);break;





case 'dealer':header=`RUPEE|DEALER_CREATION|${date}`;filename='Dealer_Creation.txt';
          rows.push(`D|${code}|Branch|PUNE|E|Dealer|12-05-2019|BSEEQ,NSEFNO,BSEFNO,NSECR,BSECR,NSECOM|abcde1234f|111|111|1101|101|111|111|111|1111|111|111|111|111|111|111|1111|111|111|111|111|111|111|111|AS01|AS01|AS01|AS01|AS01|AS01|AS01|AS01|AS01|AS01|AS01|11-Oct-19|11-May-20|11-May-20|11-May-20|11-May-20|11-May-20|11-May-20|11-May-20|11May-20|11-May-20|11-May-20|a|a|416606|4654584|2244256522|maharastra|abc@a.com|${code}`);break;


case 'client_dealer':header=`RUPEE|CLIENT_DEALER|${date}`;filename='client_dealer.txt';
          rows.push(`${code}|DEALER01`);break;


case 'profile':header=`RUPEE|CLIENT_PROFILE|${date}`;filename='Client_Profile.txt';
          rows.push(`${code}|R16|`);break;


case 'restrict':header=`RUPEE|CLIENT_LEVEL_RESTRICT|${date}`;filename='ClientRestriction.txt';
          rows.push(`${code}|SQ_OFF|Y`);break;

case 'physical':header=`RUPEE|PHY_BAN|${date}`;filename='Physical_expiry_block.txt';
          rows.push(`TCS,I`);
          rows.push(`SBIN,M`);
          rows.push(`RELIANCE`);break;

      }
    }

      return { content: `${header}\n${rows.join("\n")}`, filename };
    }

    function previewFile() {
      const data = generateContent();
      if (data) {
        cachedData = data;
        document.getElementById("preview").textContent = data.content;
      }
    }

    function downloadFile() {
      if (!cachedData.content) {
        alert("Please preview the file first.");
        return;
      }
      const blob = new Blob([cachedData.content], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = cachedData.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    function clearAll() {
      document.getElementById("baseCode").value = '';
      document.getElementById("recordCount").value = '';
      document.getElementById("preview").textContent = '';
      cachedData = { content: '', filename: '' };
    }

    function downloadAllFiles() {
      const base = document.getElementById("baseCode").value.trim();
      const count = parseInt(document.getElementById("recordCount").value);
      if (!base || isNaN(count)) {
        alert("Enter valid base code and record count.");
        return;
      }

      const types = ["client", "bank", "product", "exchange", "limit", "incr_limit", "comlimit", "incr_comlimit", "DP", "ben", "obb", "mtf", "mtf_T1", "indp", "inben", "inobb", "inmtf", "inmtf_T1", "mtfps03", "bsemtfps03", "dealer", "client_dealer", "profile", "restrict", "physical"];
      const zip = new JSZip();

      types.forEach(t => {
        document.getElementById("fileType").value = t;
        const file = generateContent();
        if (file) zip.file(file.filename, file.content);
      });

      zip.generateAsync({ type: "blob" }).then(content => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = "BO_All_Files.zip";
        link.click();
      });
    }
