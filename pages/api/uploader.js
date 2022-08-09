import multer from "multer";

const upload = multer();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (req.method === "POST") {
    upload.array("files", 6)(req, {}, (err) => {
      if (err) {
        res.status(400).json({ error: err });
      }
      res.status(200).send({data: processFiles(req.files)})
    });
  } else {
    res.status(200).json({ status: "it is running" });
  }
}

export const parseCsvContent = (data) => {
    // Split into header and rows
    const [headerRow, ...rows] = data.trim().split("\n");
    // Split header/rows with comma seperator into array of values
    const parseRow = (row) => row.replace("\r", "").split(",");
    const headers = parseRow(headerRow);
  
    return rows.map((row) =>
      parseRow(row)
        // Reduce values array into an object like: { [header]: value }
        .reduce(
          (object, value, index) => ({
            ...object,
            [headers[index].toLowerCase()]: value.trim(),
          }),
          {}
        )
    );
  };

export const processFiles = (files) => {
  let data = [];
  files.forEach((file) => {
    data = data.concat(parseCsvContent(file.buffer.toString()))
  });
  return data;
};

