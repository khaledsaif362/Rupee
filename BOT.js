let cachedData = {
  content: '',
  filename: ''
};


const BASE_PAN = "ABCDE1234Q";


function getPanFromBase(basePan, offset) {

  if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(basePan))
    basePan = "ABCDE0000A";

  const prefix =
    basePan.substring(0, 5);

  const startNum =
    parseInt(
      basePan.substring(5, 9),
      10
    );

  const startSuffix =
    basePan.charCodeAt(9) - 65;

  const total =
    startNum + offset;

  const carry =
    Math.floor(total / 10000);

  const newNum =
    total % 10000;

  const newSuffix =
    String.fromCharCode(
      65 + (startSuffix + carry) % 26
    );

  return (
    prefix +
    String(newNum).padStart(4, '0') +
    newSuffix
  );

}


function generateUniqueClientNames(count) {

  const names = new Set();

  while (names.size < count) {

    let randomStr = '';

    for (let i = 0; i < 5; i++) {

      randomStr +=
        String.fromCharCode(
          65 + Math.floor(Math.random() * 26)
        );

    }

    names.add(
      "TEST " + randomStr
    );

  }

  return Array.from(names);

}


let uploadedISINs = [];


const holdingTypes = [

  "DP",
  "ben",
  "obb",
  "mtf",
  "mtf_T1",

  "indp",
  "inben",
  "inobb",
  "inmtf",
  "inmtf_T1"

];


// =====================================================
// LIMIT FILE TYPES
// =====================================================

const limitTypes = [

  "limit",
  "incr_limit",
  "comlimit",
  "incr_comlimit"

];


// =====================================================
// ISIN VISIBILITY
// =====================================================

function updateISINUploadVisibility() {

  const type =
    document.getElementById(
      "fileType"
    ).value;

  const section =
    document.getElementById(
      "isinUploadSection"
    );

  if (holdingTypes.includes(type)) {

    section.style.display = "block";

  } else {

    section.style.display = "none";

  }

}


// =====================================================
// ADHOC VISIBILITY
// =====================================================

function updateAdhocVisibility() {

  const type =
    document.getElementById(
      "fileType"
    ).value;

  const section =
    document.getElementById(
      "adhocSection"
    );

  const checkbox =
    document.getElementById(
      "adhoc"
    );

  if (limitTypes.includes(type)) {

    section.style.display = "block";

  } else {

    section.style.display = "none";

    checkbox.checked = false;

  }

}


// =====================================================
// FILE TYPE CHANGE
// =====================================================

document
  .getElementById("fileType")
  .addEventListener(
    "change",
    function () {

      updateISINUploadVisibility();

      updateAdhocVisibility();

    }
  );


updateISINUploadVisibility();

updateAdhocVisibility();


// =====================================================
// ISIN FILE UPLOAD
// =====================================================

document
  .getElementById("isinFile")
  .addEventListener(
    "change",
    function (event) {

      const file =
        event.target.files[0];

      if (!file) {

        uploadedISINs = [];

        document.getElementById(
          "isinStatus"
        ).textContent = '';

        return;

      }

      const reader =
        new FileReader();

      reader.onload =
        function (e) {

          const text =
            e.target.result;

          uploadedISINs =
            text
              .split(/\r?\n/)
              .map(
                line =>
                  line.trim()
              )
              .filter(
                line =>
                  line !== ''
              )
              .map(
                line =>
                  line
                    .split(',')[0]
                    .trim()
              )
              .filter(
                isin =>
                  isin !== ''
              );


          if (
            uploadedISINs.length > 0 &&
            (
              uploadedISINs[0].toUpperCase() === "ISIN" ||
              uploadedISINs[0].toUpperCase() === "ISIN CODE" ||
              uploadedISINs[0].toUpperCase() === "ISIN_CODE"
            )
          ) {

            uploadedISINs.shift();

          }


          uploadedISINs =
            [...new Set(uploadedISINs)];


          document.getElementById(
            "isinStatus"
          ).textContent =
            uploadedISINs.length +
            " ISIN(s) uploaded";

        };

      reader.readAsText(file);

    }
  );


// =====================================================
// GENERATE CONTENT
// =====================================================

