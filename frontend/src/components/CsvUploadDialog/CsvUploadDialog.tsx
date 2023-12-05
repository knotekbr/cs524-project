import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useUploadCsvMutation } from "~api/request/answer-prompts";
import { useFeedback } from "~components/utility/FeedbackProvider";

import type { CsvUploadDialogProps } from "./CsvUploadDialog.types";

export default function CsvUploadDialog({ open, onClose }: CsvUploadDialogProps) {
  const { showSnackbar } = useFeedback();
  const [uploadCsv, { isLoading }] = useUploadCsvMutation();
  const [file, setFile] = useState<File | null | undefined>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.item(0));
  };

  const handleSubmit = () => {
    if (file) {
      uploadCsv({ file })
        .unwrap()
        .then(() => {
          showSnackbar({ message: "CSV uploaded", severity: "success" });
        })
        .catch();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Upload Question CSV</DialogTitle>
      <DialogContent>
        <input type="file" name="file" accept=".csv" onChange={handleFileChange} />
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isLoading || !file} onClick={handleSubmit}>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
}
