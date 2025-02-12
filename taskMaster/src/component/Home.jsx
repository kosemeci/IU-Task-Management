import React, { useContext } from "react";
import "../css/home.css";
import { AuthContext } from "../context/AuthContext";

function Home() {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="home-container">
            <header>
                {user && (
                    <>
                        <p>👋 Hoş geldin, <b>{user.email}</b>!</p>
                    </>
                )}
                <p>Görevlerini kolayca yönet, öncelik belirle ve verimliliğini artır!</p>
            </header>

            <section className="features">
                <div className="feature">
                    <h3>📝 Görevlerini Listele</h3>
                    <p>Günlük, haftalık veya aylık görevlerini düzenleyerek daha organize ol.</p>
                </div>
                <div className="feature">
                    <h3>⏳ Öncelik Belirle</h3>
                    <p>Önemli görevlerini öne çıkar, zamanı daha verimli kullan.</p>
                </div>
                <div className="feature">
                    <h3>📊 İlerlemeni Takip Et</h3>
                    <p>Hangi görevleri tamamladığını gör ve gelişimini analiz et.</p>
                </div>
            </section>

            <div className="cta-buttons">
                {user ? (
                    <>
                        <button className="dashboard-btn">🚀 Görevlerine Git</button>
                        <button className="logout-btn" onClick={logout}>Çıkış Yap</button>
                    </>
                ) : (
                    <>
                        <button className="login-btn">🔑 Giriş Yap</button>
                        <button className="signup-btn">🆕 Kayıt Ol</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;
