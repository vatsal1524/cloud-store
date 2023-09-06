import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Table, Container } from "react-bootstrap";
import "../css/Home.css";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("");
  const [filesList, setFilesList] = useState([]);

  const navigate = useNavigate();
  const state = useLocation();

  const email = state.state.email;

  useEffect(() => {
    fetchFilesList();
  }, [email]);

  const fetchFilesList = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/getFiles",
        {
          data: {
            email,
          },
        }
      );
      setFilesList(response.data.fileNames);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleLogout = async () => {
    navigate("/login");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file.name);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a file first.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onloadend = async () => {
      try {
        const base64Data = reader.result.split(",")[1];
        console.log(base64Data);
        const response = await axios.post(
          process.env.REACT_APP_API_URL + "/uploadFile",
          {
            data: {
              fileName,
              fileData: base64Data,
              email,
            },
          }
        );

        setMessage(response.data.message);
      } catch (error) {
        setMessage("An error occurred while uploading the file.");
      }
    };
  };

  const handleDownload = async (fileName) => {
    try {
      console.log(`${email}/${fileName}`);
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/getDownloadUrl",
        {
          data: {
            fileKey: `${email}/${fileName}`,
          },
        }
      );
      const downloadURL = response.data.preSignedUrl;
      window.open(downloadURL, "_blank");
    } catch (error) {
      console.error("Error fetching download URL:", error);
    }
  };

  return (
    <Container>
      <h1 className="text-center">Upload File</h1>
      <div className="input-field">
        <input type="file" onChange={handleFileChange} />
      </div>
      <div className="button-container">
        <Button
          variant="primary"
          onClick={handleUpload}
          className="submit-button"
        >
          Upload
        </Button>
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <h2 className="mt-4">Files List</h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filesList.map((file) => (
            <tr key={file}>
              <td>{file}</td>
              <td>
                <Button variant="info" onClick={() => handleDownload(file)}>
                  Download
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;
