import React, { useState, useEffect } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import moment from "moment";
import "moment/locale/id";
import config from "./../../config";
moment.locale("id");

const styles = StyleSheet.create({
  page: {
    padding: "70pt",
    fontSize: "11pt",
    fontFamily: "Helvetica",
    lineHeight: 2,
  },
  reportHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: "40pt",
  },
  reportDest: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "40pt",
  },
  reportBody: {
    marginBottom: "70pt",
  },
  reportFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "70vw",
    marginHorizontal: "auto",
    lineHeight: 1.5,
  },
  container: {
    width: "90vw",
    marginHorizontal: "auto",
    marginVertical: "20pt",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  center: {
    alignItems: "center",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    marginRight: "10pt",
  },
  signer: {
    marginBottom: "70pt",
  },
});

const Report = (props) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.reportHeader}>
          <Text>
            {config.kota}, {moment(new Date()).format("DD MMMM YYYY")}
          </Text>
        </View>
        <View style={styles.reportDest}>
          <Text>Kepada Yth,</Text>
          <Text>Direktur {config.namaPerusahaan}</Text>
          <Text>Di tempat,</Text>
        </View>
        <View style={styles.reportBody}>
          <Text>Dengan hormat,</Text>
          <Text>
            Sehubungan dengan {props.data.jenisCuti}, dengan ini saya:
          </Text>
          <View style={[styles.container, styles.row]}>
            <View style={styles.col}>
              <Text>Nama</Text>
              <Text>NIP</Text>
              <Text>Jabatan</Text>
            </View>
            <View style={styles.col}>
              <Text>: {props.data.nama}</Text>
              <Text>: {props.data.nip}</Text>
              <Text>: {props.data.jabatan}</Text>
            </View>
          </View>
          <Text>
            Mengajukan permohonan cuti selama {props.data.lamaCuti} hari pada
            tanggal {moment(props.data.tanggalMulaiCuti).format("DD MMMM YYYY")}{" "}
            s/d {moment(props.data.tanggalSelesaiCuti).format("DD MMMM YYYY")}{" "}
            dikarenakan {props.data.keterangan}.
          </Text>
          <Text>
            Demikian permohonan ini saya ajukan, atas perhatian dan
            kebijaksanaannya saya ucapkan terima kasih.
          </Text>
        </View>
        <View style={styles.reportFooter}>
          <View style={[styles.col, styles.center]}>
            <Text>Menyetujui,</Text>
            <Text style={styles.signer}>Direktur</Text>
            <Text>{props.dir}</Text>
          </View>
          <View style={[styles.col, styles.center]}>
            <Text>Mengetahui,</Text>
            <Text style={styles.signer}>HRD</Text>
            <Text>{props.hrd}</Text>
          </View>
          <View style={[styles.col, styles.center]}>
            <Text style={styles.signer}>Pemohon</Text>
            <Text>{props.data.nama}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Report;
