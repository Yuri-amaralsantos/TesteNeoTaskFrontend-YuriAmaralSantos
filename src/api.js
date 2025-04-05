import axios from 'axios';


const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

const token = localStorage.getItem('token');
if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}



export const getMusicas = async () => {
    const response = await api.get('/musicas');
    return response.data;
};

export const addMusica = async (url) => {
    const response = await api.post('/musicas', { url });
    return response.data;
};

export const updateMusicaStatus = async (id, status) => {
    const response = await api.put(`/musicas/${id}/status`, { status });
    return response.data;
};

export const updateMusica = async (id, newUrl) => {
    const response = await api.put(`/musicas/${id}`, { url: newUrl });
    return response.data;
};



export const deleteMusica = async (id) => {
    await api.delete(`/musicas/${id}`);
};

export const register = async (data) => {
    const response = await api.post('/register', data);
    return response.data;
};

export const login = async (data) => {
    const response = await api.post('/login', data);
    const { token, role } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return { token, role };
};


export default api;
