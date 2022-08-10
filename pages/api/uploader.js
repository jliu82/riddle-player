import multer from "multer";
import { parseString } from '@fast-csv/parse';

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
      const data = [];
      req.files.forEach((file) => {
        parseString(file.buffer.toString(), { headers: true })
            .on('error', error => { res.status(400).json({ error });})
            .on('data', row => data.push(row))
            .on('end', () => {
                res.status(200).send({data})
            });
    
      });
      
    });
  } else {
    res.status(200).json({ status: "it is running" });
  }
}

