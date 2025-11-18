import React, { useRef, useState, useEffect } from 'react';   // Import React and necessary hooks 

const ImageUpload = props => {
  const [file, setFile] = useState();  
  const [previewUrl, setPreviewUrl] = useState();  // Preview URL state
  const [isValid, setIsValid] = useState(false);   // File validity state
  const filePickerRef = useRef();   // Reference to hidden file input element

  useEffect(() => {   // Generate preview URL when file changes
    if (!file) return;
    const fileReader = new FileReader(); 
    fileReader.onload = () => setPreviewUrl(fileReader.result);  // Set preview URL
    fileReader.readAsDataURL(file);   // Read file as data URL
  }, [file]);

  const pickImageHandler = () => {  // Trigger file input click
    filePickerRef.current.click();   // Open file picker dialog
  };

  const pickedHandler = event => { 
    let pickedFile; 
    let fileIsValid = isValid;   // Validate file selection
    if (event.target.files && event.target.files.length === 1) {  
      pickedFile = event.target.files[0];  
      setFile(pickedFile);
      setIsValid(true);   // Update validity state
      fileIsValid = true;   // Valid file selected
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);   // Pass file and validity to parent component
  };

  return (
    <div className="form-control"> {/* Image upload component */}
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className="image-upload">
        {previewUrl && <img src={previewUrl} alt="Preview" />}
        {!previewUrl && <p>Please pick an image.</p>}
      </div>
      <button type="button" onClick={pickImageHandler}>Pick Image</button>
    </div>
  );
};

export default ImageUpload;