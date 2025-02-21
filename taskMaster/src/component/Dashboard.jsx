import React, { useState } from "react";
import axios from "axios";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

const Dashboard = () => {
    const [data, setData] = useState([]);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:8080/api/analyze",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            console.log(response.data)
            const formattedData = Object.keys(response.data).map((key) => ({
                name: key,
                value: response.data[key],
            }));
            setData(formattedData);
        } catch (error) {
            console.error("Hata:", error);
        }
    };

    return (
        <div>
            <h2>Proje Analizi</h2>
            <input type="file" onChange={handleFileUpload} />
            <PieChart width={400} height={400}>
                <Pie data={data} dataKey="value" nameKey="name" fill="#82ca9d">
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default Dashboard;
