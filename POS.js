package main

import (
	"bytes"
	"encoding/csv"
	"encoding/json"
	"html/template"
	"net/http"
	"strconv"
	"strings"
	"time"
)

var positionFiles = []string{
	"Position_ICCL_FO_0_CM_6538_2025",
	"Position_ICCL_FO_0_TM_6538_2025",
	"Position_NCL_FO_0_CM_6538_2025",
	"Position_NCL_FO_0_TM_6538_2025",
}

const rawCSV = `Sgmt,Src,RptgDt,BizDt,TradRegnOrgn,ClrMmbId,BrkrOrCtdnPtcptId,ClntTp,ClntId,FinInstrmTp,ISIN,TckrSymb,XpryDt,FininstrmActlXpryDt,StrkPric,OptnTp,NewBrdLotQty,OpngLngQty,OpngLngVal,OpngShrtQty,OpngShrtVal,OpnBuyTradgQty,OpnBuyTradgVal,OpnSellTradgQty,OpnSellTradgVal,PreExrcAssgndLngQty,PreExrcAssgndLngVal,PreExrcAssgndShrtQty,PreExrcAssgndShrtVal,ExrcdQty,AssgndQty,PstExrcAssgndLngQty,PstExrcAssgndLngVal,PstExrcAssgndShrtQty,PstExrcAssgndShrtVal,SttlmPric,RefRate,PrmAmt,DalyMrkToMktSettlmVal,FutrsFnlSttlmVal,ExrcAssgndVal,Rmks,Rsvd1,Rsvd2,Rsvd3,Rsvd4
FO,NCL,20260627,20260627,1,6538,6538,C,A101,STF,,SBIN,20250625,20250625,,,750,0,0,0,0,750,75000,0,0,0,0,0,0,0,0,750,75000,0,0,1000,,0,-3420,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A101,IDF,,BANKNIFTY,20250625,20250625,,,30,0,0,0,0,30,7500,0,0,0,0,0,0,0,0,30,7500,0,0,60000,,0,41880,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A101,IDO,,NIFTY,20250625,20250625,25000,CE,65,0,0,0,0,65,7500,0,0,0,0,0,0,0,0,65,7500,0,0,25000,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A101,STO,,TCS,20250625,20250625,3000,CE,175,0,0,0,0,175,63000,0,0,0,0,0,0,0,0,175,63000,0,0,3000,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A101,IDF,,SENSEX,20250625,20250625,,,20,0,0,0,0,100,7430000,0,0,0,0,0,0,0,0,100,7430000,0,0,77500,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A101,IDO,,SENSEX,20250625,20250625,78000,CE,20,0,0,0,0,100,1060447,0,0,0,0,0,0,0,0,100,1060447,0,0,1450,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A101,IDO,,BANKEX,20250625,20250625,60000,PE,30,0,0,0,0,150,107400,0,0,0,0,0,0,0,0,150,107400,0,0,716,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A11,STF,,SBIN,20250625,20250625,,,750,0,0,0,0,0,0,750,75000,0,0,0,0,0,0,0,0,750,75000,1000,,0,-3420,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A11,IDF,,BANKNIFTY,20250625,20250625,,,30,0,0,0,0,0,0,30,7500,0,0,0,0,0,0,0,0,30,7500,60000,,0,41880,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A11,IDO,,NIFTY,20250625,20250625,25000,CE,65,0,0,0,0,0,0,65,7500,0,0,0,0,0,0,0,0,65,7500,25000,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A11,STO,,TCS,20250625,20250625,3000,CE,175,0,0,0,0,0,0,175,63000,0,0,0,0,0,0,0,0,175,63000,3000,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A11,IDF,,SENSEX,20250625,20250625,,,20,0,0,0,0,0,0,100,7430000,0,0,0,0,0,0,0,0,100,7430000,77500,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A11,IDO,,SENSEX,20250625,20250625,78000,CE,20,0,0,0,0,0,0,100,1060447,0,0,0,0,0,0,0,0,100,1060447,1450,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A11,IDO,,BANKEX,20250625,20250625,60000,PE,30,0,0,0,0,0,0,150,107400,0,0,0,0,0,0,0,0,150,107400,716,,0,0,0,0,,,,,`

type PosPage struct {
	Files []string
}

type PreviewResponse struct {
    Header []string   `json:"header"`
    Rows   [][]string `json:"rows"`
}