function generateContent() {

  const type =
    document.getElementById(
      "fileType"
    ).value;


  const baseCode =
    document.getElementById(
      "baseCode"
    ).value.trim();


  const count =
    parseInt(
      document.getElementById(
        "recordCount"
      ).value
    );


  // ===================================================
  // ADHOC CHECK
  // ===================================================

  const adhoc =
    document.getElementById(
      "adhoc"
    ).checked;


  const date =
    new Date()
      .toISOString()
      .split("T")[0]
      .replace(/-/g, "");


  if (
    !baseCode ||
    isNaN(count) ||
    count < 1
  ) {

    alert(
      "Please enter a valid base code and record count."
    );

    return null;

  }


  const prefix =
  baseCode.replace(
    /[0-9]/g,
    ''
  );


const numberPart =
  baseCode.replace(
    /\D/g,
    ''
  );


const startNum =
  parseInt(
    numberPart,
    10
  );


const numberWidth =
  numberPart.length;


if (
  !prefix ||
  !numberPart ||
  isNaN(startNum)
) {

  alert(
    "Client Code should contain prefix and number.\nExample: AB1000"
  );

  return null;

}


  let header = '';

  let filename = '';

  let rows = [];

  let clientNames = [];


  if (type === 'client') {

    clientNames =
      generateUniqueClientNames(
        count
      );

  }


  for (
    let i = 0;
    i < count;
    i++
  ) {

  const num =
  startNum + i;

const code =
  `${prefix}${String(num).padStart(numberWidth, '0')}`;


    const pan =
      getPanFromBase(
        BASE_PAN,
        i
      );


    switch (type) {


      // =================================================
      // CLIENT
      // =================================================

      case 'client':

        header =
          `RUPEE|CLT|${date}`;

        filename =
          'client.txt';

        const clientName =
          clientNames[i];

        rows.push(
          `${code}|${clientName}|${code}|HO|||KS@gm.com|Borivali|Mumbai||1234567890||IN123456|NSDL|IN12345671234567||${pan}|NI|HDFC123456|560016|HDFC BANK|ANDHERI|A|Y|Y||||E||||24/12/1985||Q106|R16|IN12345678901234|A|B|C|7|Y|A123456789012345|||`
        );

        break;


      // =================================================
      // BANK
      // =================================================

      case 'bank':

        header =
          `RUPEE|CBM|${date}`;

        filename =
          'Bank_Update.txt';

        rows.push(
          `01|${code}|HDFC|1234567890|Y|HDFC0001234|`
        );

        break;


      // =================================================
      // PRODUCT
      // =================================================

      case 'product':

        header =
          `RUPEE|PROD_ALW|${date}`;

        filename =
          'Product_Allowed.txt';

        rows.push(
          `${code}|${code}|MIS|NRML|CNC|MTF|CO|BO|NORMAL`
        );

        break;


      // =================================================
      // EXCHANGE
      // =================================================

      case 'exchange':

        header =
          `RUPEE|EXCH_ALW|${date}`;

        filename =
          'Segment_Allowed.txt';


        [
          ["NSE", "111111111111"],
          ["BSEEQ", "1111111111111"],
          ["CDS", "111111111111"],
          ["NSEFO", "111111111111"],
          ["BCR", "1111111111111"],
          ["BSEFO", "1111111111111"],
          ["MCX", "111111111111"],
          ["NSEMF", "111111111111"],
          ["BSEMF", "1111111111111"],
          ["NCDX", "111111111111"],
          ["BSECOM", "1111111111111"]
        ]
        .forEach(
          ([ex, loc]) => {

            rows.push(
              `${code}||${ex}|||${loc}`
            );

          }
        );

        break;


      // =================================================
      // CAP / ALL LIMIT
      // =================================================

      case 'limit':

        header =
          `RUPEE|CAP_LMT|${date}`;

        filename =
          'CAP_Limit.txt';


        if (adhoc) {

          // FULL EXISTING DATA

          rows.push(
            `${code}|2000000|||||10|20|20000|||||30000|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|||||||||||||||11000|`
          );

        } else {

          // ONLY FIRST 2 COLUMNS
          // REMAINING FIELDS BLANK

          rows.push(
            `${code}|2000000|||||||||||||||||||||||||||||||||||||||||`
          );

        }

        break;


      // =================================================
      // INCR CAP / ALL LIMIT
      // =================================================

      case 'incr_limit':

        header =
          `RUPEE|INCR_CAP_LMT|${date}`;

        filename =
          'Incr_CAP_Limit.txt';


        if (adhoc) {

          // FULL EXISTING DATA

          rows.push(
            `${code}|3000|||||500|100|||||||||||||||||||||||||||||||||||||`
          );

        } else {

          // ONLY FIRST 2 COLUMNS
          // REMAINING FIELDS BLANK

          rows.push(
            `${code}|3000||||||||||||||||||||||||||||||||||||||||`
          );

        }

        break;


      // =================================================
      // COM LIMIT
      // =================================================

      case 'comlimit':

        header =
          `RUPEE|COM_LMT|${date}`;

        filename =
          'COM_Limit.txt';


        if (adhoc) {

          // FULL EXISTING DATA

          rows.push(
            `${code}|3000000|||||100|200|40000|||||60000|150|160|170|180|190|200|210|220|230|240|250|260|270|280|290|300|||||||||||||||21000|`
          );

        } else {

          // ONLY FIRST 2 COLUMNS
          // REMAINING FIELDS BLANK

          rows.push(
            `${code}|3000000|||||||||||||||||||||||||||||||||||||||||`
          );

        }

        break;


      // =================================================
      // INCR COM LIMIT
      // =================================================

      case 'incr_comlimit':

        header =
          `RUPEE|INCR_COM_LMT|${date}`;

        filename =
          'Incr_COM_Limit.txt';


        if (adhoc) {

          // FULL EXISTING DATA

          rows.push(
            `${code}|4000|||||300|200|||||||||||||||||||||||||||||||||||||`
          );

        } else {

          // ONLY FIRST 2 COLUMNS
          // REMAINING FIELDS BLANK

          rows.push(
            `${code}|4000||||||||||||||||||||||||||||||||||||||||`
          );

        }

        break;


      // =================================================
      // DP HOLDING
      // =================================================

      case 'DP':

        header =
          `RUPEE|${type.toUpperCase()}_HLD|${date}`;

        filename =
          `${type}_Holding.txt`;


        if (
          uploadedISINs.length > 0
        ) {

          uploadedISINs.forEach(
            isin => {

              rows.push(
                `${code}|${isin}|59|0|1|59|10|500.00`
              );

            }
          );

        } else {

          rows.push(
            `${code}|INE001A01036|59|0|1|59|10|500.00`
          );

        }

        break;


      // =================================================
      // MRG HOLDING
      // =================================================

      case 'ben':

        header =
          `RUPEE|${type.toUpperCase()}_HLD|${date}`;

        filename =
          `${type}_Holding.txt`;


        if (
          uploadedISINs.length > 0
        ) {

          uploadedISINs.forEach(
            isin => {

              rows.push(
                `${code}|${isin}|59|0|1|59|10|500.00`
              );

            }
          );

        } else {

          rows.push(
            `${code}|INE001A01036|59|0|1|59|10|500.00`
          );

        }

        break;


      // =================================================
      // T1 HOLDING
      // =================================================

      case 'obb':

        header =
          `RUPEE|${type.toUpperCase()}_HLD|${date}`;

        filename =
          `${type}_Holding.txt`;


        if (
          uploadedISINs.length > 0
        ) {

          uploadedISINs.forEach(
            isin => {

              rows.push(
                `${code}|${isin}|59|0|1|59|10|500.00`
              );

            }
          );

        } else {

          rows.push(
            `${code}|INE001A01036|59|0|1|59|10|500.00`
          );

        }

        break;


      // =================================================
      // MTF HOLDING
      // =================================================

      case 'mtf':

        header =
          `RUPEE|${type.toUpperCase()}_HLD|${date}`;

        filename =
          `${type}_Holding.txt`;


        if (
          uploadedISINs.length > 0
        ) {

          uploadedISINs.forEach(
            isin => {

              rows.push(
                `${code}|${isin}|59|0|1|59|10|500.00`
              );

            }
          );

        } else {

          rows.push(
            `${code}|INE001A01036|59|0|1|59|10|500.00`
          );

        }

        break;


      // =================================================
      // MTF T1 HOLDING
      // =================================================

      case 'mtf_T1':

        header =
          `RUPEE|${type.toUpperCase()}|${date}`;

        filename =
          `${type}_Holding.txt`;


        if (
          uploadedISINs.length > 0
        ) {

          uploadedISINs.forEach(
            isin => {

              rows.push(
                `${code}|${isin}|59|0|1|59|10|500.00`
              );

            }
          );

        } else {

          rows.push(
            `${code}|INE001A01036|59|0|1|59|10|500.00`
          );

        }

        break;


      // =================================================
      // INCR DP
      // =================================================

      case 'indp':

        header =
          `RUPEE|${type.toUpperCase()}_HLD|${date}`;

        filename =
          `${type}_Holding.txt`;


        if (
          uploadedISINs.length > 0
        ) {

          uploadedISINs.forEach(
            isin => {

              rows.push(
                `${code}|${isin}|59|0|1|59|13|513.35|`
              );

            }
          );

        } else {

          rows.push(
            `${code}|INE488V01015|59|0|1|59|13|513.35|`
          );

        }

        break;


      // =================================================
      // INCR MRG
      // =================================================

      case 'inben':

        header =
          `RUPEE|${type.toUpperCase()}_HLD|${date}`;

        filename =
          `${type}_Holding.txt`;


        if (
          uploadedISINs.length > 0
        ) {

          uploadedISINs.forEach(
            isin => {

              rows.push(
                `${code}|${isin}|59|0|1|59|13|513.35|`
              );

            }
          );

        } else {

          rows.push(
            `${code}|INE488V01015|59|0|1|59|13|513.35|`
          );

        }

        break;


      // =================================================
      // INCR T1
      // =================================================

      case 'inobb':

        header =
          `RUPEE|${type.toUpperCase()}_HLD|${date}`;

        filename =
          `${type}_Holding.txt`;


        if (
          uploadedISINs.length > 0
        ) {

          uploadedISINs.forEach(
            isin => {

              rows.push(
                `${code}|${isin}|59|0|1|59|13|513.35|`
              );

            }
          );

        } else {

          rows.push(
            `${code}|INE488V01015|59|0|1|59|13|513.35|`
          );

        }

        break;


      // =================================================
      // INCR MTF
      // =================================================

      case 'inmtf':

        header =
          `RUPEE|${type.toUpperCase()}_HLD|${date}`;

        filename =
          `${type}_Holding.txt`;


        if (
          uploadedISINs.length > 0
        ) {

          uploadedISINs.forEach(
            isin => {

              rows.push(
                `${code}|${isin}|59|0|1|59|13|513.35|`
              );

            }
          );

        } else {

          rows.push(
            `${code}|INE488V01015|59|0|1|59|13|513.35|`
          );

        }

        break;


      // =================================================
      // INCR MTF T1
      // =================================================

      case 'inmtf_T1':

        header =
          `RUPEE|${type.toUpperCase()}|${date}`;

        filename =
          `${type}_Holding.txt`;


        if (
          uploadedISINs.length > 0
        ) {

          uploadedISINs.forEach(
            isin => {

              rows.push(
                `${code}|${isin}|59|0|1|59|13|513.35|`
              );

            }
          );

        } else {

          rows.push(
            `${code}|INE488V01015|59|0|1|59|13|513.35|`
          );

        }

        break;


      // =================================================
      // NSE MTF POSITION
      // =================================================

      case 'mtfps03':

        header =
          `RUPEE|${type.toUpperCase()}|${date}`;

        filename =
          `${type}_Position.txt`;

        rows.push(
          `${code}|nse_cm|SBIN|EQ|10|8000|0|0|MTF||5|4000`
        );

        break;


      // =================================================
      // BSE MTF POSITION
      // =================================================

      case 'bsemtfps03':

        header =
          `RUPEE|${type.toUpperCase()}|${date}`;

        filename =
          `${type}_Position.txt`;

        rows.push(
          `${code}|bse_cm|500209|EQ|10|20000|0|0|MTF||5|10000`
        );

        break;


      // =================================================
      // DEALER CREATION
      // =================================================

      case 'dealer':

        header =
          `RUPEE|DEALER_CREATION|${date}`;

        filename =
          'Dealer_Creation.txt';

        rows.push(
          `D|${code}|B|HO|E|DealerK|12-05-2019|BSEEQ,NSEFNO,BSEFNO,NSECR,BSECR,NSECOM|abcde1234f|111|111|1101|101|111|111|111|1111|111|111|111|111|111|111|1111|111|111|111|111|111|111|111|AS01|AS01|AS01|AS01|AS01|AS01|AS01|AS01|AS01|AS01|AS01|11-Oct-30|11-May-30|11-May-30|11-May-30|11-May-30|11-May-30|11-May-30|11-May-30|11May-30|11-May-30|11-May-30|a|a|416606|4654584|2244256522|maharastra|abc@a.com|${code}`
        );

        break;


      // =================================================
      // DEALER MAPPING
      // =================================================

      case 'client_dealer':

        header =
          `RUPEE|CLIENT_DEALER|${date}`;

        filename =
          'client_dealer.txt';

        rows.push(
          `${code}|DEALER01`
        );

        break;


      // =================================================
      // CLIENT PROFILE
      // =================================================

      case 'profile':

        header =
          `RUPEE|CLIENT_PROFILE|${date}`;

        filename =
          'Client_Profile.txt';

        rows.push(
          `${code}|R16|`
        );

        break;


      // =================================================
      // CLIENT RESTRICTION
      // =================================================

      case 'restrict':

        header =
          `RUPEE|CLIENT_LEVEL_RESTRICT|${date}`;

        filename =
          'ClientRestriction.txt';

        rows.push(
          `${code}|SQ_OFF|Y`
        );

        break;


      // =================================================
      // PHYSICAL EXPIRY BLOCK
      // =================================================

      case 'physical':

        header =
          `RUPEE|PHY_BAN|${date}`;

        filename =
          'Physical_expiry_block.txt';

        rows.push(
          `TCS,I`
        );

        rows.push(
          `SBIN,M`
        );

        rows.push(
          `RELIANCE`
        );

        break;

    }

  }


  return {

    content:
      `${header}\n${rows.join("\n")}`,

    filename:
      filename

  };

}


