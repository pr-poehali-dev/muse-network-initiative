#!/bin/bash

# Script to download expert images from ImgBB
# Run this script from the project root directory

# Create directory if it doesn't exist
mkdir -p public/images/experts

echo "Downloading expert images..."
echo ""

# Download each image
curl -L "https://i.ibb.co/nSTtdnp/photo-2025-10-26-19-03-24.jpg" -o "public/images/experts/expert-1.jpg"
echo "✓ Downloaded expert-1.jpg (Ляшева Карина)"

curl -L "https://i.ibb.co/b5DnF2rq/photo-2025-10-25-21-49-46.jpg" -o "public/images/experts/expert-2.jpg"
echo "✓ Downloaded expert-2.jpg (Мерзлая Людмила)"

curl -L "https://i.ibb.co/G4kvH6gN/photo-2025-10-26-18-48-28.jpg" -o "public/images/experts/expert-3.jpg"
echo "✓ Downloaded expert-3.jpg (Христенко Юлия)"

curl -L "https://i.ibb.co/jPJtZr4v/photo-2025-10-26-18-48-35.jpg" -o "public/images/experts/expert-4.jpg"
echo "✓ Downloaded expert-4.jpg (Самсонова Юлия)"

curl -L "https://i.ibb.co/4wkQf2YV/photo-2025-10-26-18-59-32-2.jpg" -o "public/images/experts/expert-5.jpg"
echo "✓ Downloaded expert-5.jpg (Берг Полина)"

curl -L "https://i.ibb.co/N6HjpXFC/photo-2025-10-25-22-00-430.jpg" -o "public/images/experts/expert-6.jpg"
echo "✓ Downloaded expert-6.jpg (Лазарева Мария)"

curl -L "https://i.ibb.co/Kc864P3N/photo-2025-10-26-18-48-31.jpg" -o "public/images/experts/expert-7.jpg"
echo "✓ Downloaded expert-7.jpg (Рябова Тамара)"

curl -L "https://i.ibb.co/fVp0vK0T/photo-2025-10-26-18-48-15.jpg" -o "public/images/experts/expert-8.jpg"
echo "✓ Downloaded expert-8.jpg (Кузнецова Екатерина)"

echo ""
echo "==========================================="
echo "All images downloaded successfully!"
echo "==========================================="
echo ""
echo "Mapping of URLs to local paths:"
echo ""
echo "1. Ляшева Карина:"
echo "   Old: https://i.ibb.co/nSTtdnp/photo-2025-10-26-19-03-24.jpg"
echo "   New: /images/experts/expert-1.jpg"
echo ""
echo "2. Мерзлая Людмила:"
echo "   Old: https://i.ibb.co/b5DnF2rq/photo-2025-10-25-21-49-46.jpg"
echo "   New: /images/experts/expert-2.jpg"
echo ""
echo "3. Христенко Юлия:"
echo "   Old: https://i.ibb.co/G4kvH6gN/photo-2025-10-26-18-48-28.jpg"
echo "   New: /images/experts/expert-3.jpg"
echo ""
echo "4. Самсонова Юлия:"
echo "   Old: https://i.ibb.co/jPJtZr4v/photo-2025-10-26-18-48-35.jpg"
echo "   New: /images/experts/expert-4.jpg"
echo ""
echo "5. Берг Полина:"
echo "   Old: https://i.ibb.co/4wkQf2YV/photo-2025-10-26-18-59-32-2.jpg"
echo "   New: /images/experts/expert-5.jpg"
echo ""
echo "6. Лазарева Мария:"
echo "   Old: https://i.ibb.co/N6HjpXFC/photo-2025-10-25-22-00-430.jpg"
echo "   New: /images/experts/expert-6.jpg"
echo ""
echo "7. Рябова Тамара:"
echo "   Old: https://i.ibb.co/Kc864P3N/photo-2025-10-26-18-48-31.jpg"
echo "   New: /images/experts/expert-7.jpg"
echo ""
echo "8. Кузнецова Екатерина:"
echo "   Old: https://i.ibb.co/fVp0vK0T/photo-2025-10-26-18-48-15.jpg"
echo "   New: /images/experts/expert-8.jpg"
echo ""
