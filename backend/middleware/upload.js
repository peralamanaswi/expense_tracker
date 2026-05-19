import multer from "multer";
import path from "path";

const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
    cb(null, `${Date.now()}-${safeName}`);
  }
});

const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();
  const validExtension = [".jpg", ".jpeg", ".png", ".webp"].includes(extension);

  if (allowedMimeTypes.includes(file.mimetype) && validExtension) {
    cb(null, true);
    return;
  }

  cb(new Error("Only JPG, PNG, and WEBP invoice images are allowed"));
};

export const uploadInvoice = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});
