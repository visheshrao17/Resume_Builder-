import React from 'react';
import { Page, Text, View, Document } from '@react-pdf/renderer';
import createStyles from './PDFStyles';

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  return new Date(year, month - 1).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short"
  });
};

const PDFDocument = ({ data }) => {
  const styles = createStyles(data.accent_color || '#3b82f6');
  const info = data.personal_info || {};

  return (
    <Document title={data.title || "Resume"} author={info.full_name || "User"}>
      <Page size="A4" style={styles.page}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{info.full_name || "Your Name"}</Text>
          <View style={styles.contactInfo}>
            {info.email && <Text style={styles.contactItem}>{info.email}</Text>}
            {info.phone && <Text style={styles.contactItem}>• {info.phone}</Text>}
            {info.location && <Text style={styles.contactItem}>• {info.location}</Text>}
            {info.linkedin && <Text style={styles.contactItem}>• {info.linkedin}</Text>}
            {info.website && <Text style={styles.contactItem}>• {info.website}</Text>}
          </View>
        </View>

        {/* Professional Summary */}
        {data.professional_summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summaryText}>{data.professional_summary}</Text>
          </View>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.itemContainer} wrap={false}>
                <View style={styles.itemHeader}>
                  <View>
                    <Text style={styles.itemTitle}>{exp.position}</Text>
                    <Text style={styles.itemSubtitle}>{exp.company}</Text>
                  </View>
                  <Text style={styles.itemDate}>
                    {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </Text>
                </View>
                {exp.description && (
                  <Text style={styles.description}>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {data.project && data.project.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.project.map((proj, index) => (
              <View key={index} style={styles.itemContainer} wrap={false}>
                <Text style={styles.itemTitle}>{proj.name}</Text>
                <Text style={styles.description}>{proj.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={[styles.itemHeader, { marginBottom: 8 }]} wrap={false}>
                <View>
                  <Text style={styles.itemTitle}>{edu.degree} {edu.field && `in ${edu.field}`}</Text>
                  <Text style={styles.itemSubtitle}>{edu.institution}</Text>
                  {edu.gpa && <Text style={styles.description}>GPA: {edu.gpa}</Text>}
                </View>
                <Text style={styles.itemDate}>{formatDate(edu.graduation_date)}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>Core Skills</Text>
            <View style={styles.skillsContainer}>
              {data.skills.map((skill, index) => (
                <Text key={index} style={styles.skillItem}>• {skill}</Text>
              ))}
            </View>
          </View>
        )}

      </Page>
    </Document>
  );
};

export default PDFDocument;
