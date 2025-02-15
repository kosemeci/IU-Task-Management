import { useState } from "react";
import '../../css/admin.css'; // CSS dosyanı ekliyoruz

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
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">📌 Yeni Task Oluştur</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Task Başlığı */}
                <div>
                    <label className="block text-gray-700 font-semibold">Task Başlığı:</label>
                    <input
                        type="text"
                        placeholder="Örn: Web API geliştirme"
                        value={task.title}
                        onChange={(e) => setTask({ ...task, title: e.target.value })}
                        className="border border-gray-300 p-2 w-full rounded"
                        required
                    />
                </div>

                {/* Öncelik (Priority) */}
                <div>
                    <label className="block text-gray-700 font-semibold">Öncelik:</label>
                    <select
                        value={task.priority}
                        onChange={(e) => setTask({ ...task, priority: e.target.value })}
                        className="border border-gray-300 p-2 w-full rounded"
                        required
                    >
                        <option value="Düşük">Düşük</option>
                        <option value="Normal">Normal</option>
                        <option value="Yüksek">Yüksek</option>
                        <option value="Acil">Acil</option>
                    </select>
                </div>

                {/* Açıklama (Description) */}
                <div>
                    <label className="block text-gray-700 font-semibold">Açıklama:</label>
                    <textarea
                        placeholder="Görev detaylarını giriniz..."
                        value={task.description}
                        onChange={(e) => setTask({ ...task, description: e.target.value })}
                        className="border border-gray-300 p-2 w-full rounded"
                        rows="3"
                        required
                    ></textarea>
                </div>

                {/* Son Tarih (Deadline) */}
                <div>
                    <label className="block text-gray-700 font-semibold">Son Tarih:</label>
                    <input
                        type="date"
                        value={task.deadline}
                        onChange={(e) => setTask({ ...task, deadline: e.target.value })}
                        className="border border-gray-300 p-2 w-full rounded"
                        required
                    />
                </div>

                {/* Kaydet Butonu */}
                <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700 transition">
                    Kaydet
                </button>

            </form>
        </div>
    );
}

export default TaskForm;
