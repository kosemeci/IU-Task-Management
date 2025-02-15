import { useState } from "react";
import '../../css/admin.css';

function TaskForm() {
    const [task, setTask] = useState({
        title: "",
        priority: "",
        description: "",
        deadline: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Yeni Task:", task);
        setTask({ title: "", priority: "", description: "", deadline: "" });
    };

    return (
        <div className="task-form-container">
            <h2 className="task-form-title">📌 Yeni Task Oluştur</h2>
            <form onSubmit={handleSubmit} className="task-form">

                {/* Task Başlığı */}
                <div className="form-group">
                    <label className="form-label">Task Başlığı:</label>
                    <input
                        type="text"
                        placeholder="Örn: Web API geliştirme"
                        value={task.title}
                        onChange={(e) => setTask({ ...task, title: e.target.value })}
                        className="form-input"
                        required
                    />
                </div>

                {/* Öncelik (Priority) */}
                <div className="form-group">
                    <label className="form-label">Öncelik:</label>
                    <select
                        value={task.priority}
                        onChange={(e) => setTask({ ...task, priority: e.target.value })}
                        className="form-input"
                        required
                    >
                        <option value="Düşük">LOW</option>
                        <option value="Normal">MEDIUM</option>
                        <option value="Yüksek">HIGH</option>
                    </select>
                </div>

                {/* Açıklama (Description) */}
                <div className="form-group">
                    <label className="form-label">Açıklama:</label>
                    <textarea
                        placeholder="Görev detaylarını giriniz..."
                        value={task.description}
                        onChange={(e) => setTask({ ...task, description: e.target.value })}
                        className="form-input textarea"
                        rows="3"
                        required
                    ></textarea>
                </div>

                {/* Son Tarih (Deadline) */}
                <div className="form-group">
                    <label className="form-label">Son Tarih:</label>
                    <input
                        type="date"
                        value={task.deadline}
                        onChange={(e) => setTask({ ...task, deadline: e.target.value })}
                        className="form-input"
                        required
                    />
                </div>

                {/* Kaydet Butonu */}
                <button type="submit" className="submit-button">
                    Kaydet
                </button>

            </form>
        </div>
    );
}

export default TaskForm;
