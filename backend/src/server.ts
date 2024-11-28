import app from './app';
const PORT = process.env.PORT || 3000;



// Start the server with error handling
try {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
} catch (error) {
    console.error(`Error starting the server:`, error);
}