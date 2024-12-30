"use client";

import { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { FileDown } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { CoursePDF } from "./course-pdf";
import { BuilderSection } from "@/src/types/builder";
import { CourseMetadata } from "@/src/types/course";

interface ExportPDFButtonProps {
  metadata: CourseMetadata;
  sections: BuilderSection[];
}

export function ExportPDFButton({ metadata, sections }: ExportPDFButtonProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Button variant="outline" size="sm" disabled>
        <FileDown className="h-4 w-4 mr-2" />
        Export PDF
      </Button>
    );
  }

  return (
    <PDFDownloadLink
      document={<CoursePDF metadata={metadata} sections={sections} />}
      fileName={`${metadata.title.toLowerCase().replace(/\s+/g, "-")}.pdf`}
    >
      {({ loading }) => (
        <Button variant="outline" size="sm" disabled={loading}>
          <FileDown className="h-4 w-4 mr-2" />
          {loading ? "Génération..." : "Export PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
