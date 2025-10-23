import React, {useState} from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import styles from "./ProductForm.module.css";


export default function ProductForm({onSubmit, initialData = {}}){
    const [form, setForm] = useState({
        name: initialData.name || "",
        description: initialData.description || "",
        category: initialData.category || "electronics",
        price: initialData.price || 0,
        stock: initialData.stock || 0,
        imageURL: initialData.imageURL || "",
    });
//for image upload part
    const [preview, setPreview] = useState(initialData.imageURL || "");

    const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
        });

        if (!response.ok) throw new Error("Upload failed");

        const data = await response.json();
        setPreview(data.imageUrl);
        setForm((prev) => ({ ...prev, imageURL: data.imageUrl }));
        alert("Image uploaded successfully!");
    } catch (err) {
        alert(`Upload failed: ${err.message}`);
    }
    };


    const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setForm((prev) => ({ ...prev, imageURL: url }));
    setPreview(url);
    };
//******************* 

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]:value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();   
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            {Object.keys(form).filter((key) => key !== "imageURL").map((key) => (
                <div key={key} className={styles.field}>
                    <label className={styles.label}>
                        {"product "}{key}:{" "}
                    {key === "category" ? (
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            required
                            className={styles.select}
                        >
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="books">Books</option>
                            <option value="beauty">Beauty</option>
                            <option value="home">Home</option>
                            <option value="sports">Sports</option>
                        </select>
                    ): key === "price" ? (
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            required
                            className={styles.input}
                        />
                    ) : key === "stock" ? (
                        <input
                            type="number"
                            name="stock"
                            value={form.stock}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) {
                                    setForm((prev) => ({ ...prev, stock: value }));
                                }
                            }}
                            min="0"
                            step="1"
                            required
                            className={styles.input}
                        />
                    ) : (                        
                        
                        <input
                            name={key}
                            value={form[key]}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                    )}
                    </label>
                </div>
            ))}
            <div className={styles.field}>
                <label className={styles.label}>Image URL:</label>
                <div className={styles.imageUploadContainer}>
                    <input
                        type="text" placeholder="http://" value={form.imageURL} onChange={handleImageUrlChange}
                        className={styles.input}
                    />
                    <button type="button" 
                    className={styles.uploadButton}
                    onClick={() => document.getElementById("fileInput").click()}>
                        Upload
                    </button>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileUpload}
                    />
                </div>

                <div className={styles.imagePreview}>
                { preview ? (
                    <img src={preview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                ) : ( <p>image preview!</p>)
                }
                </div>
            </div>


            <button type="submit" className={styles.submitButton}>Save Product</button>
        </form>
    );
}