// =====================================================
// PREVIEW
// =====================================================

function previewFile() {

  const data =
    generateContent();

  if (!data) {

    return;

  }


  cachedData =
    data;


  document.getElementById(
    "preview"
  ).textContent =
    data.content;

}


// =====================================================
// DOWNLOAD
// =====================================================

function downloadFile() {

  if (!cachedData.content) {

    const data =
      generateContent();

    if (!data) {

      return;

    }

    cachedData =
      data;

  }


  const blob =
    new Blob(
      [cachedData.content],
      {
        type: "text/plain"
      }
    );


  const link =
    document.createElement("a");


  link.href =
    URL.createObjectURL(blob);


  link.download =
    cachedData.filename;


  document.body.appendChild(
    link
  );


  link.click();


  document.body.removeChild(
    link
  );


  setTimeout(
    () => {

      URL.revokeObjectURL(
        link.href
      );

    },
    1000
  );

}


// =====================================================
// CLEAR ALL
// =====================================================

function clearAll() {

  document.getElementById(
    "baseCode"
  ).value = '';


  document.getElementById(
    "recordCount"
  ).value = '';


  document.getElementById(
    "preview"
  ).textContent = '';


  document.getElementById(
    "isinFile"
  ).value = '';


  document.getElementById(
    "isinStatus"
  ).textContent = '';


  uploadedISINs = [];


  // ADHOC DEFAULT UNCHECKED

  document.getElementById(
    "adhoc"
  ).checked = false;


  cachedData = {

    content: '',

    filename: ''

  };


  updateISINUploadVisibility();

  updateAdhocVisibility();

}


