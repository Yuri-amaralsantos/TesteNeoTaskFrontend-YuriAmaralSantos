import axios from 'axios';
import { getMusicas, addMusica, updateMusica, updateMusicaStatus, deleteMusica, register, login } from '../api';

jest.mock('axios');

describe('API calls', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('getMusicas returns data from API', async () => {
        const mockData = [{ id: 1, url: 'music.mp3' }];
        axios.get.mockResolvedValue({ data: mockData });

        const result = await getMusicas();
        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith('/musicas');
    });

    test('addMusica posts URL and returns response', async () => {
        const mockResponse = { id: 2, url: 'new.mp3' };
        axios.post.mockResolvedValue({ data: mockResponse });

        const result = await addMusica('new.mp3');
        expect(result).toEqual(mockResponse);
        expect(axios.post).toHaveBeenCalledWith('/musicas', { url: 'new.mp3' });
    });

    test('updateMusica updates URL by ID', async () => {
        const mockResponse = { id: 1, url: 'updated.mp3' };
        axios.put.mockResolvedValue({ data: mockResponse });

        const result = await updateMusica(1, 'updated.mp3');
        expect(result).toEqual(mockResponse);
        expect(axios.put).toHaveBeenCalledWith('/musicas/1', { url: 'updated.mp3' });
    });

    test('updateMusicaStatus updates status by ID', async () => {
        const mockResponse = { id: 1, status: 'active' };
        axios.put.mockResolvedValue({ data: mockResponse });

        const result = await updateMusicaStatus(1, 'active');
        expect(result).toEqual(mockResponse);
        expect(axios.put).toHaveBeenCalledWith('/musicas/1/status', { status: 'active' });
    });

    test('deleteMusica sends delete request', async () => {
        axios.delete.mockResolvedValue({});

        await deleteMusica(1);
        expect(axios.delete).toHaveBeenCalledWith('/musicas/1');
    });

    test('register sends user data and returns response', async () => {
        const mockData = { message: 'User registered successfully' };
        axios.post.mockResolvedValueOnce({ data: mockData });

        const userData = { username: 'testuser', password: 'password123' };
        const result = await register(userData);

        expect(result).toEqual(mockData);
        expect(axios.post).toHaveBeenCalledWith('/register', userData);
    });

    test('login sets token and role in localStorage and returns them', async () => {
        const mockData = { token: 'abc123', role: 'user' };
        axios.post.mockResolvedValueOnce({ data: mockData });

        const loginData = { username: 'testuser', password: 'password123' };
        const result = await login(loginData);

        expect(result).toEqual(mockData);
        expect(localStorage.setItem).toHaveBeenCalledWith('token', mockData.token);
        expect(localStorage.setItem).toHaveBeenCalledWith('role', mockData.role);
        expect(axios.post).toHaveBeenCalledWith('/login', loginData);
    });
});
