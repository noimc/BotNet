clear
NO_FORMAT="\033[0m"
F_BOLD="\033[1m"
C_DODGERBLUE1="\033[48;5;33m"
echo -e "${F_BOLD}${C_DODGERBLUE1}Ｂｏｔｎｅｔ － Ｎｏｉ ＭＣ${NO_FORMAT}"
sleep 1

clear
NO_FORMAT="\033[0m"
F_BOLD="\033[1m"
C_DODGERBLUE1="\033[48;5;33m"
echo -e "${F_BOLD}${C_DODGERBLUE1}Ｂｏｔｎｅｔ － Ｎｏｉ ＭＣ${NO_FORMAT}"
echo ""
PACKAGE="gói cần tải"
echo "Đang cài đặt $PACKAGE..."
apt -y update -o=Dpkg::Progress-Fancy=1 -qq && apt -y install wget -o=Dpkg::Progress-Fancy=1 -qq && apt -y install -o=Dpkg::Progress-Fancy=1 -qq && apt -y install openjdk-21-jdk -o=Dpkg::Progress-Fancy=1 -qq
wget --progress=bar:force -q https://github.com/noimc/BotNet/releases/download/Botnet/BotNet.zip
unzip BotNet.zip
rm Botnet.zip
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
\. "$HOME/.nvm/nvm.sh"
nvm install 22
node -v
nvm current
npm install express body-parser
sleep 1

clear
NO_FORMAT="\033[0m"
F_BOLD="\033[1m"
C_DODGERBLUE1="\033[48;5;33m"
echo -e "${F_BOLD}${C_DODGERBLUE1}Ｂｏｔｎｅｔ － Ｎｏｉ ＭＣ${NO_FORMAT}"
echo ""
echo "Hãy đăng nhập vào link http://localhost:3000"
sleep 1
node index.js
