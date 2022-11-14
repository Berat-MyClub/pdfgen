import jsPDF from "jspdf";
import { useState } from "react";
import styled from "styled-components";

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

  const generatePDF = () => {
    var doc = new jsPDF("p", "px", "a5");
    var pageWidth = 315;
    var pageHeight = 416;
    doc.setFillColor("#243761");
    doc.rect(0, 0, pageWidth, 30, "F");
    doc.addImage("logo.png", "PNG", 122.5, 0, 70, 30);
    doc.text("Scanne jetzt deinen QR-Code für die", 60, 100);
    doc.text("schnelle und unkomplizierte Ein- und", 60, 115);
    doc.text("Auszahlung auf deine E-Wallet", 75, 130);
    doc.setDrawColor("#243761");
    doc.setLineWidth(2);
    doc.rect(97.5, 170, 120, 120, "S");
    doc.addImage(`${selectedImages}`, "JPEG", 100.5, 172, 115, 115);
    doc.setFillColor("#243761");
    doc.rect(0, pageHeight, pageWidth, 30, "F");
    doc.addImage("store.png", "PNG", 70, 280, 250, 250);
    doc.save("amk.pdf");
  };
  return (
    <div className="outter-container">
      <div className="config-container">
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
