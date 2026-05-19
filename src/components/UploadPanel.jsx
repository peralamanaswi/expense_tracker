import { UploadCloud } from "lucide-react";

const UploadPanel = ({ onUpload, isUploading }) => (
  <section className="upload-panel">
    <div>
      <h2>Upload Invoice</h2>
      <p>JPG, PNG, or WEBP bills up to 5MB are sent to Google Vision OCR, then Gemini extracts and categorizes the expense.</p>
    </div>
    <label className="upload-zone">
      <UploadCloud size={28} />
      <span>{isUploading ? "Reading bill..." : "Choose bill image"}</span>
      <input type="file" accept="image/png,image/jpeg,image/webp" onChange={onUpload} disabled={isUploading} />
    </label>
  </section>
);

export default UploadPanel;
