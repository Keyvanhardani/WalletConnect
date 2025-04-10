# Laravel Vue Web3 Wallet Authentication

Diese Anwendung ermöglicht es Benutzern, sich mit Web3-Wallets anzumelden und zu registrieren, einschließlich Unterstützung für Ethereum (MetaMask), Solana (Phantom), Fantom Wallet, WalletConnect und Web3Auth (für Email und Social Login).

## Verwendete Web3-Pakete

Die Anwendung verwendet folgende Web3-Pakete in aktuellen Versionen:

- **@solana/web3.js**: ^1.98.0 - Für Solana Blockchain-Interaktionen
- **@walletconnect/web3-provider**: ^1.8.0 - Für WalletConnect-Integration
- **@web3auth/base**: ^9.7.0 - Basispaket für Web3Auth
- **@web3auth/openlogin-adapter**: ^8.12.4 - Adapter für Social Login
- **@web3auth/web3auth**: ^2.1.3 - Hauptpaket für Web3Auth-Integration
- **ethers**: ^5.7.2 - Für Ethereum Blockchain-Interaktionen

## Voraussetzungen

Um dieses Projekt auszuführen, benötigen Sie:

- PHP 8.1 oder höher
- Composer
- Node.js 16+ und npm
- MySQL oder eine andere von Laravel unterstützte Datenbank

## Installation

### 1. PHP und Composer installieren

Wenn Sie PHP und Composer noch nicht installiert haben, folgen Sie diesen Schritten:

1. **PHP installieren**:
   - Laden Sie PHP von [windows.php.net/download](https://windows.php.net/download/) herunter
   - Entpacken Sie nach `C:\php`
   - Fügen Sie `C:\php` zu Ihrer PATH-Umgebungsvariable hinzu
   - Kopieren Sie `php.ini-development` zu `php.ini` und aktivieren Sie diese Erweiterungen:
     - extension=curl
     - extension=fileinfo
     - extension=mbstring
     - extension=openssl
     - extension=pdo_mysql

2. **Composer installieren**:
   - Laden Sie den Installer von [getcomposer.org](https://getcomposer.org/download/) herunter und führen Sie ihn aus

### 2. Projekt einrichten

1. **Composer-Abhängigkeiten installieren**:

```bash
# Im Projektverzeichnis
composer install
```

2. **NPM-Abhängigkeiten installieren**:

```bash
npm install
```

3. **Kopieren Sie die .env-Datei**:

```bash
cp .env.example .env
```

4. **Generieren Sie einen App-Schlüssel**:

```bash
php artisan key:generate
```

5. **Konfigurieren Sie Ihre Datenbank in der `.env`-Datei**:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_web3_auth
DB_USERNAME=root
DB_PASSWORD=
```

6. **Führen Sie die Migrationen aus**:

```bash
php artisan migrate
```

### 3. Frontend-Assets kompilieren

```bash
npm run dev
```

### 4. Server starten

```bash
php artisan serve
```

Die Anwendung sollte jetzt unter `http://localhost:8000` zugänglich sein.

## Web3Auth-Integration

Die Web3Auth-Integration erfordert die folgenden Konfigurationsschritte:

1. Registrieren Sie sich für ein Konto auf [Web3Auth](https://web3auth.io/)
2. Erstellen Sie ein neues Projekt und erhalten Sie Ihre Client-ID
3. Ersetzen Sie `YOUR_WEB3AUTH_CLIENT_ID` in der Datei `web3Service.js` durch Ihre Client-ID

## SVG-Dateien

Die SVG-Dateien für die Wallet-Logos befinden sich im Verzeichnis `public/images/`:
- `metamask.svg`
- `phantom.svg`
- `fantom.svg`
- `walletconnect.svg`
- `web3auth.svg`
