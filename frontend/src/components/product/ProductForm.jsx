import React, {useState} from "react";

export default function ProductForm({onSubmit, initialData = {}}){
    const [form, setForm] = useState({
        name: initialData.name || "",
        description: initialData.description || "",
        category: initialData.category || "electronics",
        price: initialData.price || 0,
        stock: initialData.stock || 0,
        imageURL: initialData.imageURL || "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]:value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit}>
            {Object.keys(form).map((key) => (
                <div key={key} style={{}}>
                    <label>
                        {key}:{" "}
                        <input
                            name={key}
                            value={form[key]}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
            ))}
            <button type="submit">Save Product</button>
        </form>
    );
}