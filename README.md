# URL Shortener

A simple URL shortener that converts long URLs into short.

## Features

- Shorten long URLs into compact links
- Custom URL slugs (optional)

## Tech Stack

- NextJs
- Google App Script

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/solehudin5699/url-shortener.git
   cd url-shortener
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration

   ```.env
   APP_SCRIPT_URL='...'
   ```

4. Start the server:

   ```bash
   npm start
   ```

## Setup Google App Script

See step by step [here](http://notes.solehudin.my.id/blog/2025/03/17/use-app-script-to-create-api-url-shortener)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
