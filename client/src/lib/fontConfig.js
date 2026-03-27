export const ATS_SAFE_FONTS = [
  { id: 'Helvetica', name: 'Helvetica', safe: true },
  { id: 'Arial', name: 'Arial', safe: true },
  { id: 'Calibri', name: 'Calibri', safe: true },
  { id: 'Georgia', name: 'Georgia', safe: true },
  { id: 'Times New Roman', name: 'Times New Roman', safe: true },
  { id: 'Garamond', name: 'Garamond', safe: true },
];

export const isAtsSafeFont = (fontId) => {
  return ATS_SAFE_FONTS.some((f) => f.id === fontId && f.safe);
};
