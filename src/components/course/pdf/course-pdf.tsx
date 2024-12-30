"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { BuilderSection, BuilderComponent } from "@/app/types/builder";
import { CourseMetadata } from "@/app/types/course";

interface CoursePDFProps {
  metadata: CourseMetadata;
  sections: BuilderSection[];
}

// Définir les styles pour le PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    marginBottom: 30,
    color: "#666",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  heading: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  paragraph: {
    marginBottom: 8,
    lineHeight: 1.5,
  },
  code: {
    fontFamily: "Courier",
    backgroundColor: "#f5f5f5",
    padding: 8,
    marginBottom: 8,
  },
  callout: {
    padding: 10,
    marginBottom: 8,
    borderRadius: 4,
  },
  calloutTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  list: {
    marginBottom: 8,
  },
  listItem: {
    marginBottom: 4,
    paddingLeft: 15,
  },
  imageContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  imageCaption: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },
});

// Composant pour le rendu des composants dans le PDF
function PDFComponent({ component }: { component: BuilderComponent }) {
  switch (component.type) {
    case "heading":
      return (
        <Text style={styles.heading}>
          {component.props.content || "Sans titre"}
        </Text>
      );

    case "paragraph":
      return (
        <Text style={styles.paragraph}>
          {component.props.content || "Aucun contenu"}
        </Text>
      );

    case "code":
      return (
        <View style={styles.code}>
          <Text>{component.props.content || "// Aucun code"}</Text>
        </View>
      );

    case "callout": {
      const calloutStyles = {
        info: { backgroundColor: "#e8f4fd" },
        warning: { backgroundColor: "#fff4e5" },
        error: { backgroundColor: "#fee2e2" },
        success: { backgroundColor: "#dcfce7" },
      };

      return (
        <View
          style={[
            styles.callout,
            calloutStyles[component.props.type || "info"],
          ]}
        >
          <Text style={styles.calloutTitle}>
            {component.props.title || "Note"}
          </Text>
          <Text>{component.props.content || "Aucun contenu"}</Text>
        </View>
      );
    }

    case "list": {
      const items = component.props.items || [];
      return (
        <View style={styles.list}>
          {items.map((item: string, index: number) => (
            <Text key={index} style={styles.listItem}>
              • {item || "Élément vide"}
            </Text>
          ))}
        </View>
      );
    }

    case "image":
      return (
        <View style={styles.imageContainer}>
          <Image
            src={component.props.src}
            style={{
              width: component.props.width || "100%",
              height: component.props.height || "auto",
              objectFit: "contain",
            }}
          />
          {component.props.caption && (
            <Text style={styles.imageCaption}>{component.props.caption}</Text>
          )}
        </View>
      );

    default:
      return null;
  }
}

export function CoursePDF({ metadata, sections }: CoursePDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* En-tête du cours */}
        <Text style={styles.title}>{metadata.title}</Text>
        <Text style={styles.description}>{metadata.description}</Text>

        {/* Sections du cours */}
        {sections.map((section) => (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>
              {section.type === "content" ? "Section libre" : section.title}
            </Text>
            {section.components.map((component) => (
              <PDFComponent key={component.id} component={component} />
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
}
