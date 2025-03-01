import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { CheckCircle, Cancel, HourglassFull, Group, AdminPanelSettings, List, Business } from "@mui/icons-material";
import PiChartNeedle from "../Rechart/PiChartNeedle";
import AnimatedNumber from "./AnimatedNumber";
import BarCharts from "../Rechart/BarCharts";
import { getAllProject } from "../Api/projects";
import { getProjectStatistics } from "../Api/ProjectStatistics";

const Dashboard = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [projects, setProjects] = useState([]);
    const [projectStatistics, setProjectStats] = useState({});

    const stats = [
        { label: "Toplam Proje Sayısı", value: projects.length, icon: <Business fontSize="large" color="primary" /> },
        { label: "Toplam Görev Sayısı", value: 120, icon: <List fontSize="large" color="primary" /> },
        { label: "Toplam Kullanıcı Sayısı", value: 50, icon: <Group fontSize="large" color="info" /> },
        { label: "Admin Sayısı", value: 5, icon: <AdminPanelSettings fontSize="large" color="secondary" /> },
    ];

    const chartData = [
        { name: "COMPLETED", value: projectStatistics['completedTask'] || 0, fill: "#4caf50" },
        { name: "PENDING", value: projectStatistics['pendingTask'] || 0, fill: "#ffeb3b" },
        { name: "IN_PROGRESS", value: projectStatistics['progressTask'] || 0, fill: "#ff9800" },
        { name: "FAILED", value: projectStatistics['failedTask'] || 0, fill: "#f44336" },
        { name: "CANCELLED", value: projectStatistics['cancelledTask'] || 0, fill: "#2196f3" },
    ];

    useEffect(() => {
        if (selectedProject) {
            const getStats = async () => {
                try {
                    const response = await getProjectStatistics(selectedProject.id);
                    setProjectStats(response);
                } catch (error) {
                    console.log(error);
                }
            }
            getStats();
        }

    }, [selectedProject])

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await getAllProject();
                setProjects(result);
            } catch (error) {
                console.error("Error fetching data in component", error);
            }
        };

        getData();
    }, [])

    const handleProjectChange = (e) => {
        const selected = projects.find(p => p.id === e.target.value);
        setSelectedProject(selected);
    };

    const handleGeneralStats = () => {
        setSelectedProject(null);
    };

    return (
        <Box sx={{ p: 3 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>{selectedProject ? 'Proje Seç' : 'Genel İstatistikler'}</InputLabel>
                <Select
                    value={selectedProject ? selectedProject.id : ""}
                    onChange={handleProjectChange}
                >
                    <MenuItem value="0" onClick={handleGeneralStats}>Genel İstatistikler</MenuItem>
                    {projects.map((project) => (
                        <MenuItem key={project.id} value={project.id}>{project.projectName}</MenuItem>
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
                            <Typography variant="h4" fontWeight={700}>{<AnimatedNumber target={stat.value} />}</Typography>
                        </CardContent>
                    </Card>
                ))}
                {selectedProject && (
                    <>
                        <Card sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                            <PiChartNeedle value={selectedProject.completionPercentage} />
                            <Typography variant="h6" align="center" sx={{ marginBottom: 0 }}>
                                Completion Rate
                            </Typography>
                            <Typography variant="h5" fontWeight={700} align="center" sx={{ marginBottom: 0 }}>
                                %{selectedProject.completionPercentage}
                            </Typography>
                        </Card>
                        <Card sx={{ display: "flex", alignItems: "center", padding: 2, boxShadow: 3 }}>
                            <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                                <List fontSize="large" color="primary" />
                                <Typography variant="h6" sx={{ marginTop: 1 }}>Seçili Projedeki Görev Sayısı</Typography>
                                <Typography variant="h4" fontWeight={700}>
                                    <AnimatedNumber target={projectStatistics['totalTask'] || 0} />
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ display: "flex", alignItems: "center", padding: 2, boxShadow: 3 }}>
                            <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                                <Group fontSize="large" color="info" />
                                <Typography variant="h6" sx={{ marginTop: 1 }}>Projede Çalışan Kullanıcı Sayısı</Typography>
                                <Typography variant="h4" fontWeight={700}>
                                    <AnimatedNumber target={projectStatistics['totalUser'] || 0} />
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
                        <BarCharts chartData={chartData} />
                    </Card>
                </Box>

            )}
        </Box>
    );
};

export default Dashboard;