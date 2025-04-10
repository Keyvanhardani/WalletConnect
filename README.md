# Laravel Vue Web3 Wallet Authentication

Diese Anwendung ermöglicht es Benutzern, sich mit Web3-Wallets anzumelden und zu registrieren, einschließlich Unterstützung für Ethereum (MetaMask), Solana (Phantom), Fantom Wallet und WalletConnect.

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

## Funktionen

- Web3-Wallet-Authentifizierung (Ethereum, Solana, Fantom)
- Signaturüberprüfung für sichere Authentifizierung
- Elegantes UI mit Tailwind CSS und Shadcn UI
- Mehrfache Wallet-Unterstützung
- Responsives Design

## Hinweise für Entwickler

- Der aktuelle Code für die Signaturüberprüfung in `Web3AuthController.php` ist eine vereinfachte Implementierung. Für den Produktionseinsatz sollten Sie eine korrekte kryptographische Verifizierung implementieren.
- In `web3Service.js` müssen Sie einige Platzhalter (wie "YOUR_INFURA_ID") durch tatsächliche Werte ersetzen.
- Zum Testen benötigen Sie Browser-Erweiterungen für die entsprechenden Wallets (MetaMask, Phantom).

## SVG-Dateien

Die SVG-Dateien für die Wallet-Logos befinden sich im Verzeichnis `public/images/`:
- `metamask.svg`
- `phantom.svg`
- `fantom.svg`
- `walletconnect.svg`
- `logo.svg`
