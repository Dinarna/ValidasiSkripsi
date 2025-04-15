import chromadb

# # Membuat klien Chroma
# client = chromadb.Client()
chromadb.Client()

# Kalo mau ngehapus collection
try:
    client.delete_collection(name='politik2')
    print("Collection berhasil dihapus")
except Exception as e:
    print("Collection tidak ditemukan")