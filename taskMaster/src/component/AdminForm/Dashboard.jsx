import { useState } from "react";
import { Box, Card, CardContent, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { CheckCircle, Cancel, HourglassFull, Group, AdminPanelSettings, List, Business } from "@mui/icons-material";
import PiChartNeedle from "../Rechart/PiChartNeedle";
import AnimatedNumber from "./AnimatedNumber";
import BarCharts from "../Rechart/BarCharts";

const projects = [
    { id: 1, name: "Proje A", tasks: 50, users: 10, completion: 80 },
    { id: 2, name: "Proje B", tasks: 30, users: 5, completion: 30 },
    { id: 3, name: "Proje C", tasks: 40, users: 8, completion: 40 },
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
    const [selectedProject, setSelectedProject] = useState(null);

    const chartData = [
        { name: "Completed", value: 8, fill: "#4caf50" },
        { name: "Pending", value: 18, fill: "#00000" },
        { name: "In-Prog", value: 28, fill: "#ff9800" },
        { name: "Failed", value: 2, fill: "#f44336" },
        { name: "Cancelled", value: 2, fill: "#f44336" },
    ];

    return (
        <Box sx={{ p: 3 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Proje Seç</InputLabel>
                <Select
                    value={selectedProject ? selectedProject.id : ""}
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
                {!selectedProject && stats.map((stat, index) => (
                    <Card key={index} sx={{ display: "flex", alignItems: "center", padding: 2, boxShadow: 3 }}>
                        <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                            {stat.icon}
                            <Typography variant="h6" sx={{ marginTop: 1 }}>{stat.label}</Typography>
                            <Typography variant="h4" fontWeight={700}>{stat.value}</Typography>
                        </CardContent>
                    </Card>
                ))}
                {selectedProject && (
                    <>
                        <Card sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                            <PiChartNeedle value={selectedProject.completion} />
                            <Typography variant="h6" align="center" sx={{ marginBottom: 0 }}>
                                Completion Rate
                            </Typography>
                            <Typography variant="h5" fontWeight={700} align="center" sx={{ marginBottom: 0 }}>
                                %{selectedProject.completion}
                            </Typography>
                        </Card>
                        <Card sx={{ display: "flex", alignItems: "center", padding: 2, boxShadow: 3 }}>
                            <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                                <List fontSize="large" color="primary" />
                                <Typography variant="h6" sx={{ marginTop: 1 }}>Seçili Projedeki Görev Sayısı</Typography>
                                <Typography variant="h4" fontWeight={700}>
                                    <AnimatedNumber target={selectedProject.tasks} />
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ display: "flex", alignItems: "center", padding: 2, boxShadow: 3 }}>
                            <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                                <Group fontSize="large" color="info" />
                                <Typography variant="h6" sx={{ marginTop: 1 }}>Projede Çalışan Kullanıcı Sayısı</Typography>
                                <Typography variant="h4" fontWeight={700}>
                                    <AnimatedNumber target={selectedProject.users} />
                                </Typography>
                            </CardContent>
                        </Card>
                    </>
                )}
            </Box>
            {selectedProject && (

                <Box sx={{ mt: 5 }}>
                    <Card sx={{ padding: 3, boxShadow: 3 }}>
                        <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>Task Distribution</Typography>
                        {/* <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#1884d8" barSize={60} />
                            </BarChart>
                        </ResponsiveContainer> */}
                        <BarCharts chartData={chartData} />
                    </Card>
                </Box>

            )}
        </Box>
    );
};

export default Dashboard;