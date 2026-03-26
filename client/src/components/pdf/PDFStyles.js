import { StyleSheet, Font } from '@react-pdf/renderer';

// Register standard fonts that ATS parsers handle perfectly
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyCg4QxlI.ttf' },
    { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyCg4TYlI.ttf', fontWeight: 'bold' }
  ]
});

// Since Helvetica is built-in to PDF viewers, we actually don't need to load external URLs 
// for Standard 14 Fonts (Helvetica, Custom, Times, Courier), but @react-pdf/renderer 
// maps standard names correctly by default if we just use them in styles.

const createStyles = (accentColor = '#3b82f6') => StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: accentColor,
    borderBottomStyle: 'solid',
    textAlign: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: accentColor,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
    color: '#555555',
  },
  contactItem: {
    fontSize: 9,
  },
  section: {
    marginBottom: 15,
    breakInside: 'avoid',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: accentColor,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  summaryText: {
    fontSize: 10,
    color: '#444444',
  },
  itemContainer: {
    marginBottom: 10,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: accentColor,
    borderLeftStyle: 'solid',
    breakInside: 'avoid',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111111',
  },
  itemSubtitle: {
    fontSize: 10,
    color: '#444444',
  },
  itemDate: {
    fontSize: 9,
    color: '#666666',
    textAlign: 'right',
  },
  description: {
    fontSize: 10,
    color: '#444444',
    marginTop: 3,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skillItem: {
    fontSize: 10,
    color: '#444444',
    marginRight: 8,
    marginBottom: 4,
  }
});

export default createStyles;
