import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 11, fontFamily: "Helvetica" },
  h1: { fontSize: 18, fontWeight: 700 },
  h2: { fontSize: 13, fontWeight: 700, marginTop: 10, marginBottom: 4 },
  muted: { color: "#555" },
  item: { marginBottom: 6 },
  bulletList: { display: "flex", flexDirection: "column", gap: 2, paddingLeft: 10 }
});

export default function ResumeDocument({ data }) {
  const d = data || {};
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>{d.basics?.fullName || "Your Name"}</Text>
        <Text style={styles.muted}>
          {[d.basics?.email, d.basics?.phone, d.basics?.location].filter(Boolean).join(" • ")}
        </Text>
        {d.basics?.summary ? <Text>{d.basics.summary}</Text> : null}

        {Array.isArray(d.skills) && d.skills.filter(Boolean).length > 0 && (
          <View>
            <Text style={styles.h2}>Skills</Text>
            <Text>{d.skills.filter(Boolean).join(" • ")}</Text>
          </View>
        )}

        {Array.isArray(d.experience) && d.experience.filter(e => e.company || e.role).length > 0 && (
          <View>
            <Text style={styles.h2}>Experience</Text>
            {d.experience.map((e, i) => (
              <View key={i} style={styles.item}>
                <Text>{[e.role, e.company].filter(Boolean).join(" — ")}</Text>
                <Text style={styles.muted}>{[e.start, e.end].filter(Boolean).join(" – ")}</Text>
                {e.details ? <Text>{e.details}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {Array.isArray(d.education) && d.education.filter(ed => ed.school || ed.degree).length > 0 && (
          <View>
            <Text style={styles.h2}>Education</Text>
            {d.education.map((ed, i) => (
              <View key={i} style={styles.item}>
                <Text>{[ed.degree, ed.school].filter(Boolean).join(" — ")}</Text>
                <Text style={styles.muted}>{[ed.start, ed.end].filter(Boolean).join(" – ")}</Text>
              </View>
            ))}
          </View>
        )}

        {Array.isArray(d.projects) && d.projects.filter(p => p.name).length > 0 && (
          <View>
            <Text style={styles.h2}>Projects</Text>
            {d.projects.map((p, i) => (
              <View key={i} style={styles.item}>
                <Text>{p.name}{p.link ? ` (${p.link})` : ""}</Text>
                {p.details ? <Text>{p.details}</Text> : null}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
