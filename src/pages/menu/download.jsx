import jsPDF from "jspdf";
import "jspdf-autotable";


export const handleDownloadPDF = (menu, savedCocktails) => {
  if (!menu || !savedCocktails) return;

  const doc = new jsPDF();
  const date = new Date().toLocaleDateString();

  // Set text properties
  const titleFontSize = 28;
  const headerFontSize = 26;
  const textFontSize = 16;
  const cocktailFontSize = 18; // Increased font size for cocktail names

  // Set the background color to black
  doc.setFillColor(0, 0, 0); // Black background
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');

  // Header with Bar Name
  doc.setFontSize(titleFontSize);
  doc.setTextColor(255, 193, 7); // Primary color text
  doc.text("The Cocktail Lounge", 105, 20, null, null, "center");

  // Menu Title
  doc.setFontSize(headerFontSize);
  doc.text(menu.title, 105, 40, null, null, "center");

  // Date
  doc.setFontSize(textFontSize);
  doc.text(`Downloaded on: ${date}`, 105, 50, null, null, "center");

  // Cocktails Table
  const cocktails = savedCocktails.map((cocktail) => [
    cocktail.name,
    `$${(parseFloat(cocktail.price) || 0).toFixed(2)}`, // Ensure the price is a number, default to 0
  ]);

  // AutoTable for cocktails
  doc.autoTable({
    head: [["Cocktail", "Price"]],
    body: cocktails,
    startY: 60,
    margin: { left: 20, right: 20 },
    theme: "plain", // Use plain theme for a minimalistic look
    styles: {
      fontSize: cocktailFontSize, // Increased font size for cocktail names
      cellPadding: 8,
      halign: 'center', // Center align text in the cells
      textColor: [255, 255, 255], // White text color
      fillColor: [0, 0, 0], // Black background for the table
    },
    headStyles: {
      textColor: [255, 193, 7], // Primary color for headers
      fontSize: 14,
      halign: 'center', // Center align headers
    },
    alternateRowStyles: {
      fillColor: [0, 0, 0], // Black background for alternating rows
    },
  });

  // Footer
  doc.setFontSize(textFontSize);
  doc.text(
    "Thank you for creating a menu using our app!",
    105,
    doc.internal.pageSize.height - 10,
    null,
    null,
    "center"
  );


  doc.save(`${menu.title}_menu.pdf`);
};
