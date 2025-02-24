import { useState } from "react";
import { Box, Card, CardContent, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { CheckCircle, Cancel, HourglassFull, Group, AdminPanelSettings, List, Business } from "@mui/icons-material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const projects = [
    { id: 1, name: "Proje A", tasks: 50, users: 10 },
    { id: 2, name: "Proje B", tasks: 30, users: 5 },
    { id: 3, name: "Proje C", tasks: 40, users: 8 },
];

const stats = [
    { label: "Toplam Proje Sayısı", value: projects.length, icon: <Business fontSize="large" color="primary" /> },
    { label: "Toplam Görev Sayısı", value: 120, icon: <List fontSize="large" color="primary" /> },
    { label: "Tamamlanan Görevler", value: 80, icon: <CheckCircle fontSize="large" color="success" /> },
    { label: "Tamamlanamayan Görevler", value: 20, icon: <Cancel fontSize="large" color="error" /> },
    { label: "Üzerinde Çalışılan Görevler", value: 20, icon: <HourglassFull fontSize="large" color="warning" /> },
    { label: "Toplam Kullanıcı Sayısı", value: 50, icon: <Group fontSize="large" color="info" /> },
    { label: "Admin Sayısı", value: 5, icon: <AdminPanelSettings fontSize="large" color="secondary" /> },
];

const Dashboard = () => {
    const [selectedProject, setSelectedProject] = useState(projects[0]);

    const chartData = [
        { name: "Tamamlanan", value: 80, fill: "#4caf50" },
        { name: "Tamamlanamayan", value: 20, fill: "#f44336" },
        { name: "Üzerinde Çalışılan", value: 20, fill: "#ff9800" },
    ];

    return (
        <Box sx={{ p: 3 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Proje Seç</InputLabel>
                <Select
                    value={selectedProject.id}
                    onChange={(e) => setSelectedProject(projects.find(p => p.id === e.target.value))}
                >
                    {projects.map((project) => (
                        <MenuItem key={project.id} value={project.id}>{project.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
                    gap: 3,
                }}
            >
                {stats.map((stat, index) => (
                    <Card key={index} sx={{ display: "flex", alignItems: "center", padding: 2, boxShadow: 3 }}>
                        <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                            {stat.icon}
                            <Typography variant="h6" sx={{ marginTop: 1 }}>{stat.label}</Typography>
                            <Typography variant="h4" fontWeight={700}>{stat.value}</Typography>
                        </CardContent>
                    </Card>
                ))}
                <Card sx={{ display: "flex", alignItems: "center", padding: 2, boxShadow: 3 }}>
                    <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                        <List fontSize="large" color="primary" />
                        <Typography variant="h6" sx={{ marginTop: 1 }}>Seçili Projedeki Görev Sayısı</Typography>
                        <Typography variant="h4" fontWeight={700}>{selectedProject.tasks}</Typography>
                    </CardContent>
                </Card>
                <Card sx={{ display: "flex", alignItems: "center", padding: 2, boxShadow: 3 }}>
                    <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                        <Group fontSize="large" color="info" />
                        <Typography variant="h6" sx={{ marginTop: 1 }}>Projede Çalışan Kullanıcı Sayısı</Typography>
                        <Typography variant="h4" fontWeight={700}>{selectedProject.users}</Typography>
                    </CardContent>
                </Card>
            </Box>
            <Box sx={{ mt: 5 }}>
                <Card sx={{ padding: 3, boxShadow: 3 }}>
                    <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>Görev Dağılımı</Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </Box>
        </Box>
    );
};

export default Dashboard;