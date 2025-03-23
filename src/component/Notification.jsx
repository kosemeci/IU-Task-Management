import React, { useContext, useEffect } from "react";
import { Card, CardContent, Typography, Container, Grid, Chip } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const notifications = [
    {
        id: 1,
        time: "13 Şubat 2025 - 10:30",
        type: "Bilgi",
        description: "Yeni bir görev eklendi.",
        color: "primary"
    },
    {
        id: 2,
        time: "13 Şubat 2025 - 12:00",
        type: "Uyarı",
        description: "Görev süresi yaklaşıyor.",
        color: "warning"
    },
    {
        id: 3,
        time: "13 Şubat 2025 - 15:45",
        type: "Hata",
        description: "Görev tamamlanamadı.",
        color: "error"
    }
];

function Notification() {
    useEffect(() => {
        if (!userId) navigate('/login'); // userId yoksa API isteği yapma
    })

    const { userId } = useContext(AuthContext);
    const navigate = useNavigate('');

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                <NotificationsActiveIcon fontSize="large" sx={{ verticalAlign: "middle", mr: 1 }} />
                Bildirimler
            </Typography>

            <Grid container spacing={3}>
                {notifications.map((notif) => (
                    <Grid item xs={12} key={notif.id}>
                        <Card sx={{ backgroundColor: "#f5f5f5" }}>
                            <CardContent>
                                <Typography variant="subtitle2" color="textSecondary">
                                    {notif.time}
                                </Typography>
                                <Chip label={notif.type} color={notif.color} sx={{ mt: 1, mb: 1 }} />
                                <Typography variant="body1">{notif.description}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Notification;
