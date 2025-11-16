#!/bin/bash

# Скрипт для создания placeholder изображений
# Использует ImageMagick для создания простых градиентных заглушек

echo "🎨 Создание placeholder изображений..."

# Создаем директории
mkdir -p public/images/{hero,events,muse-tv,about}

# Функция для создания градиента
create_gradient() {
  local output=$1
  local width=$2
  local height=$3
  local color1=$4
  local color2=$5
  local text=$6
  
  # Проверяем что ImageMagick установлен
  if ! command -v convert &> /dev/null; then
    echo "⚠️  ImageMagick не установлен. Создаем пустые файлы."
    touch "$output"
    return
  fi
  
  convert -size ${width}x${height} \
    gradient:"${color1}-${color2}" \
    -gravity center \
    -pointsize 48 \
    -fill white \
    -annotate +0+0 "$text" \
    "$output"
  
  echo "✓ Создано: $output"
}

# Events images
create_gradient "public/images/events/mobile-bg.jpg" 1080 1920 "#1a1a1a" "#0a0a0a" "MUSE\nEvents"
create_gradient "public/images/events/left.jpg" 800 1600 "#2a2a2a" "#1a1a1a" "Left"
create_gradient "public/images/events/right.jpg" 800 1600 "#2a2a2a" "#1a1a1a" "Right"

# MUSE TV
create_gradient "public/images/muse-tv/background.png" 1920 1080 "#0a0a0a" "#1a1a1a" "MUSE TV"

# About
create_gradient "public/images/about/founder.jpg" 600 800 "#2a2a2a" "#3a3a3a" "Founder"

# Hero images (будут заменены после загрузки с API)
create_gradient "public/images/hero/left.jpg" 800 1600 "#1a1a1a" "#2a2a2a" "Hero\nLeft"
create_gradient "public/images/hero/center.jpg" 1200 1600 "#1a1a1a" "#2a2a2a" "Hero\nCenter"
create_gradient "public/images/hero/right.jpg" 800 1600 "#1a1a1a" "#2a2a2a" "Hero\nRight"

echo ""
echo "✅ Placeholders созданы!"
echo ""
echo "📝 Следующие шаги:"
echo "1. Запустите: chmod +x scripts/create-placeholders.sh"
echo "2. Запустите: ./scripts/create-placeholders.sh"
echo "3. Замените placeholder изображения реальными файлами"
echo "4. Смотрите IMAGES_SETUP.md для подробных инструкций"