func posHandler(w http.ResponseWriter, r *http.Request) {

	tmpl := template.Must(
		template.ParseFiles("templates/pos.html"),
	)

	data := PosPage{
		Files: positionFiles,
	}

	tmpl.Execute(w, data)
}



func previewposHandler(
	w http.ResponseWriter,
	r *http.Request,
) {

	client1 := strings.TrimSpace(
		r.FormValue("client1"),
	)

	client2 := strings.TrimSpace(
		r.FormValue("client2"),
	)

	expiry := strings.ReplaceAll(
		r.FormValue("expiry"),
		"-",
		"",
	)

	if client1 == "" || expiry == "" {

		http.Error(
			w,
			"Client1 and Expiry Required",
			400,
		)

		return
	}

	reader := csv.NewReader(
		strings.NewReader(rawCSV),
	)

	rows, err := reader.ReadAll()

	if err != nil {

		http.Error(
			w,
			err.Error(),
			500,
		)

		return
	}

	header := rows[0]

	indexMap := map[string]int{}

	for i, col := range header {
		indexMap[col] = i
	}

	currentDate := time.Now().Format("20060102")

	var processed [][]string

	qtyIndex := indexMap["PstExrcAssgndLngQty"]

	for _, row := range rows[1:] {

		qty := strings.TrimSpace(
			row[qtyIndex],
		)

		qtyFloat, _ :=
			strconv.ParseFloat(
				qty,
				64,
			)

		if qtyFloat > 0 {

			row[indexMap["ClntId"]] =
				client1

		} else {

			if client2 == "" {
				continue
			}

			row[indexMap["ClntId"]] =
				client2
		}

		row[indexMap["XpryDt"]] =
			expiry

		row[indexMap["FininstrmActlXpryDt"]] =
			expiry

		row[indexMap["RptgDt"]] =
			currentDate

		row[indexMap["BizDt"]] =
			currentDate

		processed = append(
			processed,
			row,
		)
	}

	resp := PreviewResponse{
		Header: header,
		Rows:   processed,
	}

	w.Header().Set(
		"Content-Type",
		"application/json",
	)

	json.NewEncoder(w).Encode(resp)
}



func generateposHandler(w http.ResponseWriter, r *http.Request) {

	client1 := strings.TrimSpace(
		r.FormValue("client1"),
	)

	client2 := strings.TrimSpace(
		r.FormValue("client2"),
	)

	expiry := strings.ReplaceAll(
		r.FormValue("expiry"),
		"-",
		"",
	)

	fileName := r.FormValue("files")

	if client1 == "" || expiry == "" {

		http.Error(
			w,
			"Client1 and Expiry Required",
			400,
		)

		return
	}

	reader := csv.NewReader(
		strings.NewReader(rawCSV),
	)

	rows, err := reader.ReadAll()

	if err != nil {

		http.Error(
			w,
			err.Error(),
			500,
		)

		return
	}

	header := rows[0]

	indexMap := map[string]int{}

	for i, col := range header {

		indexMap[col] = i
	}

	currentDate := time.Now().Format("20060102")

	var processed [][]string

	processed = append(
		processed,
		header,
	)

	qtyIndex :=
		indexMap["PstExrcAssgndLngQty"]

	for _, row := range rows[1:] {

		qty := strings.TrimSpace(
			row[qtyIndex],
		)

		qtyFloat, _ :=
			strconv.ParseFloat(qty, 64)

		if qtyFloat > 0 {

			row[indexMap["ClntId"]] =
				client1

		} else {

			if client2 == "" {
				continue
			}

			row[indexMap["ClntId"]] =
				client2
		}

		row[indexMap["XpryDt"]] =
			expiry

		row[indexMap["FininstrmActlXpryDt"]] =
			expiry

		row[indexMap["RptgDt"]] =
			currentDate

		row[indexMap["BizDt"]] =
			currentDate

		processed = append(
			processed,
			row,
		)
	}

	var csvBuffer bytes.Buffer

	writer := csv.NewWriter(
		&csvBuffer,
	)

	writer.WriteAll(processed)

	writer.Flush()

	w.Header().Set(
		"Content-Disposition",
		"attachment; filename="+fileName+".csv",
	)

	w.Header().Set(
		"Content-Type",
		"text/csv",
	)

	w.Write(csvBuffer.Bytes())
}
