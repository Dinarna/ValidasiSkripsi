# Gunakan image Node.js sebagai base image
FROM node:18

# Set working directory di dalam kontainer
WORKDIR /app

# Salin package.json dan package-lock.json (atau yarn.lock) ke dalam kontainer
COPY package*.json ./

# Install dependensi aplikasi
RUN npm install

# Salin sisa kode aplikasi ke dalam kontainer
COPY . .

# Build aplikasi untuk produksi
RUN npm run build

# Expose port yang digunakan oleh Vite
EXPOSE 4173

# Jalankan aplikasi dari hasil build yang sudah dihasilkan di folder
CMD ["npm", "run", "preview"]