import jsPDF from "jspdf";
import { useState } from "react";
import styled from "styled-components";
import { callAddFont } from "../styles/fonts/SairaSemiCondensed-Regular-normal";
import { callAddFontBold } from "../styles/fonts/SairaSemiCondensed-Bold-normal";

const Upload = styled.div`
  width: 15rem;
  background-color: #fff;
  height: 15rem;
  margin-top: 1rem;
  border-radius: 7px;
  background-image: url(${(props) => props.src && props.src});
  background-size: cover;
`;

export default function Home() {
  const [selectedImages, setSelectedImages] = useState(null);
  const onSelectedFile = (event) => {
    // const [selectedImage, setSelectedImage] = useState([]);
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages(imagesArray);
  };

  jsPDF.API.events.push(["addFonts", callAddFont]);
  jsPDF.API.events.push(["addFonts", callAddFontBold]);

  const generatePDF = () => {
    var doc = new jsPDF("p", "px", "a5");
    var pageWidth = 315;
    var pageHeight = 417;
    var lines = doc.splitTextToSize(
      "Scanne jetzt deinen QR-Code für die schnelle und unkomplizierte Ein- und Auszahlung auf deine E-Wallet.",
      200
    );
    doc.setFillColor("#243761");
    doc.rect(0, 0, pageWidth, 30, "F");
    doc.addImage("logo.png", "PNG", 122.5, 0, 70, 30);
    doc.setFont("SairaSemiCondensed-Regular", "normal");
    doc.text("Scanne jetzt deinen QR-Code für die", 68, 80);
    doc.setFont("SairaSemiCondensed-Bold", "normal");
    doc.text("schnelle", 63, 98);
    doc.setFont("SairaSemiCondensed-Regular", "normal");
    doc.text("und", 108, 98);
    doc.setFont("SairaSemiCondensed-Bold", "normal");
    doc.text("unkomplizierte Ein- und", 131, 98);
    doc.text("Auszahlung", 79, 116);
    doc.setFont("SairaSemiCondensed-Regular", "normal");
    doc.text("auf deine E-Wallet.", 141, 116);
    doc.setFillColor("#243761");
    doc.triangle(142, 143, 172, 143, 157, 158, "FD");
    doc.setDrawColor("#243761");
    doc.setLineWidth(2);
    doc.rect(97.5, 170, 120, 120, "S");
    doc.addImage(`${selectedImages}`, "JPEG", 100.5, 172, 115, 115);
    doc.setFillColor("#243761");
    doc.rect(0, pageHeight, pageWidth, 30, "F");
    doc.setFontSize(6);
    doc.setTextColor("#fff");
    doc.text("OKTOPAY Deutschland GmbH", 10, 426).splitTextToSize(50);
    doc.text("Am Zirkus 2", 10, 431).splitTextToSize(50);
    doc.text("10117 Berlin", 10, 436).splitTextToSize(50);
    doc.text("Deutschland", 10, 441).splitTextToSize(50);

    doc.addImage("store.png", "PNG", 70, 280, 250, 250);
    doc.save("flyer.pdf");

    console.log(doc.getFontList());
  };
  return (
    <div className="outter-container">
      <div className="config-container">
        <img style={{ maxWidth: "8rem" }} src="logo.png" />
        <input
          onChange={onSelectedFile}
          type="file"
          accept="image/png, image/jpeg"
        ></input>
        {selectedImages && <img className="upload" src={selectedImages} />}
        <button onClick={generatePDF}>Generate PDF</button>
      </div>
    </div>
  );
}