// =====================================================
// DOWNLOAD ALL FILES
// =====================================================

function downloadAllFiles() {

  const base =
    document.getElementById(
      "baseCode"
    ).value.trim();


  const count =
    parseInt(
      document.getElementById(
        "recordCount"
      ).value
    );


  if (
    !base ||
    isNaN(count) ||
    count < 1
  ) {

    alert(
      "Enter valid base code and record count."
    );

    return;

  }


  if (
    typeof JSZip === "undefined"
  ) {

    alert(
      "JSZip library is not loaded."
    );

    return;

  }


  const types = [

    "client",

    "bank",

    "product",

    "exchange",

    "limit",

    "incr_limit",

    "comlimit",

    "incr_comlimit",

    "DP",

    "ben",

    "obb",

    "mtf",

    "mtf_T1",

    "indp",

    "inben",

    "inobb",

    "inmtf",

    "inmtf_T1",

    "mtfps03",

    "bsemtfps03",

    "dealer",

    "client_dealer",

    "profile",

    "restrict",

    "physical"

  ];


  const zip =
    new JSZip();


  const originalType =
    document.getElementById(
      "fileType"
    ).value;


  types.forEach(
    type => {

      document.getElementById(
        "fileType"
      ).value =
        type;


      const file =
        generateContent();


      if (file) {

        zip.file(
          file.filename,
          file.content
        );

      }

    }
  );


  document.getElementById(
    "fileType"
  ).value =
    originalType;


  updateISINUploadVisibility();

  updateAdhocVisibility();


  zip
    .generateAsync({
      type: "blob"
    })
    .then(
      content => {

        const link =
          document.createElement("a");


        link.href =
          URL.createObjectURL(
            content
          );


        link.download =
          "BO_All_Files.zip";


        document.body.appendChild(
          link
        );


        link.click();


        document.body.removeChild(
          link
        );


        setTimeout(
          () => {

            URL.revokeObjectURL(
              link.href
            );

          },
          1000
        );

      }
    );

}