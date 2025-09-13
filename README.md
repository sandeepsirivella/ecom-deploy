sudo apt update && sudo apt upgrade -y

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc
nvm install node
nvm use node

node -v
npm -v

sudo apt install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb

sudo systemctl status mongodb

sudo apt install nginx
sudo systemctl start nginx
sudo systemctl enable nginx

cd /var/www
sudo git clone https://github.com/yourusername/your-ecom-repo.git
sudo chown -R $USER:$USER your-ecom-repo

cd your-ecom-repo/backend
npm install
npm start

sudo npm install -g pm2
pm2 start index.js --name backend
pm2 startup
pm2 save

curl -X POST http://localhost:5000/api/products/setup

cd ../frontend
npm install
npm run build
sudo cp -r build /var/www/ecom-frontend

sudo nano /etc/nginx/sites-available/ecom-app
server {
    listen 80;
    server_name your_domain_or_ip;

    root /var/www/ecom-frontend;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}


sudo ln -s /etc/nginx/sites-available/ecom-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
